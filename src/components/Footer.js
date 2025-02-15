import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Left Column */}
        <div className="footer-left">
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>

        {/* Middle Column: Image Tools */}
        <div className="footer-middle">
          <h4>Image Tools</h4>
          <ul>
            <li><Link to="/image-resizer">Image Resizer</Link></li>
            <li><Link to="/crop-image">Crop Image</Link></li>
            <li><Link to="/image-compressor">Image Compressor</Link></li>
            <li><Link to="/image-converter">Image Converter</Link></li>
          </ul>
        </div>

        {/* Right Column: PDF Tools */}
        <div className="footer-right">
          <h4>PDF Tools</h4>
          <ul>
            <li><Link to="/image-to-pdf">Image to PDF</Link></li>
            <li><Link to="/pdf-to-image">PDF to Image</Link></li>
            <li><Link to="/pdf-merger">PDF Merge</Link></li>
            <li><Link to="/pdf-split">PDF Split</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">2025 Copyright</span>
        <span className="footer-terms">
          <Link to="/privacy-policy">Terms and Conditions</Link>
        </span>
      </div>

      <style>{`
        footer {
          background-color: #101e41;
          padding: 40px 0;
          color: #fff;
          font-family: 'Roboto', sans-serif;
        }

        .footer-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 0px;
        }

        .footer-left, .footer-middle, .footer-right {
          text-align: center;
        }

        .footer-left ul, .footer-middle ul, .footer-right ul {
          list-style: none;
          padding: 0;
        }

        .footer-left li, .footer-middle li, .footer-right li {
          font-size: 16px;
          margin-bottom: 10px;
        }

        .footer-left a, .footer-middle a, .footer-right a {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-left a:hover, .footer-middle a:hover, .footer-right a:hover {
          color: #ff5733;
        }

        .footer-middle h4, .footer-right h4 {
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: 600;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #fff;
          padding-top: 10px;
          font-size: 14px;
          color: #fff;
        }

        .footer-bottom .footer-copyright {
          font-weight: 400;
          padding-left: 10px;
        }

        .footer-bottom .footer-terms {
          font-weight: 500;
          padding-right: 10px;
        }

        .footer-bottom .footer-terms a {
          color: rgb(255, 255, 255);
        }

        .footer-bottom .footer-terms a:hover {
          color: #ff914d;
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr; /* Single column on small screens */
            gap: 20px;
            align-items: center;
          }

          .footer-left, .footer-middle, .footer-right {
            text-align: center;
          }

          .footer-middle h4, .footer-right h4 {
            margin-top: 20px;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .footer-bottom span {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
