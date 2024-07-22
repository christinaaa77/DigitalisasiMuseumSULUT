import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Type from "./Type";
import {
  profilmuseum,
  suling,
  kolintang,
  musik,
  slaude,
  klksi3,
  klksi2,
} from "assets";
import "./Home.css";
import Loader from "../loading/LoadingPage";

function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    });

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Ganti dengan kecepatan yang Anda inginkan
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container2">
      <Loader />
      <div className="header-home animate-on-scroll">
        <h1 className="main-title">
          Selamat Datang
          <br />
          <span className="second-line">
            Di
            <br />
            Museum Sulawesi Utara
          </span>
        </h1>
        <div className="type">
          <Type />
        </div>
      </div>

      <div className="section3 animate-on-scroll">
        <h2 className="klksi">
          <Link to="/Koleksi">Koleksi Museum</Link>
        </h2>
        <Slider className="section-slider" {...settings}>
          <div>
            <img src={kolintang} alt="Kolintang" />
          </div>
          <div>
            <img src={musik} alt="Musik" />
          </div>
          <div>
            <img src={slaude} alt="Slaude" />
          </div>
          <div>
            <img src={suling} alt="suling" />
          </div>
          <div>
            <img src={klksi2} alt="" />
          </div>
          <div>
            <img src={klksi3} alt="" />
          </div>
        </Slider>
      </div>

      <div className="section4 animate-on-scroll">
        <h2 className="prfl">
          <Link to="/about">Profil Museum</Link>
        </h2>
        <p className="description-prfl">
          <b> Museum Negeri Sulawesi Utara</b> adalah yang terletak di sulawesi
          utara tepatnya di kota manado. museum ini menyimpan berbagai warisan
          budaya leluhur dan budaya kearifan lokal leluhur dari pra sejarah
          hingga zaman modern hingga saat ini.
        </p>
        <img
          src={profilmuseum}
          alt="Museum Background"
          className="image-bckgrnd"
        />
      </div>
      <div className="responsive-container animate-on-scroll">
        <div className="section5">
          <h2 className="jdwal">Jadwal Kunjungan</h2>
          <table className="schedule">
            <thead>
              <tr>
                <th>Hari</th>
                <th>Jam Buka - Tutup</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Senin</td>
                <td>08:00 - 16:30</td>
                <td>Rp. 0</td>
              </tr>
              <tr>
                <td>Selasa</td>
                <td>08:00 - 16:30</td>
                <td>Rp. 0</td>
              </tr>
              <tr>
                <td>Rabu</td>
                <td>08:00 - 16:30</td>
                <td>Rp. 0</td>
              </tr>
              <tr>
                <td>Kamis</td>
                <td>08:00 - 16:30</td>
                <td>Rp. 0</td>
              </tr>
              <tr>
                <td>Jumat</td>
                <td>08:00 - 16:30</td>
                <td>Rp. 0</td>
              </tr>
              <tr>
                <td>Sabtu</td>
                <td>08:00 - 16:30</td>
                <td>Rp. 0</td>
              </tr>
              <tr>
                <td>Minggu</td>
                <td>08:00 - 16:30</td>
                <td>Rp. 0</td>
              </tr>
              <tr>
                <td>Tanggal Merah</td>
                <td>08:00 - 16:30</td>
                <td>Rp. 0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="section6 animate-on-scroll">
          <h2 className="lksi">Lokasi Museum</h2>
          <div className="map-container">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63815.558675421424!2d124.77871703125001!3d1.4882647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3287753f5d72d9e1%3A0xe39fdffb28a81e59!2sUPTD%20Museum%20Negeri%20Propinsi%20Sulawesi%20Utara!5e0!3m2!1sen!2sid!4v1698662939932!5m2!1sen!2sid"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
