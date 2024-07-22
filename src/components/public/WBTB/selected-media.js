/* eslint-disable no-useless-escape */

import React from "react";

// Fungsi untuk mengekstrak ID video YouTube dari URL
const extractVideoId = (video) => {
  // Ekstrak ID video dari tautan YouTube atau gunakan ID video yang disediakan
  const match = video.match(
    /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : video;
};

// Komponen untuk menampilkan video YouTube
const YouTubeVideo = ({ videoId }) => {
  return (
    <div className="media-container">
      <h1>Video</h1>

      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${extractVideoId(videoId)}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// Komponen untuk menampilkan foto
const Photo = ({ imageUrl, altText }) => {
  return (
    <div className="media-container">
      <h1>Foto</h1>
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

export { YouTubeVideo, Photo };
