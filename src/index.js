import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Helmet } from "react-helmet";

import ReactGA from "react-ga4";

ReactGA.initialize("G-Y3V2CYPRP4"); // Replace with your Measurement ID
ReactGA.send("pageview");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <Helmet >
      <title>Image Tools - Resize, Crop, Compress, Convert Images Online</title>
      <meta
        name="description"
        content="Free online image tools to resize, crop, compress, convert images online. Image resizer, image compressor, image converter, crop image, resize image, compress image, convert image." />
      <meta name="robots" content="index, follow"></meta>
      <meta
        name="keywords"
        content="image tools, image resizer, image compressor, image converter, crop image, resize image, compress image, convert image" /> 
     </Helmet>
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <title>Image Tools</title>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
