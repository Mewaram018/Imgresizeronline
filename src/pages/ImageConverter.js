import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { Helmet } from "react-helmet";
import { UploadCloud } from "lucide-react";

const ImageE = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [format, setFormat] = useState("JPG");
  const [imageBlob, setImageBlob] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  const [downloadableSize, setDownloadableSize] = useState(0);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
      const img = new Image();
      img.onload = () => setImageDimensions({ width: img.width, height: img.height });
      img.src = URL.createObjectURL(file);
      setImage(URL.createObjectURL(file));
      setFileSize(file.size / 1024);
    }
  };

  useEffect(() => {
    if (!image) return;
    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        setImageBlob(blob);
        setDownloadableSize(blob.size / 1024);
      });
  }, [image]);

  const handleResize = () => {
    if (!imageBlob) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = imageDimensions.width;
      canvas.height = imageDimensions.height;
      ctx.drawImage(img, 0, 0, imageDimensions.width, imageDimensions.height);
      if (format === "PDF") {
        const pdf = new jsPDF();
        pdf.internal.pageSize.setWidth(imageDimensions.width);
        pdf.internal.pageSize.setHeight(imageDimensions.height);
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData, "JPEG", 0, 0, imageDimensions.width, imageDimensions.height);
        pdf.save("resized-image.pdf");
      } else {
        const dataUrl = canvas.toDataURL(`image/${format.toLowerCase()}`, 1.0);
        const blob = dataURLToBlob(dataUrl);
        setDownloadableSize(blob.size / 1024);
        handleDownloadImage(blob);
      }
    };
    img.src = URL.createObjectURL(imageBlob);
  };

  const dataURLToBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ab], { type: mimeString });
  };

  const handleDownloadImage = (blob) => {
    const link = document.createElement("a");
    link.download = `resized-image.${format.toLowerCase()}`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Convert Image - Free Online Image Converter</title>
        <meta name="description" content="Convert images between different formats like JPEG, PNG, GIF, and more with our free online Image Converter tool. Simple and fast image conversion." />
        <meta name="keywords" content="convert image, online image converter, image format converter, convert images online, image conversion tool, JPEG to PNG, PNG to JPEG" />
      </Helmet>
      {!image ? (
        <>
          <h1 style={styles.title}>Image Converter</h1>
          <p style={styles.subtitle}>Convert your image into various formats like JPEG, PNG, WebP, PDF, and more. Upload your image and choose the desired format to get started.</p>
          <div style={styles.uploadBox}>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.fileInput} id="imageUpload" />
            <label htmlFor="imageUpload" style={styles.label}>
              <div style={styles.icon}>
                <UploadCloud size={40} color="#007bff" />
                <p className="upload-text">Upload Image</p>
              </div>
            </label>
            <p>Convert images between different formats like JPEG, PNG, GIF, and more with our free online Image Converter tool. Simple and fast image conversion.</p>
          </div>
        </>
      ) : (
        <>
          <h1 style={styles.title}>Image Converter Pro Free</h1>
          <p style={styles.description}>Use this tool to convert your image into various formats. Preview the image below, choose a format, and download the Converted file free of cost.</p>
          <div style={styles.infoSection}>
            <div style={styles.previewContainer}>
              <img src={image} alt="Preview" style={styles.previewImage} />
            </div>
            <div style={styles.textInfo}>
              <p>File Name: <strong>{imageName}</strong></p>
              <p>File Size: <strong>{fileSize.toFixed(2)} KB</strong></p>
              <label style={styles.label}>
                <strong>Convert to:</strong>
                <select id="formatSelect" value={format} onChange={(e) => setFormat(e.target.value)} style={styles.select}>
                  <option value="JPG">JPG</option>
                  <option value="JPEG">JPEG</option>
                  <option value="GIF">GIF</option>
                  <option value="PNG">PNG</option>
                  <option value="WebP">WebP</option>
                  <option value="HEIF">HEIF</option>
                  <option value="AVIF">AVIF</option>
                  <option value="TIFF">TIFF</option>
                  <option value="BMP">BMP</option>
                  <option value="SVG">SVG</option>
                  <option value="EPS">EPS</option>
                  <option value="Bitmap">Bitmap</option>
                  <option value="PDF">PDF</option>
                  <option value="PSD">PSD</option>
                  <option value="PSB">PSB</option>
                  <option value="XCF">XCF</option>
                  <option value="AI">AI</option>
                  <option value="INDD">INDD</option>
                  <option value="XD">XD</option>
                  <option value="TGA">TGA</option>
                  <option value="RAW">RAW</option>
                </select>
              </label>
              <div style={styles.downloadSection}>
                <span style={{ color: "green", fontWeight: "bold" }}>Size: {downloadableSize.toFixed(2)} KB</span>
                <button style={{ ...styles.button, marginTop: "10px" }} onClick={handleResize}><strong>Download</strong></button>
              </div>
            </div>
          </div>
        </>
      )}
      <br /><br />
      <div>
        <h1>Free Image Converter</h1>
        <p>Convert your images to different formats effortlessly with our free Image Converter. This tool supports popular file formats like JPEG, PNG, and WebP, making it versatile for various needs. You can even convert multiple images simultaneously, saving time and effort. Fast, accurate, and completely free, our Image Converter ensures that you can easily switch formats without compromising on quality.</p>
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', padding: '20px', backgroundColor: '#f4f4f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '1400px', margin: '0 auto' },
  title: { fontSize: "35px", fontWeight: "bold", marginBottom: "20px" },
  subtitle: { fontSize: "16px", marginBottom: "30px" },
  description: { fontSize: "16px", marginBottom: "20px" },
  uploadButton: { padding: '10px 20px', fontSize: '19px', backgroundColor: '#2f73ff', color: '#fff', borderRadius: '10px', cursor: 'pointer', transition: 'background-color 0.3s ease', border: "none" },
  label: { fontSize: "18px", marginBottom: "10px", cursor: "pointer", color: 'Green' },
  previewContainer: { display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginBottom: "30px", border: "4px solid #ccc", borderRadius: "10px", overflow: "hidden" },
  previewImage: { width: "100%", maxWidth: "400px", height: "auto", objectFit: "contain" },
  textInfo: { textAlign: "center" },
  button: { padding: "10px 20px", fontSize: "16px", backgroundColor: "#2f73ff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" },
  uploadBox: { borderRadius: "30px", padding: "40px", margin: "50px auto", maxWidth: "800px", background: "linear-gradient(180deg,rgba(255, 255, 255, 0.84),rgba(135, 223, 245, 0.49))", position: "relative", boxShadow: "0 2px 10px rgba(0, 2, 3, 6)", transition: "all 0.3s ease", cursor: "pointer" },
  fileInput: { display: "none" },
  icon: { fontSize: "50px", color: "#d3d3d3", marginBottom: "10px" },
  infoSection: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px" },
  downloadSection: { display: "flex", flexDirection: "column", alignItems: "center" },
  select: { marginLeft: "10px" },
};

export default ImageE;