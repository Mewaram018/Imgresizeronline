import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExpand, FaCrop, FaCompress, FaExchangeAlt } from 'react-icons/fa';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Found</p>
      <div className="not-found-actions">
        <Link to="/" className="not-found-link">Go to Home</Link>
        <button onClick={() => window.history.back()} className="not-found-button">Go Back</button>
      </div>
      <div className="not-found-pages">
        <h2>Available Pages</h2>
        <ul className="not-found-page-list">
          <li><Link to="/" className="not-found-page-link"><FaHome /> Home</Link></li>
          <li><Link to="/image-resizer" className="not-found-page-link"><FaExpand /> Image Resizer</Link></li>
          <li><Link to="/crop-image" className="not-found-page-link"><FaCrop /> Crop Image</Link></li>
          <li><Link to="/image-compressor" className="not-found-page-link"><FaCompress /> Image Compressor</Link></li>
          <li><Link to="/image-converter" className="not-found-page-link"><FaExchangeAlt /> Image Converter</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound;