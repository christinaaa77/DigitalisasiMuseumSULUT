/* eslint-disable jsx-a11y/no-distracting-elements */
import React from "react";
import { Link } from "react-router-dom";
import {
  Indonesia,
  abstrak,
  gunung,
} from "assets"; // Pastikan Anda memiliki MuseumBackground dari asset
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./wbtb.css";
import Loader from "../loading/LoadingPage";

function PhotoGallery({ image, name, desc }) {
  return (
    <div className="photo-item">
      <div className="photo-container">
        <img src={image} alt="Warisan Budaya" className="photo-frame" />
      </div>
      <div className="responsive-detail">
        <h1 className="photo-name">{name}</h1>
        <p className="limit-p">{desc}</p>
      </div>
    </div>
  );
}

function WbtbPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000, // Interval waktu antara perpindahan slide (dalam milidetik)
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className="custom-dots">
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <>
      <Loader />
      <div className="wbtb-page" style={{ backgroundColor: "#ff0000" }}>
        <div className="header-container">
          
          <marquee behavior="scroll" direction="left">
            <h1>Warisan Budaya Tak Benda</h1>
          </marquee>
        </div>

        <div className="menu-container">
          <Link to="/musik" className="menu-item">
            <span>Musik</span>
          </Link>
          <Link to="/makanan" className="menu-item">
            <span>Makanan</span>
          </Link>
          <Link to="/tarian" className="menu-item">
            <span>Tarian</span>
          </Link>
        </div>

        {/* Foto dengan stroke putih dan shadow */}
        <div className="photo-container">
          <Slider {...settings}>
            <div className="image-control">
              <img src={Indonesia} alt="Warisan Budaya" className="photo" />
            </div>
            <div className="image-control">
              <img src={abstrak} alt="Warisan Budaya" className="photo" />
            </div>
            <div className="image-control">
              <img src={gunung} alt="Warisan Budaya" className="photo" />
            </div>
          </Slider>
        </div>

        {/* Bagian pertama */}
        <div className="section-container">
          <div className="section-title">
            <h2 className="section-heading">Musik Tradisional</h2>
          </div>
          <PhotoGallery
            image="https://firebasestorage.googleapis.com/v0/b/skripsi-museum-sulut.appspot.com/o/product_images%2FWhatsApp%20Image%202023-11-16%20at%2023.37.35_e559d852.jpg?alt=media&token=059215cf-d0f7-4e1c-b9f0-ef9a2d2037c2"
            name="Kolintang"
            desc="Kolintang adalah sebuah alat musik tradisional yang berasal dari Indonesia, khususnya dari wilayah Minahasa di Sulawesi Utara. Alat musik ini terdiri dari sejumlah kecil gong yang disusun secara berderet atau berbaris di atas rak atau pemegang kayu. Setiap gong memiliki ukuran yang berbeda-beda, dan mereka dipukul dengan pemukul yang terbuat dari kayu atau bambu. "
          />
        </div>

        {/* Bagian kedua */}
        <div className="section-container">
          <div className="section-title">
            <h2 className="section-heading">Tarian Tradisional</h2>
          </div>
          <PhotoGallery
            image="https://firebasestorage.googleapis.com/v0/b/skripsi-museum-sulut.appspot.com/o/wbtb_images%2Ftarian-kabasaran-foto-by-etnis.id_.jpg?alt=media&token=4b05c32c-366a-4315-b2ef-c1af0f41182f"
            name="Kabasaran"
            desc="Kabasaran adalah salah satu dari banyak suku atau kelompok etnis di Indonesia, tepatnya berasal dari daerah Minahasa, Sulawesi Utara. Kabasaran adalah bagian dari masyarakat Minahasa yang memiliki budaya, bahasa, dan tradisi mereka sendiri. Masyarakat Kabasaran dikenal dengan keberanian dan semangat juangnya, serta memiliki warisan budaya yang kaya, termasuk dalam bidang seni, musik, tarian, dan upacara adat."
          />
        </div>

        {/* Bagian ketiga */}
        <div className="section-container">
          <div className="section-title">
            <h2 className="section-heading">Makanan Khas Daerah</h2>
          </div>
          <PhotoGallery
            image="https://firebasestorage.googleapis.com/v0/b/skripsi-museum-sulut.appspot.com/o/wbtb_images%2Ftinutuan.jpg?alt=media&token=665843e1-1329-4845-8bbd-531b09ad6f25"
            name="Tinutuan"
            desc="Tinutuan adalah makanan khas dari Manado, ibu kota Provinsi Sulawesi Utara, Indonesia. Tinutuan sering disebut sebagai 'bubur Manado' atau 'bubur berkat' dalam bahasa setempat. Makanan ini merupakan semacam bubur nasi yang terbuat dari campuran beras, jagung, kacang hijau, labu kuning, daun singkong, daun kemangi, dan sayuran lainnya yang diolah bersamaan. Biasanya, tinutuan disajikan dengan tambahan ikan bakar atau sayuran seperti kangkung."
          />
        </div>
      </div>
    </>
  );
}

export default WbtbPage;
