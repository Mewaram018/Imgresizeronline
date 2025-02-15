import React from 'react';
import { Helmet } from "react-helmet";

const AboutUs = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Helmet>
  <title>About Us - Learn More About Image Tools</title>
  <meta
    name="description"
    content="Learn more about Image Tools, our mission, and how we provide free online tools to resize, crop, compress, and convert images easily."
  />
  <meta
    name="keywords"
    content="about us, image tools, online image tools, resize images, crop images, compress images, convert images, image resizer, image compressor, image converter"
  />
</Helmet>

            <h1>About Us</h1>
            <p>
                Welcome to imagetool.com, your trusted platform for fast, secure, and reliable image processing tools. Based in Jaipur, Rajasthan, India, we are committed to providing free services that prioritize speed and privacy.
            </p>
            <h2>Our Mission</h2>
            <p>
                Our mission is to empower users with tools that make image editing simple and accessible. Whether you need to resize, crop, compress, or convert images, our platform is designed to meet your needs efficiently and without cost.
            </p>
            <h2>Why Choose Us?</h2>
            <p>
                At imagetool.com, we understand the importance of privacy and security. Unlike many online tools, we do not store or share your images or personal data. All processing is conducted securely, ensuring that your files remain private and protected.
            </p>
            <h2>Our Story</h2>
            <p>
                Founded by <strong>M.R. Chaudhary</strong>, imagetool.com was born out of a desire to provide high-quality image tools to users around the world. With a background in technology and a passion for innovation, our founder has built a platform that combines speed, reliability, and user-centric design.
            </p>
            <h2>Our Commitment</h2>
            <p>
                We are committed to transparency and user satisfaction. By offering free tools and refraining from data collection, we aim to set a standard for ethical and user-friendly web services. Your trust is our greatest asset, and we work tirelessly to maintain it.
            </p>
            <h2>Contact Us</h2>
            <p>
                We would love to hear from you! For feedback, questions, or support, please reach out to us at mewaram018@gmail.com. Your input helps us improve and serve you better.
            </p>
        </div>
    );
};

export default AboutUs;