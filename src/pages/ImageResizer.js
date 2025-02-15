import React, { useState } from "react";
import ImageEditor from "../components/ImageEditor";
import { Helmet } from "react-helmet";
import { UploadCloud } from 'lucide-react';
const ImageResizer = () => {
  
  const [image, setImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={styles.container}>
      <Helmet>
  <title>Image Resizer - Resize Images Online for Free</title>
  <meta
    name="description"
    content="Use our free Image Resizer tool to easily resize images online. Adjust image dimensions for web, social media, or print in just a few clicks."
  />
  <meta
    name="keywords"
    content="image resizer, resize images, online image resizer, photo resizer, adjust image dimensions, resize images online"
  />
</Helmet>

      {!image ? (
        <>
          <h1 style={styles.title}>Image Resizer</h1>
          <p style={styles.subtitle}>Use our free Image Resizer tool to easily resize images online. Adjust image dimensions for web, social media, or print in just a few clicks.</p>
          <div style={styles.uploadBox}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={styles.fileInput}
              id="imageUpload"
            />
            <label htmlFor="imageUpload" style={styles.label}>
              <div style={styles.icon}>
              <UploadCloud size={40} color="#007bff" />
              <p className="upload-text">Upload Image</p>
              </div>
              </label>
          
            <p style={styles.subtitle}>Easily resize images online for free.</p>
          </div>

          <div style={styles.features}>
            <div style={styles.feature}>
              <h3>Free Image Resizer</h3>
              <p>
              Our image resizer tool is completely free to use. Resize your images quickly without any cost or hidden charges. Whether you're resizing for social media, websites, or printing, we’ve got you covered!
              </p>
            </div>
            <div style={styles.feature}>
              <h3>Support for All Image Formats</h3>
              <p>
              We support a wide range of image formats including JPEG, GIF, PNG, WebP, HEIF, AVIF, TIFF, BMP, SVG, EPS, Bitmap, PDF, PSD, PSB, XCF, AI, INDD, XD, TGA, RAW, and more. No matter what format your image is in, our tool can handle it!
              </p>
            </div>
            <div style={styles.feature}>
              <h3>High-Speed Download</h3>
              <p>
              Once your images are resized, download them instantly at lightning speed. We ensure high-quality and fast downloads so you can get back to your tasks without any delays.
              </p>
            </div>
            </div>
            <h1>Free Image Resizer</h1>     
      <p>
        Resize your images quickly and easily with our free Image Resizer. Adjust the dimensions of your images to fit social media,
        websites, or any custom size in seconds. This tool ensures that image quality is maintained while reducing the size. With a
        user-friendly interface and high-speed processing, resizing images has never been simpler, and it's all available at no cost.
      </p>
          
        </>
      ) : (
        <ImageEditor image={image} dimensions={imageDimensions} />
      )}
    </div>
  
  
  );
  
};

const styles = {

    
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "35px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
  },
    fileInput: {
    display: "none",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  icon: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  features: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginTop: "30px",
  },
  feature: {
    maxWidth: "250px",
    margin: "10px",
    textAlign: "center",
  },
  uploadBox: {
    // border: "2px dashed rgba(255, 165, 0, 0.8)", // Sunset-inspired orange border
    borderRadius: "30px",
    padding: "40px",
    margin: "5px auto",
    maxWidth: "800px",
    background: "linear-gradient(180deg,rgba(255, 255, 255, 0.84),rgba(135, 223, 245, 0.49))",
    position: "relative",
    boxShadow: "0 2px 10px rgba(0, 2, 3, 6)",
    transition: "all 0.3s ease", // Smooth hover effect
    cursor: "pointer",
  },
  
};


export default ImageResizer;