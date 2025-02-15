import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./utils";
import { Helmet } from "react-helmet";
import { UploadCloud } from 'lucide-react';
import "./CropEditor.css";

const CropEditor = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [format, setFormat] = useState("jpg");
  const [customWidth, setCustomWidth] = useState(1);
  const [customHeight, setCustomHeight] = useState(1);
  const [customUnit, setCustomUnit] = useState("px");
  const [realTimeAspect, setRealTimeAspect] = useState(1);

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels, rotation);
      setCroppedImage(croppedImg);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  }, [image, rotation]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const convertToPx = (value, unit) => {
    switch (unit) {
      case "px": return value;
      case "inch": return value * 96;
      case "cm": return value * 37.7953;
      case "mm": return value * 3.77953;
      default: return value;
    }
  };

  const handleCustomDimensionsChange = () => {
    const widthInPx = convertToPx(customWidth, customUnit);
    const heightInPx = convertToPx(customHeight, customUnit);
    if (widthInPx > 0 && heightInPx > 0) {
      setAspect(widthInPx / heightInPx);
    }
  };

  useEffect(() => {
    const widthInPx = convertToPx(customWidth, customUnit);
    const heightInPx = convertToPx(customHeight, customUnit);
    if (widthInPx > 0 && heightInPx > 0) {
      setRealTimeAspect(widthInPx / heightInPx);
    }
  }, [customWidth, customHeight, customUnit]);

  const downloadImage = () => {
    if (!croppedImage) return;
    const link = document.createElement("a");
    const fileName = `cropped-image.${format}`;
    const mimeType = `image/${format === "jpg" ? "jpeg" : format}`;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = croppedImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const formattedImage = canvas.toDataURL(mimeType);
      link.href = formattedImage;
      link.download = fileName;
      link.click();
    };
  };

  const styles = {
    uploadBox: {
      borderRadius: "30px",
      padding: "40px",
      margin: "5px auto",
      maxWidth: "800px",
      width: "90%",
      background: "linear-gradient(180deg,rgba(255, 255, 255, 0.84),rgba(135, 223, 245, 0.49))",
      position: "relative",
      boxShadow: "0 2px 10px rgba(0, 2, 3, 6)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    fileInput: { display: "none" },
    label: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
    icon: { fontSize: "3rem", marginBottom: "10px" },
  };

  return (
    <div className="crop-image">
      <Helmet>
        <title>Crop Image - Free Online Image Cropping Tool</title>
        <meta name="description" content="Crop your images online for free using our easy-to-use Crop Image tool. Perfect for adjusting image focus and removing unwanted parts." />
        <meta name="keywords" content="crop image, online image cropper, free image cropping tool, crop photos, online photo cropping, image crop tool" />
      </Helmet>
      <h1>Crop Your Image</h1>
      <p>Crop your images online for free using our easy-to-use Crop Image tool. Perfect for adjusting image focus and removing unwanted parts.</p>
      {!image && (
        <div style={styles.uploadBox}>
          <input type="file" accept="image/*" onChange={handleFileChange} style={styles.fileInput} id="imageUpload" />
          <label htmlFor="imageUpload" style={styles.label} className="upload-label">
            <div style={styles.icon}>
              <UploadCloud size={40} color="#007bff" />
              <p className="upload-text">Upload Image</p>
            </div>
          </label>
          <p style={styles.subtitle}>Upload an image and crop it to your desired aspect ratio.</p>
        </div>
      )}
      {image && (
        <div className="crop-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect === 0 ? realTimeAspect : aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="rect"
            showGrid={true}
          />
        </div>
      )}
      {image && (
        <div className="controls" style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
          <label>
            Zoom:
            <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} id="zoomRange" name="zoom" />
          </label>
          <label>
            Rotation:
            <input type="range" min={0} max={360} step={1} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} id="rotationRange" name="rotation" />
          </label>
          <label>
            Aspect Ratio:
            <select value={aspect} onChange={(e) => setAspect(Number(e.target.value))} id="aspectRatioSelect" name="aspectRatio">
              <option value={1}>1:1</option>
              <option value={16 / 9}>16:9</option>
              <option value={4 / 3}>4:3</option>
              <option value={0}>Free</option>
            </select>
          </label>
          {aspect === 0 && (
            <div className="custom-aspect-ratio">
              <label>
                Width:
                <input type="number" value={customWidth} onChange={(e) => setCustomWidth(Number(e.target.value))} id="customWidth" name="width" />
              </label>
              <label>
                Height:
                <input type="number" value={customHeight} onChange={(e) => setCustomHeight(Number(e.target.value))} id="customHeight" name="height" />
              </label>
              <label>
                Unit:
                <select value={customUnit} onChange={(e) => setCustomUnit(e.target.value)} id="unitSelect" name="unit">
                  <option value="px">px</option>
                  <option value="inch">inch</option>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                </select>
              </label>
              <button onClick={handleCustomDimensionsChange}>Set Aspect Ratio</button>
            </div>
          )}
          <label>
            Image Format:
            <select value={format} onChange={(e) => setFormat(e.target.value)} id="imageFormatSelect" name="imageFormat">
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="gif">GIF</option>
              <option value="webp">WEBP</option>
            </select>
          </label>
          <button onClick={downloadImage}>Download Cropped Image</button>
        </div>
      )}
      {croppedImage && (
        <div className="preview" style={{ marginTop: "20px", textAlign: "center" }}>
          <h2>Preview</h2>
          <img src={croppedImage} alt="Cropped Preview" />
        </div>
      )}
      <br /><br />
      <div>
        <h1>Free Crop Image Tool</h1>
        <p>Crop images online for free with our quick and simple Crop Image tool. This feature allows you to remove unwanted areas from your photos or adjust the aspect ratio effortlessly. Whether you need a perfect square for Instagram or a wide frame for a website banner, our tool provides professional-looking results without requiring technical skills, all at lightning-fast speed and for free.</p>
      </div>
    </div>
  );
};

export default CropEditor;