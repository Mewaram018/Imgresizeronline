import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { UploadCloud } from 'lucide-react';

const compressImage = (image, quality) => new Promise((resolve) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
    resolve(dataURLToBlob(compressedDataUrl));
  };
  img.src = URL.createObjectURL(image);
});

const dataURLToBlob = (dataURL) => {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ab], { type: mimeString });
};

const ImageCompressor = () => {
  const [images, setImages] = useState([]);
  const [compressedImages, setCompressedImages] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      size: file.size / 1024,
      compressionLevel: 'medium',
    }));
    setImages(newImages);
    setCompressedImages({});
    setIsUploading(true);

    Promise.all(newImages.map(async ({ file, compressionLevel }) => {
      const quality = getQualityFromLevel(compressionLevel);
      const compressedBlob = await compressImage(file, quality);
      return { name: file.name, size: compressedBlob.size / 1024, url: URL.createObjectURL(compressedBlob) };
    })).then((compressedData) => {
      setCompressedImages(Object.fromEntries(compressedData.map((data) => [data.name, data])));
      setIsUploading(false);
    });
  };

  const getQualityFromLevel = (level) => {
    if (level === 'low') return 0.2;
    if (level === 'high') return 0.8;
    return 0.5;
  };

  const handleCompressionChange = async (level) => {
    const updatedCompressedImages = {};
    for (const { file, name } of images) {
      const quality = getQualityFromLevel(level);
      const compressedBlob = await compressImage(file, quality);
      updatedCompressedImages[name] = { name, size: compressedBlob.size / 1024, url: URL.createObjectURL(compressedBlob), compressionLevel: level };
    }
    setCompressedImages(updatedCompressedImages);
  };

  const handleDownload = (compressedUrl, name) => {
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = name;
    link.click();
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    for (const { name, url } of Object.values(compressedImages)) {
      zip.file(name, fetch(url).then((res) => res.blob()));
    }
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'compressed_images.zip');
  };

  const handleIndividualCompressionChange = async (index, level) => {
    const updatedImages = [...images];
    updatedImages[index].compressionLevel = level;
    const updatedCompressedImages = {};
    for (const { file, name, compressionLevel } of updatedImages) {
      const quality = getQualityFromLevel(compressionLevel);
      const compressedBlob = await compressImage(file, quality);
      updatedCompressedImages[name] = { name, size: compressedBlob.size / 1024, url: URL.createObjectURL(compressedBlob), compressionLevel };
    }
    setImages(updatedImages);
    setCompressedImages(updatedCompressedImages);
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Compress Image - Free Online Image Compression Tool</title>
        <meta name="description" content="Reduce the file size of your images without compromising quality with our free Compress Image tool. Perfect for web and email use." />
        <meta name="keywords" content="compress image, online image compressor, image compression tool, reduce image size, compress photos, online image compression" />
      </Helmet>
      <h1 style={styles.title}>Image Compressor</h1>
      <p style={styles.subtitle}>Reduce the file size of your images without compromising quality with our free Compress Image tool. Perfect for web and email use.</p>
      {!images.length && (
        <div style={styles.uploadBox}>
          <input type="file" accept="image/*" onChange={handleImageUpload} multiple style={styles.fileInput} id="imageUpload" />
          <label htmlFor="imageUpload" style={styles.label}>
            <div style={styles.icon}>
              <UploadCloud size={40} color="#007bff" />
              <p className="upload-text">Upload Images</p>
            </div>
          </label>
          <p>Upload images and compress them to your desired quality.</p>
        </div>
      )}
      {isUploading && (
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progress, width: '100%' }}></div>
          </div>
          <span style={styles.progressText}>Processing...</span>
        </div>
      )}
      {!isUploading && images.length > 0 && (
        <div style={styles.compressedContainer}>
          <h3>Original and Compressed Images</h3>
          <table style={{ ...styles.table, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Image Preview</th>
                <th style={styles.tableHeader}>Image Name</th>
                <th style={styles.tableHeader}>Original Size</th>
                <th style={styles.tableHeader}>Compressed Size</th>
                <th style={styles.tableHeader}>Compression Level</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {images.map(({ name, size, file, compressionLevel }, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>
                    <img src={URL.createObjectURL(file)} alt={name} style={styles.imagePreview} />
                  </td>
                  <td style={styles.tableCell}><p style={styles.infoText}><strong>{name}</strong></p></td>
                  <td style={styles.tableCell}><p style={styles.infoText}>{size.toFixed(2)} KB</p></td>
                  <td style={styles.tableCell}>
                    {compressedImages[name] ? (
                      <p style={styles.infoText}>{compressedImages[name].size.toFixed(2)} KB</p>
                    ) : (
                      <p style={styles.infoText}>Compressing...</p>
                    )}
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.compressionControls}>
                      <button onClick={() => handleIndividualCompressionChange(index, 'low')} style={styles.compressionButton}>Low</button>
                      <button onClick={() => handleIndividualCompressionChange(index, 'medium')} style={styles.compressionButton}>Medium</button>
                      <button onClick={() => handleIndividualCompressionChange(index, 'high')} style={styles.compressionButton}>High</button>
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    {compressedImages[name] && (
                      <button onClick={() => handleDownload(compressedImages[name].url, name)} style={styles.downloadButton}>Download</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.compressionControls}>
            <button onClick={() => handleCompressionChange('low')} style={styles.compressionButton}>Low (All)</button>
            <button onClick={() => handleCompressionChange('medium')} style={styles.compressionButton}>Medium (All)</button>
            <button onClick={() => handleCompressionChange('high')} style={styles.compressionButton}>High (All)</button>
          </div>
          <button onClick={handleDownloadAll} style={styles.downloadAllButton}>Download All in Zip file</button>
        </div>
      )}
      <div style={{ padding: '20px', textAlign: 'left' }}>
        <h1>Image Compressor Tool</h1>
        <p>The Image Compressor Tool is a fast, simple, and efficient online solution for reducing the size of your image files without compromising quality. Whether you're looking to optimize images for your website, social media, or email attachments, this tool ensures that your images remain sharp while reducing file size. With an intuitive interface, you can easily upload your images, compress them, and download the optimized files.</p>
        <p>Our image compressor guarantees high-quality results, ensuring that your images retain their visual clarity even after compression. No need for complicated software—compress your images in just a few clicks, saving bandwidth and storage space.</p>
        <h3>Key Features:</h3>
        <ul>
          <li>Effortlessly compress images with minimal quality loss</li>
          <li>Supports popular image formats like JPG, PNG, and more</li>
          <li>Fast and secure compression process</li>
          <li>Download the optimized images instantly</li>
          <li>No software installation required</li>
        </ul>
        <p>This tool is perfect for website owners, bloggers, professionals, and anyone who needs to compress images for a faster and more efficient online experience. Optimize your images quickly and easily to improve site performance and reduce load times.</p>
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', padding: '20px', backgroundColor: '#f4f4f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '1400px', margin: '0 auto' },
  title: { fontSize: '35px', fontWeight: 'bold', marginBottom: '20px', width: '100%' },
  uploadBox: { borderRadius: '30px', padding: '40px', margin: '5px auto', maxWidth: '800px', background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(135, 223, 245, 0.49))', position: 'relative', boxShadow: '0 2px 10px rgba(0, 2, 3, 6)', transition: 'all 0.3s ease', cursor: 'pointer' },
  fileInput: { display: 'none' },
  icon: { fontSize: '3rem', marginBottom: '10px' },
  compressedContainer: { marginTop: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
  infoText: { fontSize: '14px', color: '#555', margin: '10px 0' },
  imagePreview: { maxWidth: '50px', height: 'auto', marginTop: '10px', width: '100px' },
  progressContainer: { margin: '30px 0' },
  progressBar: { width: '100%', backgroundColor: '#ddd', height: '8px', borderRadius: '4px' },
  progress: { backgroundColor: '#4caf50', height: '100%', borderRadius: '4px' },
  progressText: { fontSize: '14px', color: '#555', marginTop: '10px' },
  downloadButton: { padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', fontSize: '16px' },
  compressionControls: { marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '15px' },
  compressionButton: { padding: '8px 15px', fontSize: '14px', borderRadius: '5px', backgroundColor: '#2196F3', cursor: 'pointer', transition: 'background-color 0.3s' },
  downloadAllButton: { marginTop: '20px', padding: '12px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' },
  tableHeader: { padding: '10px', border: '1px solid #ddd', backgroundColor: '#f4f4f4' },
  tableRow: { borderBottom: '1px solid #ddd' },
  tableCell: { padding: '10px', border: '1px solid #ddd', textAlign: 'center' },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @media (max-width: 768px) {
    .mobile-hidden {
      display: none !important;
    }
  }
`, styleSheet.cssRules.length);
export default ImageCompressor;