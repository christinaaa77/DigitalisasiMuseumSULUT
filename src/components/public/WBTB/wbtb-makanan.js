/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database";
import { searchh, cameraa, videoo } from "assets";
import DescriptionWithToggle from "./desc";
import { Photo, YouTubeVideo } from "./selected-media";

import Loader from "../loading/LoadingPage";

function WarisanBudayaMakanan() {
  const [makananWbtbs, setMakananWbtbs] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebase.database().ref("wbtbs").once("value");
      const data = snapshot.val();
      if (data) {
        const wbtbArray = Object.values(data);
        const makananWbtbArray = wbtbArray.filter(
          (wbtb) => wbtb.category === "Makanan"
        );
        setMakananWbtbs(makananWbtbArray);
      }
    };

    fetchData();
  }, []);

  const handlePhotoClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setSelectedVideoUrl(null); // Clear selected video URL
    photoRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to photo section
  };

  const handleVideoClick = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setSelectedImageUrl(null); // Clear selected image URL
    videoRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to video section
  };

  return (
    <>
      <Loader />
      <div className="header-container">
        <marquee behavior="scroll" direction="left">
          <h1>Warisan Budaya Tak Benda</h1>
        </marquee>
      </div>
      <div className="menu-container">
        <Link className="btn btn-secondary1" to="#" onClick={handleGoBack}>
          Back
        </Link>
        <Link to="/makanan" className="menu-item">
          <span>Makanan</span>
        </Link>
      </div>
      <div className="photo-container">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-interval="false"
        >
          <div className="carousel-indicators">
            <buttonslider
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <buttonslider
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <buttonslider
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            {makananWbtbs.map((wbtb, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={wbtb.id}
              >
                <img src={wbtb.photo} className="image-slider" alt="..." />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap-flexbox">
        {makananWbtbs.map((wbtb) => (
          <div className="container-render" key={wbtb.id}>
            <h1 className="image-title">{wbtb.name}</h1>
            <div className="container-render-wbtb">
              <div className="image-container">
                <img src={wbtb.photo} alt="Gambar" />
              </div>
              <div className="group-text-logo">
                <DescriptionWithToggle text={wbtb.desc} />
                <div className="logo-container">
                  <div className="logo-left">
                    <a href={wbtb.sourceLink}>
                      <img src={searchh} alt="Search" />
                    </a>
                  </div>
                  <div className="logo-right">
                    <button
                      onClick={() => handleVideoClick(wbtb.video)}
                      className="link-button"
                    >
                      <img src={videoo} alt="Video" />
                    </button>
                    <button
                      onClick={() => handlePhotoClick(wbtb.photo)}
                      className="link-button"
                    >
                      <img src={cameraa} alt="Camera" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div ref={videoRef}>
        {/* Ref for video section */}
        {selectedVideoUrl && <YouTubeVideo videoId={selectedVideoUrl} />}
      </div>
      <div ref={photoRef}>
        {/* Ref for photo section */}
        {selectedImageUrl && <Photo imageUrl={selectedImageUrl} />}
      </div>
    </>
  );
}

export default WarisanBudayaMakanan;
