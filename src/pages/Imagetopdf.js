import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PDFDocument } from 'pdf-lib';
import { Helmet } from "react-helmet";
import { UploadCloud } from 'lucide-react';

const ImageToPDFTool = () => {
  const [images, setImages] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    setImages(validImages.map((file, index) => ({ id: `image-${index}`, file })));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedImages = Array.from(images);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);
    setImages(reorderedImages);
  };

  const handleConvertToPDF = async () => {
    setIsConverting(true);
    setProgress(0);
    const pdfDoc = await PDFDocument.create();
    const A4_WIDTH = 595;
    const A4_HEIGHT = 842;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      try {
        const imgBytes = await image.file.arrayBuffer();
        const img = await pdfDoc.embedJpg(imgBytes);
        const imgWidth = img.width;
        const imgHeight = img.height;
        const scale = Math.min(A4_WIDTH / imgWidth, A4_HEIGHT / imgHeight);
        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;
        const x = (A4_WIDTH - scaledWidth) / 2;
        const y = (A4_HEIGHT - scaledHeight) / 2;
        const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
        page.drawImage(img, { x, y, width: scaledWidth, height: scaledHeight });

        // Update progress
        setProgress(((i + 1) / images.length) * 100);
      } catch (error) {
        console.error("Error embedding image:", error);
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted.pdf';
    link.click();
    URL.revokeObjectURL(url);
    setIsConverting(false);
    setProgress(0);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Image to PDF Converter</title>
        <meta name="description" content="Convert images to PDF files online for free. No software installation needed." />
        <meta name="keywords" content="image to pdf, image to pdf converter, convert image to pdf, image to pdf online" />
      </Helmet>
      <h1 className="title">Image to PDF Converter</h1>
      <p className="subtitle">Convert images to PDF files online for free. No software installation needed.</p>
      {images.length === 0 && (
        <div className="upload-box">
          <label htmlFor="file-upload" className="upload-label">
            <UploadCloud size={40} color="#007bff" />
            <p className="upload-text">Upload Images</p>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <p className="upload-description">Drag and drop your images here or click above to browse.</p>
        </div>
      )}
      {images.length > 0 && (
        <div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="images">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="image-list">
                  {images.map((image, index) => (
                    <Draggable key={image.id} draggableId={image.id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="image-item">
                          <img src={URL.createObjectURL(image.file)} alt={`img-${index}`} className="thumbnail" />
                          {image.file.name} - {Math.round(image.file.size / 1024)} KB
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <button className="convert-button" onClick={handleConvertToPDF} disabled={isConverting}>
            {isConverting ? 'Converting...' : 'Download to PDF'}
          </button>
          {isConverting && (
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          )}
        </div>
      )}
      <br />
      <br />
      <div>
        <h1>Image to PDF Converter - Free and Fast</h1>
        <p>Convert your images to high-quality PDF documents quickly and effortlessly with our free and user-friendly tool. Whether you need to merge multiple images or convert a single one, this converter is designed to meet your needs.</p>
        <h2>Key Features:</h2>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>Completely Free:</strong> No hidden charges or subscriptions required.</li>
          <li><strong>Fast Processing:</strong> Converts images to PDFs in seconds.</li>
          <li><strong>Drag & Drop Interface:</strong> Easily upload images for hassle-free conversion.</li>
          <li><strong>Customizable Order:</strong> Rearrange images before converting to maintain your desired sequence.</li>
          <li><strong>Secure & Private:</strong> Your uploaded files are not stored or shared, ensuring maximum security.</li>
          <li><strong>No Software Required:</strong> Works directly from your browser—no installations needed.</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageToPDFTool;

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
  .title { font-size: 35px; font-weight: bold; margin-bottom: 20px; }
  .subtitle { font-size: 16px; margin-bottom: 30px; }
  .upload-box {
    border-radius: 30px;
    padding: 40px;
    margin: 30px auto;
    max-width: 800px;
    background: linear-gradient(180deg,rgba(255, 255, 255, 0.84),rgba(135, 223, 245, 0.49));
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 2, 3, 6);
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .upload-label { cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .upload-text { margin-top: 10px; font-size: 18px; font-weight: bold; color: #007bff; }
  .upload-description { margin-top: 10px; font-size: 14px; color: #666; }
  .image-list { padding: 0; margin: 20px 0; list-style: none; }
  .image-item { display: flex; align-items: center; padding: 10px; border: 1px solid #ccc; margin-bottom: 10px; border-radius: 5px; }
  .thumbnail { width: 100px; height: 100px; margin-right: 10px; }
  .convert-button { padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; border: none; border-radius: 5px; cursor: pointer; }
  .convert-button:disabled { background-color: #ccc; cursor: not-allowed; }
  .progress-bar { width: 100%; background-color: #e0e0e0; border-radius: 5px; margin-top: 10px; }
  .progress { height: 10px; background-color: #007bff; border-radius: 5px; transition: width 0.3s; }
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);