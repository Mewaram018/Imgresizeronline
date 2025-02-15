import React, { useState, useEffect, useRef } from "react";
import { FaArrowsAltH, FaArrowsAltV, FaRedo, FaUndo } from "react-icons/fa";
import jsPDF from "jspdf";

const ImageEditor = ({ image, dimensions }) => {
  const [width, setWidth] = useState(dimensions.width);
  const [height, setHeight] = useState(dimensions.height);
  const [unit, setUnit] = useState("px");
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [format, setFormat] = useState("JPG");
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [imageBlob, setImageBlob] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  const [resizePercentage, setResizePercentage] = useState(100);
  const containerRef = useRef(null);

  useEffect(() => {
    setWidth(dimensions.width);
    setHeight(dimensions.height);

    fetch(image)
      .then((res) => res.blob())
      .then((blob) => {
        setImageBlob(blob);
        setFileSize(blob.size / 1024);
      });
  }, [dimensions, image]);

  const convertUnits = (value, fromUnit, toUnit) => {
    const conversionRates = {
      px: 1,
      inch: 96,
      cm: 37.7952755906,
      mm: 3.7795275591,
    };
    return (value * conversionRates[fromUnit]) / conversionRates[toUnit];
  };

  const handleWidthChange = (e) => {
    const newWidth = parseInt(e.target.value, 10) || 0;
    if (lockAspectRatio) {
      const aspectRatio = dimensions.width / dimensions.height;
      setWidth(newWidth);
      setHeight(Math.round(newWidth / aspectRatio));
    } else {
      setWidth(newWidth);
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value, 10) || 0;
    if (lockAspectRatio) {
      const aspectRatio = dimensions.width / dimensions.height;
      setHeight(newHeight);
      setWidth(Math.round(newHeight * aspectRatio));
    } else {
      setHeight(newHeight);
    }
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setWidth(convertUnits(width, unit, newUnit));
    setHeight(convertUnits(height, unit, newUnit));
    setUnit(newUnit);
  };

  const handleFlipHorizontal = () => {
    setFlipHorizontal(!flipHorizontal);
  };

  const handleFlipVertical = () => {
    setFlipVertical(!flipVertical);
  };

  const handleRotateClockwise = () => {
    setRotate((prevRotate) => prevRotate + 90);
  };

  const handleRotateCounterClockwise = () => {
    setRotate((prevRotate) => prevRotate - 90);
  };

  const handleResize = () => {
    if (!imageBlob) return;

    const newWidth = unit === "px" ? width : convertUnits(width, unit, "px");
    const newHeight = unit === "px" ? height : convertUnits(height, unit, "px");

    // Create a high-resolution canvas for resizing
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Set the canvas width and height to a larger resolution
      const highResFactor = 2; // Increase this factor for even better quality (higher factor = better quality but larger file size)
      const highResWidth = newWidth * highResFactor;
      const highResHeight = newHeight * highResFactor;

      canvas.width = highResWidth;
      canvas.height = highResHeight;

      // Draw the image to the canvas at the higher resolution
      ctx.drawImage(img, 0, 0, highResWidth, highResHeight);

      // Now, scale the image down to the desired size
      const scaledCanvas = document.createElement('canvas');
      const scaledCtx = scaledCanvas.getContext('2d');
      scaledCanvas.width = newWidth;
      scaledCanvas.height = newHeight;

      // Draw the high-res canvas to a scaled canvas
      scaledCtx.drawImage(canvas, 0, 0, highResWidth, highResHeight, 0, 0, newWidth, newHeight);

      // Export the image with high quality
      if (format === "PDF") {
        const pdf = new jsPDF();
      
        // Calculate the aspect ratio and set the PDF dimensions
        let pdfWidth = newWidth;
        let pdfHeight = newHeight;
      
        // Convert dimensions to points (1 point = 1/72 inch)
        if (unit === "px") {
          pdfWidth = newWidth * 0.75; // 72 dpi
          pdfHeight = newHeight * 0.75; // 72 dpi
        } else {
          pdfWidth = convertUnits(newWidth, unit, "inch") * 72; // Convert to points
          pdfHeight = convertUnits(newHeight, unit, "inch") * 72; // Convert to points
        }
      
        // Set the PDF page size dynamically
        pdf.internal.pageSize.setWidth(pdfWidth);
        pdf.internal.pageSize.setHeight(pdfHeight);
      
        // Convert the scaled canvas to an image
        const imgData = scaledCanvas.toDataURL("image/jpeg", 1.0); // High-quality JPEG
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      
        // Save the PDF
        pdf.save("resized-image.pdf");
      } else {
        const dataUrl = scaledCanvas.toDataURL(`image/${format.toLowerCase()}`, 1.0); // Ensure high quality by passing quality parameter
        const blob = dataURLToBlob(dataUrl);
        setFileSize(blob.size / 1024);
        handleDownloadImage(blob);
      }
    };

    img.src = URL.createObjectURL(imageBlob);
  };

  const dataURLToBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleDownloadImage = (blob) => {
    const link = document.createElement("a");
    link.download = `resized-image.${format.toLowerCase()}`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const handleScroll = (e) => {
    const percentage = parseInt(e.target.value, 10);
    const clampedPercentage = Math.min(Math.max(percentage, 1), 200);
    setResizePercentage(clampedPercentage);

    const newWidth = Math.round((dimensions.width * clampedPercentage) / 100);
    const newHeight = Math.round((dimensions.height * clampedPercentage) / 100);

    setWidth(newWidth);
    setHeight(newHeight);

    if (imageBlob) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL(`image/${format.toLowerCase()}`);
        const blob = dataURLToBlob(dataUrl);
        const newFileSize = clampedPercentage === 1 ? 1 : blob.size / 1024;
        setFileSize(newFileSize);
      };

      img.src = URL.createObjectURL(imageBlob);
    }
  };

  return (
    <div style={styles.container} ref={containerRef}>
      <h1 style={styles.title}>Image Editor</h1>
      <div style={styles.dashboard}>
        <div style={styles.imagePreview}>
          {image ? (
            <div style={styles.imageContainer}>
              <img
                src={image}
                alt="Preview"
                style={{
                  ...styles.image,
                  transform: `
                    scaleX(${flipHorizontal ? -1 : 1})
                    scaleY(${flipVertical ? -1 : 1})
                    rotate(${rotate}deg)
                  `,
                }}
              />
            </div>
          ) : (
            <p>Upload an image to preview and edit</p>
          )}
        </div>
        <div style={styles.settings}>
          <h3>Resize Settings</h3>
          <div style={styles.inputGroup}>
            <label>Width:</label>
            <div style={styles.inputWithSelect}>
            <input
  type="number"
  id="width"
  name="width"
  value={width}
  onChange={handleWidthChange}
  style={styles.input}
/>
<select id="unit" name="unit" value={unit} onChange={handleUnitChange} style={styles.select}>
  <option value="px">px</option>
                <option value="inch">inch</option>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
              </select>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label>Height:</label>
            <div style={styles.inputWithSelect}>
              <input
                type="number"
                value={height}
                onChange={handleHeightChange}
                style={styles.input}
              />
              <select value={unit} onChange={handleUnitChange} style={styles.select}>
                <option value="px">px</option>
                <option value="inch">inch</option>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
              </select>
            </div>
          </div>
          <div style={styles.checkboxGroup}>
            <input
              type="checkbox"
              checked={lockAspectRatio}
              onChange={() => setLockAspectRatio(!lockAspectRatio)}
            />
            <label>Lock Aspect Ratio</label>
          </div>
          <div style={styles.inputGroup}>
            <label>Set Image Size:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={resizePercentage}
              onChange={handleScroll}
              style={styles.scrollBar}
            />
            <div style={styles.inputGroup}>
            <label>Insert % For size:</label>
            <div style={styles.inputWithSelect}>
              <input
                type="number"
                value={resizePercentage}
                onChange={handleScroll}
                style={styles.input}
              />
             </div>
          </div>
          </div>
          <div style={styles.fileSizeDisplay}>
            <label style={styles.boldText}>Image Size: {fileSize.toFixed(2)} KB</label>
            <label style={styles.boldText}>Resize Percentage: {resizePercentage}%</label>
          </div>
          <br></br>
          <h3>Flip and Rotate</h3>
          <div style={styles.buttonGroup}>
            <button onClick={handleFlipHorizontal} style={styles.flipButton}>
              <FaArrowsAltH />
            </button>
            <button onClick={handleFlipVertical} style={styles.flipButton}>
              <FaArrowsAltV />
            </button>
            <button onClick={handleRotateClockwise} style={styles.flipButton}>
              <FaRedo />
            </button>
            <button onClick={handleRotateCounterClockwise} style={styles.flipButton}>
              <FaUndo />
            </button>
          </div>
          <h3>Export Settings</h3>
          <div style={styles.inputGroup}>
            <label>Save Image As:</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              style={styles.select}
            >
              <option value="JPG">JPG</option>
              <option value="PNG">PNG</option>
              <option value="WEBP">WEBP</option>
              <option value="GIF">GIF</option>
              <option value="TIFF">TIFF</option>
              <option value="BMP">BMP</option>
              <option value="PDF">PDF</option>
              <option value="AVIF">AVIF</option>
              <option value="HEIF">HEIF</option>
              <option value="PPM">PPM</option>
              <option value="PGM">PGM</option>
              <option value="PBM">PBM</option>
              <option value="PNM">PNM</option>
            </select>
          </div>
          <button style={styles.resizeButton} onClick={handleResize}>
            Download Your Image
          </button>
        </div>
      </div>
    </div>
  );
};



const styles = {
  container: {
    display: 'flex',
    height: '110vh',          // Full height of the viewport
    justifyContent: "center",
    flexDirection: 'column',  // Stack children vertically (optional)
    alignItems: 'center',     // Center vertically
    fontFamily: "Arial, sans-serif",
    padding: "1px",
    maxWidth: "100%", // Ensure the container does not exceed the screen width
    boxSizing: "border-box", // Include padding and border in the element's total width and height
  },
 
  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  dashboard: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap", // Allow items to wrap to the next line if they don't fit
  },
  settings: {
    flex: 1,
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    boxSizing: "border-box", // Include padding and border in the element's total width and height
  },
  inputGroup: {
    margin: "15px 0",
  },
  inputWithSelect: {
    display: "flex",
    alignItems: "center",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    margin: "15px 0",
  },
  scrollBar: {
    width: "100%",
    marginTop: "10px",
  },
  fileSizeDisplay: {
    marginTop: "10px",
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0",
  },
  flipButton: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "0 5px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  resizeButton: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
  },
  imagePreview: {
    flex: 2,
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    overflow: "hidden",
    boxSizing: "border-box", // Include padding and border in the element's total width and height
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    overflow: "hidden",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "8px",
  },
  '@media (max-width: 768px)': {
    container: {
      padding: "10px",
    },
    dashboard: {
      flexDirection: "column",
      gap: "10px",
    },
    settings: {
      order: 2,
      padding: "10px",
    },
    imagePreview: {
      order: 1,
      padding: "10px",
    },
    input: {
      padding: "5px",
    },
    select: {
      padding: "5px",
    },
    flipButton: {
      padding: "5px",
      margin: "0 2px",
    },
    resizeButton: {
      padding: "8px",
    },
    
  },
};

export default ImageEditor;