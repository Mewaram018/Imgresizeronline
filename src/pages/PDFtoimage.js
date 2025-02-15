import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

const PDFToImageTool = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setError("");
      handleExtractImages(file);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleExtractImages = async (file) => {
    try {
      const pdfjsLib = await import("pdfjs-dist/webpack");
      pdfjsLib.GlobalWorkerOptions.workerSrc = 
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";

      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        const pdfData = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

        const extractedImages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);

          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;

          const imageURL = canvas.toDataURL("image/png");
          extractedImages.push({ pageNumber: i, imageURL });
        }

        setImages(extractedImages);
      };

      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      setError("Failed to process PDF file. Ensure the PDF is valid.");
    }
  };

  const downloadImage = (image, index) => {
    const link = document.createElement("a");
    link.href = image.imageURL;
    link.download = `page-${index + 1}.png`;
    link.click();
  };

  const downloadAllImages = () => {
    images.forEach((image, index) => downloadImage(image, index));
  };

  return (
    <div className="container">
      <h1 className="title">PDF to Image Converter</h1>
      <p className="subtitle">Upload a PDF to convert its pages into images.</p>

      {!images.length && (
        <div className="upload-box">
          <label htmlFor="file-upload" className="upload-label">
            <UploadCloud size={40} color="#007bff" />
            <p className="upload-text">Upload PDF</p>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <p className="upload-description">Drag and drop your PDF here or click above to browse.</p>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}

      {images.length > 0 && (
        <div className="image-container">
          <h2>Extracted Images</h2>
          <button className="download-all-button" onClick={downloadAllImages}>Download All</button>
          {images.map((image, index) => (
            <div key={index} className="image-box">
              <h3>Page {index + 1}</h3>
              <img src={image.imageURL} alt={`Page ${index + 1}`} className="thumbnail" />
              <button className="download-button" onClick={() => downloadImage(image, index)}>Download Page {index + 1}</button>
            </div>
          ))}
        </div>
      )}
      <br/>
      <br/>
        <h1>Free PDF to Image Converter – Convert PDF Pages to High-Quality Images Instantly</h1>

<p>Convert your PDF files into high-quality images quickly and easily with our <strong>free PDF to Image converter</strong>. 
    No software installation is required—simply upload your PDF, and our tool will extract each page as a PNG or JPG image in seconds. 
    Download individual pages or all images at once with a single click.</p>

<h2>Key Features:</h2>
<ul style = {{textAlign: 'left'}}>
    <li>✅ <strong>Fast & Free</strong> – Convert PDF pages to images instantly, without any cost.</li>
    <li>✅ <strong>High-Quality Output</strong> – Get sharp, clear PNG or JPG images from your PDFs.</li>
    <li>✅ <strong>No Watermarks</strong> – Enjoy full-quality downloads without any branding.</li>
    <li>✅ <strong>Secure & Private</strong> – Your files are processed securely and never stored.</li>
    <li>✅ <strong>Easy to Use</strong> – Simple drag-and-drop interface with instant conversion.</li>
</ul>

<p>Perfect for students, professionals, and anyone needing to extract images from PDFs effortlessly. 
    Try it now and convert your PDFs to images in just a few clicks!</p>
    </div>
  );
};

export default PDFToImageTool;

// CSS
const styles = `
  .container {
    padding: 20px;
    text-align: center;
    background-color: #f4f4f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 1400px;
    margin: 0 auto;
  }

  .title {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .upload-box {
    border-radius: 20px;
    padding: 30px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(135, 223, 245, 0.49));
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .download-all-button {
    background: #28a745;
    color: #FFF;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .download-button {
    border-radius: 8px;
    }
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);