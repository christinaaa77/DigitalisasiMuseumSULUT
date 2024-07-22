import React from "react";
import Typewriter from "typewriter-effect";
import "./type.css";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Beranda",
          "Profil Museum",
          "Koleksi Museum",
          "Koleksi 3D",
          "Peta Waruga",
          "Warisan Budaya Tak Benda",
          "Ulasan",
          "Unduh",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
      className="typewriter-text"
    />
  );
}

export default Type;
