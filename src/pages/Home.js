import React, { useState } from "react";
import ImageEditor from "../components/ImageEditor";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UploadCloud } from 'lucide-react';

const ImageResizer = () => {
  const [image, setImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => setImageDimensions({ width: img.width, height: img.height });
      img.src = URL.createObjectURL(file);
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={styles.container}>
      <Helmet>
      <title>Image Resizer Online - Resize, Crop, Compress, Convert Images Online</title>
      <meta name="description" content="Use our free Image Resizer tool to easily resize images online. Adjust image dimensions for web, social media, or print in just a few clicks." />
        <meta name="keywords" content="image resizer, resize images, online image resizer, photo resizer, adjust image dimensions, resize images online" />
      </Helmet>
      {!image ? (
        <>          <h1 style={styles.title}>Image Resizer Online</h1>
          <div style={styles.uploadBox}>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.fileInput} id="imageUpload" />
            <label htmlFor="imageUpload" style={styles.label}>
              <div style={styles.icon}>
                <UploadCloud size={40} color="#007bff" />
                <p className="upload-text">Upload Image</p>
              </div>
            </label>
            <p style={styles.subtitle}>Easily resize images online for free.</p>
          </div>
          <br />
          <h1 style={styles.title}>Useful Tools</h1>
          <p style={styles.subtitle}>Check out our other tools:</p>
          <div style={styles.toolLinksContainer}>
            <Link to="/image-resizer" style={styles.toolLinkBox} onMouseEnter={(e) => { e.currentTarget.style.transform = styles.toolLinkBoxHover.transform; e.currentTarget.style.boxShadow = styles.toolLinkBoxHover.boxShadow; e.currentTarget.style.background = styles.toolLinkBoxHover.background; e.currentTarget.style.color = styles.toolLinkBoxHover.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIconHover.transform; }} onMouseLeave={(e) => { e.currentTarget.style.transform = styles.toolLinkBox.transform; e.currentTarget.style.boxShadow = styles.toolLinkBox.boxShadow; e.currentTarget.style.background = styles.toolLinkBox.background; e.currentTarget.style.color = styles.toolLinkBox.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIcon.transform; }}>
              <div className="icon" style={styles.toolIcon}>🖼️</div>
              <h3>Image Resizer</h3>
              <p>Resize images quickly and easily.</p>
            </Link>
            <Link to="/crop-image" style={styles.toolLinkBox} onMouseEnter={(e) => { e.currentTarget.style.transform = styles.toolLinkBoxHover.transform; e.currentTarget.style.boxShadow = styles.toolLinkBoxHover.boxShadow; e.currentTarget.style.background = styles.toolLinkBoxHover.background; e.currentTarget.style.color = styles.toolLinkBoxHover.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIconHover.transform; }} onMouseLeave={(e) => { e.currentTarget.style.transform = styles.toolLinkBox.transform; e.currentTarget.style.boxShadow = styles.toolLinkBox.boxShadow; e.currentTarget.style.background = styles.toolLinkBox.background; e.currentTarget.style.color = styles.toolLinkBox.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIcon.transform; }}>
              <div className="icon" style={styles.toolIcon}>✂️</div>
              <h3>Crop Image</h3>
              <p>Crop your images with precision.</p>
            </Link>
            <Link to="/image-compressor" style={styles.toolLinkBox} onMouseEnter={(e) => { e.currentTarget.style.transform = styles.toolLinkBoxHover.transform; e.currentTarget.style.boxShadow = styles.toolLinkBoxHover.boxShadow; e.currentTarget.style.background = styles.toolLinkBoxHover.background; e.currentTarget.style.color = styles.toolLinkBoxHover.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIconHover.transform; }} onMouseLeave={(e) => { e.currentTarget.style.transform = styles.toolLinkBox.transform; e.currentTarget.style.boxShadow = styles.toolLinkBox.boxShadow; e.currentTarget.style.background = styles.toolLinkBox.background; e.currentTarget.style.color = styles.toolLinkBox.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIcon.transform; }}>
              <div className="icon" style={styles.toolIcon}>📉</div>
              <h3>Image Compressors</h3>
              <p>Compress images without losing quality.</p>
            </Link>
            <Link to="/image-converter" style={styles.toolLinkBox} onMouseEnter={(e) => { e.currentTarget.style.transform = styles.toolLinkBoxHover.transform; e.currentTarget.style.boxShadow = styles.toolLinkBoxHover.boxShadow; e.currentTarget.style.background = styles.toolLinkBoxHover.background; e.currentTarget.style.color = styles.toolLinkBoxHover.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIconHover.transform; }} onMouseLeave={(e) => { e.currentTarget.style.transform = styles.toolLinkBox.transform; e.currentTarget.style.boxShadow = styles.toolLinkBox.boxShadow; e.currentTarget.style.background = styles.toolLinkBox.background; e.currentTarget.style.color = styles.toolLinkBox.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIcon.transform; }}>
              <div className="icon" style={styles.toolIcon}>🔄</div>
              <h3>Image Converter</h3>
              <p>Convert images to various formats.</p>
            </Link>
          </div>
          <div style={styles.toolLinksContainer}>
            <Link to="/image-to-pdf" style={styles.toolLinkBox} onMouseEnter={(e) => { e.currentTarget.style.transform = styles.toolLinkBoxHover.transform; e.currentTarget.style.boxShadow = styles.toolLinkBoxHover.boxShadow; e.currentTarget.style.background = styles.toolLinkBoxHover.background; e.currentTarget.style.color = styles.toolLinkBoxHover.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIconHover.transform; }} onMouseLeave={(e) => { e.currentTarget.style.transform = styles.toolLinkBox.transform; e.currentTarget.style.boxShadow = styles.toolLinkBox.boxShadow; e.currentTarget.style.background = styles.toolLinkBox.background; e.currentTarget.style.color = styles.toolLinkBox.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIcon.transform; }}>
              <div className="icon" style={styles.toolIcon}>📄</div>
              <h3>Image to PDF Converter</h3>
              <p>Convert Images in PDF files.</p>
            </Link>
            <Link to="/pdf-to-image" style={styles.toolLinkBox} onMouseEnter={(e) => { e.currentTarget.style.transform = styles.toolLinkBoxHover.transform; e.currentTarget.style.boxShadow = styles.toolLinkBoxHover.boxShadow; e.currentTarget.style.background = styles.toolLinkBoxHover.background; e.currentTarget.style.color = styles.toolLinkBoxHover.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIconHover.transform; }} onMouseLeave={(e) => { e.currentTarget.style.transform = styles.toolLinkBox.transform; e.currentTarget.style.boxShadow = styles.toolLinkBox.boxShadow; e.currentTarget.style.background = styles.toolLinkBox.background; e.currentTarget.style.color = styles.toolLinkBox.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIcon.transform; }}>
              <div className="icon" style={styles.toolIcon}>📄</div>
              <h3>PDF to Images Converter</h3>
              <p>Convert your PDF file in images</p>
            </Link>
            <Link to="/pdf-merger" style={styles.toolLinkBox} onMouseEnter={(e) => { e.currentTarget.style.transform = styles.toolLinkBoxHover.transform; e.currentTarget.style.boxShadow = styles.toolLinkBoxHover.boxShadow; e.currentTarget.style.background = styles.toolLinkBoxHover.background; e.currentTarget.style.color = styles.toolLinkBoxHover.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIconHover.transform; }} onMouseLeave={(e) => { e.currentTarget.style.transform = styles.toolLinkBox.transform; e.currentTarget.style.boxShadow = styles.toolLinkBox.boxShadow; e.currentTarget.style.background = styles.toolLinkBox.background; e.currentTarget.style.color = styles.toolLinkBox.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIcon.transform; }}>
              <div className="icon" style={styles.toolIcon}>📑</div>
              <h3>PDF Merger</h3>
              <p>Merge PDF files easily into one document.</p>
            </Link>
            <Link to="/pdf-split" style={styles.toolLinkBox} onMouseEnter={(e) => { e.currentTarget.style.transform = styles.toolLinkBoxHover.transform; e.currentTarget.style.boxShadow = styles.toolLinkBoxHover.boxShadow; e.currentTarget.style.background = styles.toolLinkBoxHover.background; e.currentTarget.style.color = styles.toolLinkBoxHover.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIconHover.transform; }} onMouseLeave={(e) => { e.currentTarget.style.transform = styles.toolLinkBox.transform; e.currentTarget.style.boxShadow = styles.toolLinkBox.boxShadow; e.currentTarget.style.background = styles.toolLinkBox.background; e.currentTarget.style.color = styles.toolLinkBox.color; e.currentTarget.querySelector(".icon").style.transform = styles.toolIcon.transform; }}>
              <div className="icon" style={styles.toolIcon}>📄</div>
              <h3>PDF Splitter</h3>
              <p>Split your PDFs into smaller files.</p>
            </Link>
          </div>
        </>
      ) : (
        <ImageEditor image={image} dimensions={imageDimensions} />
      )}
      <div style={styles.features}>
        <div style={styles.feature}>
          <h3>Perfect quality</h3>
          <p>The best online image resizer to resize your images at the highest quality.</p>
        </div>
        <div style={styles.feature}>
          <h3>Lightning Fast</h3>
          <p>This cloud-hosted, highly scalable tool can resize your images within seconds!</p>
        </div>
        <div style={styles.feature}>
          <h3>Easy To Use</h3>
          <p>Simply upload your image and enter a target size. It's as easy as that!</p>
        </div>
        <div style={{ padding: '20px', textAlign: 'left' }}>
          <h1>Image and PDF Tools: Fast, Free, and User-Friendly</h1>
          <p>Our website offers a comprehensive suite of image and PDF tools designed for efficiency and ease of use. Built with <strong>React</strong>, the platform delivers lightning-fast processing times, ensuring that users can complete tasks quickly and effectively. All tools are completely free and cover a wide range of image and PDF functions.</p>
          <br />
          <h1>Image Tools</h1>
          <h3>1. Image Resizer</h3>
          <p>The <strong>Image Resizer</strong> tool allows users to quickly resize images to their desired dimensions. Whether you need to adjust the size of an image for social media, web use, or printing, this tool ensures the quality of the image is preserved, even after resizing. Users simply upload an image, set the desired dimensions, and download the resized file.</p>
          <h3>2. Crop Image</h3>
          <p>The <strong>Crop Image</strong> tool enables users to cut or crop images to focus on specific areas. Ideal for creating cropped images for profile pictures, thumbnails, or design purposes, this tool is straightforward and precise, giving users the flexibility to select and crop the image exactly as needed.</p>
          <h3>3. Image Converter</h3>
          <p>With the <strong>Image Converter</strong> tool, users can convert images between various formats such as JPG, PNG, WebP, GIF, and more. This tool is especially useful for converting images to the appropriate format for websites, social media, or printing. It offers quick, high-quality conversions without any file distortion.</p>
          <h3>4. Image Compressor</h3>
          <p>The <strong>Image Compressor</strong> tool helps reduce the file size of images without compromising quality. It’s perfect for users who need to optimize images for web use, email sharing, or social media platforms. This tool compresses large images quickly, ensuring they load faster without losing their original visual appeal.</p>
          <br />
          <h1>PDF Tools</h1>
          <h3>1. PDF Merge</h3>
          <p>The <strong>PDF Merge</strong> tool allows users to combine multiple PDF files into a single document. Whether working with contracts, reports, or other PDF files, this tool simplifies the process of merging documents into one, ensuring that the layout and formatting are preserved. Users can easily upload the PDFs, arrange them in the desired order, and download the merged document in just a few steps.</p>
          <h3>2. PDF Split</h3>
          <p>The <strong>PDF Split</strong> tool enables users to divide a large PDF document into smaller, more manageable files. This tool allows users to select specific pages or ranges to split, providing flexibility in handling large documents. It’s perfect for extracting individual sections, such as reports, contracts, or chapters, from a larger file.</p>
          <h2>Why Choose Our Tools?</h2>
          <ul>
            <li><strong>Fast Processing:</strong> Powered by <strong>React</strong>, our tools deliver quick results, even when handling large files, ensuring users save time and effort.</li>
            <li><strong>Free to Use:</strong> All tools are completely free, with no hidden charges or limitations on usage.</li>
            <li><strong>User-Friendly:</strong> Designed with a simple interface, our tools are easy to navigate, making it accessible for both beginners and advanced users.</li>
            <li><strong>High-Quality Output:</strong> Whether resizing an image, merging a PDF, or compressing files, our tools ensure high-quality results without compromising on performance.</li>
          </ul>
          <p>Our platform covers all essential functions for image and PDF management, making it an ideal choice for users who need quick, reliable, and free tools to process their files.</p>
        </div>
      </div>
    </div>
  );
}; const styles = {
  container: { fontFamily: "Arial, sans-serif", textAlign: "center", padding: "20px", backgroundColor: "#f9f9f9" },
  title: { fontSize: "35px", fontWeight: "bold", marginBottom: "20px" },
  subtitle: { fontSize: "1.2rem", color: "#555" },
  uploadBox: { borderRadius: "30px", padding: "40px", margin: "5px auto", maxWidth: "800px", background: "linear-gradient(180deg,rgba(255, 255, 255, 0.84),rgba(135, 223, 245, 0.49))", position: "relative", boxShadow: "0 2px 10px rgba(0, 2, 3, 6)", transition: "all 0.3s ease", cursor: "pointer" },
  fileInput: { display: "none" },
  label: { display: "block", fontSize: "1rem", color: "#007bff", cursor: "pointer", fontWeight: "bold", marginBottom: "10px" },
  icon: { fontSize: "3rem", marginBottom: "10px" },
  features: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginTop: "30px" },
  feature: { maxWidth: "250px", margin: "10px", textAlign: "center" },
  toolLinksContainer: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginTop: "40px" },
  toolLinkBox: { width: "200px", padding: "10px", borderRadius: "15px", background: "linear-gradient(145deg, #ffffff, #e6e6e6)", boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.15), -5px -5px 10px rgba(255, 255, 255, 0.7)", textAlign: "center", textDecoration: "none", color: "#333", transition: "all 0.2s ease-in-out", position: "relative", overflow: "hidden" },
  toolLinkBoxHover: { transform: "scale(1.01) translateY(-1px)", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 119, 255, 0.6)", background: "linear-gradient(135deg, #007bff, #00d4ff)", color: "#fff" },
  toolIcon: { fontSize: "2.5rem", marginBottom: "10px", transition: "transform 0.3s ease-in-out" },
  toolIconHover: { transform: "rotateY(360deg)" }
}; export default ImageResizer;