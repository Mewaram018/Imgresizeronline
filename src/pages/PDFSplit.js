import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import { Helmet } from "react-helmet";

const PDFSplitTool = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [splitPages, setSplitPages] = useState('');
  const [splitPDFs, setSplitPDFs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      setProgress(0);

      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      setPageCount(pdfDoc.getPageCount());
      setPdfFile(file);

      let progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsUploading(false);
          }
          return prev + 25;
        });
      }, 100);
    }
  };

  const handleSplit = async () => {
    setIsSplitting(true);
    setProgress(0);

    const pageNumbers = splitPages.split(',').map((range) => range.trim());
    const pdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const splitDocs = [];

    for (const range of pageNumbers) {
      const [start, end] = range.split('-').map(Number);
      const pdf = await PDFDocument.create();
      const pages = await pdf.copyPages(
        pdfDoc,
        Array.from({ length: (end || start) - start + 1 }, (_, i) => i + start - 1)
      );
      pages.forEach((page) => pdf.addPage(page));
      splitDocs.push(await pdf.save());
    }

    setSplitPDFs(splitDocs.map((bytes, i) => new Blob([bytes], { type: 'application/pdf' })));

    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsSplitting(false);
        }
        return prev + 25;
      });
    }, 100);
  };

  const downloadSplitPDF = (blob, index) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `split_${index + 1}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.container}>
        <Helmet>
        <title>PDF Split Tool - Split PDF Files Online</title>
        <meta name="description" content="Split your PDF files into multiple documents with our free online PDF Split Tool. Extract specific pages or ranges quickly and easily." />
        <meta name="keywords" content="split pdf, pdf splitter, pdf split tool, extract pdf pages, pdf page extractor" />
        </Helmet>
      <h1 style={styles.title}>PDF Split Tool</h1>
      <p style={styles.subtitle}>Split your PDF files into multiple documents.</p>

      {!pdfFile ? (
        <div style={styles.uploadBox}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={styles.fileInput}
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" style={styles.label}>
            <div style={styles.icon}>
              <span role="img" aria-label="upload">
                📄
              </span>
            </div>
            <span style={{ color: 'black' }}>Upload PDF File</span>
          </label>
          <p>Select the PDF file you want to split. You can specify the page ranges to split.</p>
        </div>
      ) : (
        <div style={styles.infoSection}>
          <p><strong>{pdfFile.name}</strong></p>
          <p>Page Count: {pageCount}</p>
          <div style={styles.inputContainer}>
            <label htmlFor="splitPages" style={styles.label}>Enter Page Ranges (e.g., 1-3,5,7-10):</label>
            <input
              type="text"
              id="splitPages"
              value={splitPages}
              onChange={(e) => setSplitPages(e.target.value)}
              style={styles.input}
            />
          </div>
        </div>
      )}

      {isUploading && (
        <div style={styles.progressContainer}>
          <CircularProgress variant="determinate" value={progress} style={styles.progressBar} />
          <p>Uploading... {progress}%</p>
        </div>
      )}

      {pdfFile && !isUploading && !isSplitting && (
        <div style={styles.buttonContainer}>
          <button onClick={handleSplit} style={styles.button} disabled={!splitPages}>
            Split PDF
          </button>
        </div>
      )}

      {isSplitting && (
        <div style={styles.progressContainer}>
          <CircularProgress variant="determinate" value={progress} style={styles.progressBar} />
          <p>Splitting... {progress}%</p>
        </div>
      )}

      {splitPDFs.length > 0 && !isSplitting && (
        <div style={styles.splitDetails}>
          <p><strong>Split PDFs:</strong></p>
          {splitPDFs.map((blob, index) => (
            <button key={index} onClick={() => downloadSplitPDF(blob, index)} style={styles.downloadButton}>
              Download Split {index + 1}
            </button>
          ))}
        </div>
      )}
      <div style={{ padding: '20px', textAlign: 'left' }}>
  <h1>PDF Split Tool</h1>
  <p>
    The PDF Split Tool is a simple, fast, and efficient online solution for splitting your PDF documents into smaller files. Whether you need to extract specific pages, divide a large document, or separate sections of a report, this tool makes it easy to break down your PDFs in just a few clicks. With a user-friendly interface, you can quickly upload your PDF, select the pages to split, and download the separated files.
  </p>

  <p>
    Our PDF split tool ensures high-quality output, maintaining the integrity of your document while extracting pages. No need to worry about complex software or long processing times—split PDFs quickly and precisely with just a few steps.
  </p>

  <h3>Key Features:</h3>
  <ul>
    <li>Effortlessly split PDFs into smaller files</li>
    <li>Select specific pages or ranges to split</li>
    <li>Fast and secure PDF splitting process</li>
    <li>Download the new PDF files instantly</li>
    <li>No software installation needed</li>
  </ul>

  <p>
    This tool is ideal for professionals, students, and anyone who needs to work with specific sections of PDF documents. Save time and enhance productivity by splitting PDFs into manageable pieces with just a few clicks.
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
  inputContainer: {
    margin: '20px 0',
  },
  input: {
    padding: '10px',
    width: '80%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  progressContainer: {
    marginTop: '20px',
  },
  progressBar: {
    marginBottom: '10px',
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
  downloadButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '10px',
  },
  splitDetails: {
    marginTop: '30px',
    padding: '15px',
    border: '2px solid #ccc',
    backgroundColor: '#e0f7fa',
    borderRadius: '10px',
  },
};

export default PDFSplitTool;
