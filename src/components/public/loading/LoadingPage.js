import React, { useState, useEffect } from "react";
import "css/loader.css"

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1500); // Ubah angka ini sesuai dengan jumlah detik yang Anda inginkan

    return () => clearTimeout(timer);
  }, []);

  return showLoader ? (
    <div className="loader-container">
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    </div>
  ) : null;
};

export default Loader;

