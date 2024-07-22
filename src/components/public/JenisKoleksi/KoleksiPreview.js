/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./ItemDetail.css";
import TextToSpeech from "components/tts/TextToSpeech";

const ItemDetail = ({ product, history }) => {
  const [isPhotoView, setIsPhotoView] = useState(true);

  useEffect(() => {
    // Additional cleanup when component unmounts

  }, []);

  if (!product) {
    return <div>Item not found</div>;
  }

  const handleGoBack = () => {
    history.goBack();
  };

  const toggleView = () => {
    setIsPhotoView(!isPhotoView);
    const toggleButton = document.querySelector('.toggle-button');
    toggleButton.classList.toggle('active'); // Tambahkan atau hilangkan kelas aktif
  };
  

  const extractVideoId = (video) => {
    // Extract the video ID from the YouTube link or use the provided video ID
    const match = video.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : video;
  };



  const renderMedia = () => {
    if (!product.video) {
      return (
        <div className="product-info">
          <h4 className="product-name">{product.name}</h4>
          {product.photo && <img src={product.photo} alt={product.name} />}
          {!product.photo && <p>Tidak ada foto yang tersedia untuk koleksi ini.</p>}
        </div>
      );
    }

    return (
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        {isPhotoView && product.photo && <img src={product.photo} alt={product.name} />}
        {!isPhotoView && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${extractVideoId(product.video)}`}
            title={product.name}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>
    );
  };

  return (
    <div className="item-detail-container">
      <Link className="btn btn-secondary back-button" to="#" onClick={handleGoBack}>
        Back
      </Link>
      <div className="media-display">
        {renderMedia()}
      </div>
      <button className={`toggle-button ${isPhotoView ? 'photo-mode' : 'video-mode'}`} onClick={toggleView}>
        Switch to {isPhotoView ? "Video" : "Photo"}
      </button>
      <div className="additional-details">
        <h1><b>Detail</b></h1>
        <div className="detail">
          <div className="product-category">
            <strong>Kategori:</strong> <span>{product.category}</span>
          </div>
          <div className="product-desc">
            <strong>Objek 3D:</strong> <span>{product.arLink}</span>
          </div>
          <div className="product-desc">
            <strong>Deskripsi:</strong> <span>{product.desc}</span>{" "}
            <TextToSpeech value={product.desc} />
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.id;
  const product = state.product.products.find((item) => item.id === productId);
  return {
    product,
  };
}

export default connect(mapStateToProps)(ItemDetail);
