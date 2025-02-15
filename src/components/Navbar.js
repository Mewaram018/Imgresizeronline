import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    closeMenu(); // Close menu on navigation
  }, [location]);

  return (
    <>
      <style>
        {`
          /* Navbar Styles */
          .navbar {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: linear-gradient(135deg, #1e3a8a, #2563eb);
            padding: 10px 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          /* Navbar Brand */
          .navbar-title {
            font-size: 2rem;
            text-decoration: none;
            font-weight: bold;
            color: #fff;
            transition: color 0.3s ease-in-out;
          }

          .navbar-title:hover {
            color: #22d3ee;
          }

          /* Menu Items */
          .navbar-menu {
            display: flex;
            font-weight: bold;
            gap: 0px;
          }

          .navbar-menu .nav-link {
            font-size: 1.1rem;
            color: #f8f9fa;
            text-decoration: none;
            padding: 8px 15px;
            border-radius: 20px;
            transition: all 0.3s ease-in-out;
          }

          .navbar-menu .nav-link:hover {
            background-color: #3b82f6;
            color: #fff;
            transform: scale(1.05);
          }

          /* Active Tab Styling */
          .navbar-menu .nav-link.active {
            background-color:rgb(30, 13, 105);
            color: #fff;
            font-weight: bold;
          }

          /* Mobile Menu Toggle */
          .menu-toggle {
            display: none;
            cursor: pointer;
            color: #fff;
            font-size: 1.5rem;
          }

          .menu-toggle.active {
            transform: rotate(90deg);
          }

          /* Responsive Styles */
          @media (max-width: 768px) {
            .menu-toggle {
              display: block;
            }

            .navbar-menu {
              flex-direction: column;
              position: absolute;
              top: 60px;
              left: 0;
              right: 0;
              background-color: #1e3a8a;
              padding: 20px;
              border-radius: 0 0 10px 10px;
              display: ${isMenuOpen ? "flex" : "none"};
            }

            .navbar-menu .nav-link {
              text-align: center;
              padding: 10px;
              margin: 5px 0;
              font-size: 1.2rem;
            }
          }
        `}
      </style>

      <nav className="navbar">
        <a className="navbar-title" href="/">
          Image Resizer Online
        </a>

        <div className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          ☰
        </div>

        <div className="navbar-menu">
          <Link
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/image-resizer" ? "active" : ""
            }`}
            to="/image-resizer"
            onClick={closeMenu}
          >
            Image Resizer
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/crop-image" ? "active" : ""
            }`}
            to="/crop-image"
            onClick={closeMenu}
          >
            Crop Image
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/image-converter" ? "active" : ""
            }`}
            to="/image-converter"
            onClick={closeMenu}
          >
            Image Converter
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/image-compressor" ? "active" : ""
            }`}
            to="/image-compressor"
            onClick={closeMenu}
          >
            Image Compressor
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/image-to-pdf" ? "active" : ""
            }`}
            to="/image-to-pdf"
            onClick={closeMenu}
          >
            Image to PDF
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/pdf-to-image" ? "active" : ""
            }`}
            to="/pdf-to-image"
            onClick={closeMenu}
          >
            PDF to Image
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/pdf-merger" ? "active" : ""
            }`}
            to="/pdf-merger"
            onClick={closeMenu}
          >
            PDF Merge
          </Link>
          <Link
            className={`nav-link ${
              location.pathname === "/pdf-split" ? "active" : ""
            }`}
            to="/pdf-split"
            onClick={closeMenu}
          >
            PDF Split
          </Link>
        </div>
      </nav>
    </>
  );
}
