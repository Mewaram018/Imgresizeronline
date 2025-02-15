import React, { useState } from 'react';
import { CircularProgress } from '@mui/material'; // Optional: Use Material UI Circular Progress
import { PDFDocument } from 'pdf-lib'; // Library to handle PDF manipulation (merge PDFs)
import { Helmet } from "react-helmet";
const PDFMergerTool = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [mergedPDF, setMergedPDF] = useState(null);
  const [mergedFileDetails, setMergedFileDetails] = useState({
    name: '',
    size: 0,
    pageCount: 0,
  });

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      setUploadProgress(0);

      const newFiles = [];

      for (let file of files) {
        const pdfBytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pageCount = pdfDoc.getPageCount();

        newFiles.push({
          file: file,
          pageCount: pageCount,
        });
      }

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setPdfFiles(newFiles);
        }
        setUploadProgress(progress);
      }, 100);
    }
  };

  const handleMerge = async () => {
    setIsMerging(true);
    setMergeProgress(0);

    const mergedPdf = await PDFDocument.create();

    for (const { file } of pdfFiles) {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    const mergedPdfBytes = await mergedPdf.save();
    const mergedBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });

    const mergedFile = new File([mergedBlob], 'Merged.pdf', { type: 'application/pdf' });
    const mergedFileSize = mergedFile.size;
    const mergedPageCount = mergedPdf.getPageCount();

    setMergedPDF(mergedFile);
    setMergedFileDetails({
      name: mergedFile.name,
      size: mergedFileSize,
      pageCount: mergedPageCount,
    });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
        setIsMerging(false);
      }
      setMergeProgress(progress);
    }, 100);
  };

  const formatFileSize = (size) => {
    return `${(size / 1024).toFixed(0)} KB`;
  };

  const downloadMergedPDF = () => {
    const url = URL.createObjectURL(mergedPDF);
    const link = document.createElement('a');
    link.href = url;
    link.download = mergedFileDetails.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.container}>
      <Helmet>
        <title>PDF Merger Tool - Merge PDF Files Online</title>
        <meta name="description" content="Merge multiple PDF files into one with ease. Upload PDF files, view their details, and merge them into a single PDF file." />
      <meta name="keywords" content="pdf merger, merge pdf files, pdf merge online, pdf merge tool" />
      </Helmet>
      <h1 style={styles.title}>PDF Merger Tool</h1>
      <p style={styles.subtitle}>Merge multiple PDF files into one with ease.</p>

      {!pdfFiles.length ? (
        <div style={styles.uploadBox}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            multiple
            style={styles.fileInput}
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" style={styles.label}>
            <div style={styles.icon}>
              <span role="img" aria-label="upload">
                📄
              </span>
            </div>
            <span style={{ color: 'black' }}>Upload PDF Files</span>
          </label>
          <p>Select the PDF files you want to merge. View their details like page count and file size before merging.</p>
        </div>
      ) : (
        <div style={styles.infoSection}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHead}>S.No.</th>
                <th style={styles.tableHead}>File Name</th>
                <th style={styles.tableHead}>Page Count</th>
                <th style={styles.tableHead}>Size</th>
              </tr>
            </thead>
            <tbody>
              {pdfFiles.map(({ file, pageCount }, index) => (
                <tr key={index} style={styles.tableRow}>
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}>{file.name}</td>
                  <td style={styles.tableCell}>{pageCount || 'Loading...'}</td>
                  <td style={styles.tableCell}>{formatFileSize(file.size)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isUploading && (
        <div style={styles.progressContainer}>
          <CircularProgress variant="determinate" value={uploadProgress} style={styles.progressBar} />
          <p>Uploading... {uploadProgress}%</p>
        </div>
      )}

      {pdfFiles.length > 0 && !isUploading && !isMerging && (
        <div style={styles.buttonContainer}>
          <button onClick={handleMerge} style={styles.button}>
            Merge PDFs
          </button>
        </div>
      )}

      {isMerging && (
        <div style={styles.progressContainer}>
          <CircularProgress variant="determinate" value={mergeProgress} style={styles.progressBar} />
          <p>Merging... {mergeProgress}%</p>
        </div>
      )}

      {mergedPDF && !isMerging && (
        <div style={styles.mergedDetails}>
          <p><strong>{mergedFileDetails.name}</strong></p>
          <p>Size: {formatFileSize(mergedFileDetails.size)}</p>
          <p>Pages: {mergedFileDetails.pageCount}</p>
          <button onClick={downloadMergedPDF} style={styles.button}>
            Download Merged PDF
          </button>
        </div>
      )}
    <div style={{ padding: '20px', textAlign: 'left' }}>
        <h1>PDF Merger Tool</h1>
        <p>
          The PDF Merger Tool is a fast, easy-to-use online solution for merging multiple PDF files into a single document. Whether you need to combine work reports, eBooks, invoices, or personal documents, this tool provides a seamless process to merge your PDFs in just a few clicks. With an intuitive interface, you can upload multiple PDF files at once, view their details such as page count and size, and merge them into one cohesive document.
        </p>

        <p>
          Our PDF merger ensures high-quality results, preserving the integrity of the original files, including all text, images, and formatting. No more switching between documents—merge PDFs to create a single, professional file that’s easy to share, store, and manage.
        </p>

        <h3>Key Features:</h3>
        <ul>
          <li>Merge unlimited PDF files with ease</li>
          <li>View file details before merging (size, page count)</li>
          <li>Fast and efficient merging process</li>
          <li>Download the merged PDF instantly</li>
          <li>No software installation required</li>
        </ul>

        <p>
          This tool is perfect for professionals, students, businesses, and anyone who frequently works with PDF documents. Boost productivity and save time by combining your PDFs into one with just a few clicks.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  title: {
    fontSize: '35px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '30px',
  },
  uploadBox: {
    borderRadius: '30px',
    padding: '40px',
    margin: '50px auto',
    maxWidth: '800px',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(135, 223, 245, 0.49))',
    position: 'relative',
    boxShadow: '0 2px 10px rgba(0, 2, 3, 6)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  label: {
    fontSize: '18px',
    marginBottom: '10px',
    cursor: 'pointer',
    color: 'green',
  },
  icon: {
    fontSize: '50px',
    color: '#d3d3d3',
    marginBottom: '10px',
  },
  fileInput: {
    display: 'none',
  },
  infoSection: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
  },
  table: {
    width: '100%',
    border: '2px solid #ddd',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHead: {
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  tableCell: {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  progressContainer: {
    marginTop: '20px',
  },
  progressBar: {
    marginBottom: '10px',
  },
  mergedDetails: {
    marginTop: '30px',
    padding: '15px',
    border: '2px solid #ccc',
    backgroundColor: '#e0f7fa',
    borderRadius: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    display: 'inline-block',
  },
  '@media (max-width: 480px)': {
    container: {
      padding: '10px',
    },
    title: {
      fontSize: '24px',
    },
    uploadBox: {
      padding: '20px',
    },
    button: {
      padding: '8px 16px',
      fontSize: '14px',
    },
    tableCell: {
      padding: '4px',
    },
    label: {
      fontSize: '14px',
    },
  },
};

export default PDFMergerTool;
