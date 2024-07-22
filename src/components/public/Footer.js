import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} Universitas Klabat</p>
    </div>
  );
};

export default Footer;
