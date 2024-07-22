/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./product.css";
import TextToSpeech from "components/tts/TextToSpeech";

const ProductShow = ({ product, history }) => {
  const [isPhotoView, setIsPhotoView] = useState(true);
  

  useEffect(() => {
    // Additional cleanup when component unmounts
  }, []);

  if (!product) {
    return <div className="item-not-found">Item not found</div>;
  }

  const handleGoBack = () => {
    history.goBack();
  };

  const toggleView = () => {
    setIsPhotoView(!isPhotoView);
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
          <h4>{product.name}</h4>
          {product.photo && <img src={product.photo} alt={product.name} />}
          {!product.photo && <p>No photo available for this collections.</p>}
        </div>
      );
    }

    return (
      <div className="product-info">
        <h4>{product.name}</h4>
        {isPhotoView && product.photo && <img src={product.photo} alt={product.name} />}
        {!isPhotoView && (
          <iframe
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
    <div className="collections-details">
      <Link className="btn btn-secondary back-button" to="#" onClick={handleGoBack}>
        Back
      </Link>
      <div className="media-display">
        {renderMedia()}
      </div>
      <button className="toggle-button" onClick={toggleView}>
        Switch to {isPhotoView ? "Video" : "Photo"}
      </button>
      <div className="additional-details">
        <h3> Details</h3>
        <div className="detail">
          <p>
            <strong>Category:</strong> <span className="product-category">{product.category}</span>
          </p>
          <p>
            <strong>3D Object:</strong> <span className="product-3d">{product.arLink}</span>
          </p>
          <p>
            <strong>Description:</strong> <span className="product-description">{product.desc}</span>{" "}
            <TextToSpeech value={product.desc} />
          </p>
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

export default connect(mapStateToProps)(ProductShow);
