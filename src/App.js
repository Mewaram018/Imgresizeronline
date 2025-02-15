import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import ImageResizer from './pages/ImageResizer';
import CropImage from './pages/CropImage';
import ImageCompressor from './pages/ImageCompressor';
import ImageConverter from './pages/ImageConverter';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import PDFMerger from './pages/PDFMerger';
import PDFSplit from './pages/PDFSplit';
import Imagetopdf from './pages/Imagetopdf';
import PDFtoimage from './pages/PDFtoimage';
import AboutUs from './pages/AboutUs';
import NotFound from './components/NotFound';
import { Helmet } from "react-helmet";
import './App.css';
import InstallPrompt from './components/InstallPrompt'; // Import the component
import AdComponent from './components/AdComponents';

import ReactGA from "react-ga4";

ReactGA.initialize("G-Y3V2CYPRP4"); // Replace with your Measurement ID
ReactGA.send("pageview");

// Page transition variants
const pageVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

// ScrollToTop Component
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on route change
  }, [location]);

  return null;
};

// Animated Routes Component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {[
          { path: '/', element: <Home />, animated: false }, // No animation for Home
          { path: '/image-resizer', element: <ImageResizer />, animated: true },
          { path: '/crop-image', element: <CropImage />, animated: true },
          { path: '/image-compressor', element: <ImageCompressor />, animated: true },
          { path: '/pdf-merger', element: <PDFMerger />, animated: true },
          { path: '/image-converter', element: <ImageConverter />, animated: true },
          { path: '/pdf-split', element: <PDFSplit />, animated: true },
          { path: '/image-to-pdf', element: <Imagetopdf />, animated: true },
          { path: '/pdf-to-image', element: <PDFtoimage />, animated: true },
          { path: '/privacy-policy', element: <PrivacyPolicy />, animated: true },
          { path: '/disclaimer', element: <Disclaimer />, animated: true },
          { path: '/about-us', element: <AboutUs />, animated: true },
          { path: '*', element: <NotFound />, animated: true },
        ].map(({ path, element, animated }) => (
          <Route
            key={path}
            path={path}
            element={
              animated ? (
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  {element}
                </motion.div>
              ) : (
                element // No animation for Home page
              )
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <Helmet>
        <title>Image Tools - Resize, Crop, Compress, Convert Images Online</title>
        <meta
          name="description"
          content="Free online image tools to resize, crop, compress, convert images online."
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="image tools, image resizer, image compressor, image converter, crop image" />
      </Helmet>
      <CustomNavbar />
      <div className="main-layout">
        <div className="content">
        <AdComponent />  {/* Google Ad will appear here */}

          <ScrollToTop /> {/* Scroll to top when route changes */}
          <AnimatedRoutes />
        </div>
      </div>
      <Footer />
      <InstallPrompt /> {/* Add the Install Prompt Component */}

    </Router>
  );
}

export default App;
