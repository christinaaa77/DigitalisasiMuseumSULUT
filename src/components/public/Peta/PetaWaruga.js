import React, { useEffect, useRef, useState } from 'react';
import { Container, Card, Button } from "react-bootstrap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Marker, waruga2, waruga3, waruga4, waruga5, waruga6, warugaa1, warugaa2, warugaa3 } from "assets";
import "./peta.css";
import Loader from '../loading/LoadingPage';

const MapComponent = () => {
  const mapRef = useRef(null);
  const [showInfo, setShowInfo] = useState(false);
  const [infoContent, setInfoContent] = useState({});

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([1.3482, 124.9707], 9);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      const customIcon = L.icon({
        iconUrl: Marker,
        iconSize: [32, 32],
      });

      const cities = [
        {
          name: "Waruga - Sarcophagus - Airmadidi , Minahasan Bovengrondse Tombe",
          lat: 1.420463683506124,
          photo: waruga2,
          lon: 124.97630962350044,
          googleMapsLink:
            "https://www.google.com/maps/place/Waruga+-+Sarcophagus+-+Airmadidi+,+Minahasan+Bovengrondse+Tombe/@1.4198041,124.9733914,17z/data=!3m1!4b1!4m6!3m5!1s0x32870eea5086cb29:0xc5729eac39d0e34d!8m2!3d1.4197987!4d124.9759663!16s%2Fg%2F11cpkxhcp4?entry=ttu",
        },
        {
          name: "Waruga - Minahasan Sarcophagus - Sawangan",
          lat: 1.3928387798545305,
          photo: waruga3,
          lon: 124.96536056994022,
          googleMapsLink:
            "https://www.google.com/maps/place/Archaeological+Park+Waruga+-+Minahasan+Sarcophagus/@1.3919011,124.9651017,12z/data=!4m10!1m2!2m1!1sWaruga+-+Minahasan+Sarcophagus+-+Sawangan!3m6!1s0x32870e6c50a3ad4d:0x28c56e5abaa48d75!8m2!3d1.3919011!4d124.9651017!15sCilXYXJ1Z2EgLSBNaW5haGFzYW4gU2FyY29waGFndXMgLSBTYXdhbmdhblonIiV3YXJ1Z2EgbWluYWhhc2FuIHNhcmNvcGhhZ3VzIHNhd2FuZ2FukgEPb3Blbl9haXJfbXVzZXVtmgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5IYldSaVZsQlJFQUXgAQA!16s%2Fg%2F11gbk4_t_3?entry=ttu",
        },
        {
          name: "Kompleks Waruga Sukur - Sarcophagus - Minahasan Bovengrondse Tombe",
          lat: 1.4334353,
          photo: waruga4,
          lon: 124.8781933,
          googleMapsLink:
            "https://www.google.com/maps/place/Kompleks+Waruga+Sukur+-+Sarcophagus+-+Minahasan+Bovengrondse+Tombe/@1.4334353,124.8781933,12z/data=!4m10!1m2!2m1!1sWaruga+-+Minahasan+Sarcophagus+-+Sawangan!3m6!1s0x32870eae0a33fd71:0x9340658e5d47b5e6!8m2!3d1.4334353!4d124.9605908!15sCilXYXJ1Z2EgLSBNaW5haGFzYW4gU2FyY29waGFndXMgLSBTYXdhbmdhbpIBBm11c2V1beABAA!16s%2Fg%2F11gb40qx2z?entry=ttu",
        },
        {
          name: "Waruga - Sarcophagus - Maumbi , Minahasan Bovengrondse Tombe",
          lat: 1.4813193,
          photo: waruga5,
          lon: 124.903474,
          googleMapsLink:
            "https://www.google.com/maps/place/Waruga+-+Sarcophagus+-+Maumbi+,+Minahasan+Bovengrondse+Tombe/@1.4813941,124.8211217,12z/data=!4m10!1m2!2m1!1sWaruga+-+Minahasan+Sarcophagus+-+Sawangan!3m6!1s0x32870bf7fc59b419:0x837e568341ede7b8!8m2!3d1.4813941!4d124.9035192!15sCilXYXJ1Z2EgLSBNaW5haGFzYW4gU2FyY29waGFndXMgLSBTYXdhbmdhbpIBFWhlcml0YWdlX3ByZXNlcnZhdGlvbuABAA!16s%2Fg%2F11g0hzv45_?entry=ttu",
        },
        {
          name: "Waruga - Sarcophagus - Rap Rap , Minahasan Bovengrondse Tombe",
          lat: 1.422567,
          photo: waruga6,
          lon: 124.8914641,
          googleMapsLink:
            "https://www.google.com/maps/place/Waruga+-+Sarcophagus+-+Rap+Rap+,+Minahasan+Bovengrondse+Tombe/@1.422567,124.8914641,12z/data=!4m10!1m2!2m1!1sWaruga+-+Minahasan+Sarcophagus+-+Sawangan!3m6!1s0x32870f6d048ff7cf:0xe2f2488fd7407e0b!8m2!3d1.422567!4d124.9738616!15sCilXYXJ1Z2EgLSBNaW5haGFzYW4gU2FyY29waGFndXMgLSBTYXdhbmdhbpIBE2hpc3RvcmljYWxfbGFuZG1hcmvgAQA!16s%2Fg%2F11p4n719yp?entry=ttu",
        },
        {
          name: "Archaeological Park Waruga - Minahasan Sarcophagus",
          lat: 1.3999765543690488,
          photo: warugaa1,
          lon: 124.96365509285032,
          googleMapsLink:
            "https://www.google.com/maps/place/Archaeological+Park+Waruga+-+Minahasan+Sarcophagus/@1.4031015,124.8833203,12z/data=!4m21!1m14!4m13!1m5!1m1!1s0x32870e6c50a3ad4d:0x28c56e5abaa48d75!2m2!1d124.9635806!2d1.3925883!1m6!1m2!1s0x32870e6c50a3ad4d:0x28c56e5abaa48d75!2sSawangan,+Airmadidi,+North+Minahasa+Regency,+North+Sulawesi!2m2!1d124.9635806!2d1.3925883!3m5!1s0x32870e6c50a3ad4d:0x28c56e5abaa48d75!8m2!3d1.3925883!4d124.9635806!16s%2Fg%2F11gbk4_t_3?entry=ttu",
        },
        {
          name: "Waruga - Sarcophagus - Minahasan Bovengrondse Tombe , Woloan",
          lat: 1.3265918894793165,
          photo: warugaa2,
          lon: 124.81142987434191,
          googleMapsLink:
            "https://www.google.com/maps/place/Waruga+-+Sarcophagus+-+Minahasan+Bovengrondse+Tombe+,+Woloan/@1.3880294,124.7454374,12z/data=!4m20!1m13!4m12!1m4!2m2!1d124.8438953!2d1.4563551!4e1!1m6!1m2!1s0x32876c64ce4209ad:0xd795f7751e012e09!2s8RC6%2B78R,+North+Woloan+Satu,+Tomohon+Barat,+Tomohon+City,+North+Sulawesi!2m2!1d124.8107788!2d1.3207399!3m5!1s0x32876c64ce4209ad:0xd795f7751e012e09!8m2!3d1.3207399!4d124.8107788!16s%2Fg%2F11fxxvdpfn?entry=ttu",
        },
        {
          name: "Waruga Ancestral Plane of Minahasa",
          lat: 1.448008653466521,
          photo: warugaa3,
          lon: 124.93141235015165,
          googleMapsLink:
            "https://www.google.com/maps/place/Waruga+Ancestral+Plane+of+Minahasa/@1.4647385,124.8484332,13z/data=!4m20!1m13!4m12!1m4!2m2!1d124.8438953!2d1.4563551!4e1!1m6!1m2!1s0x32870b533743d317:0xf526860e32d67649!2sCWVJ%2BRFJ,+Kawangkoan,+Kalawat,+North+Minahasa+Regency,+North+Sulawesi!2m2!1d124.9311495!2d1.4445803!3m5!1s0x32870b533743d317:0xf526860e32d67649!8m2!3d1.4445803!4d124.9311495!16s%2Fg%2F11sqff30cw?entry=ttu",
        },

        // Tambahkan data kota lainnya di sini
      ];

      cities.forEach((city) => {
        const marker = L.marker([city.lat, city.lon], { icon: customIcon }).addTo(mapRef.current);

        marker.bindPopup(`
        <div class="popup-content">
          <img src="${city.photo}" alt="${city.name}" class="popup-image" />
          <div class="popup-text">
            <h4>${city.name}</h4>
            <p>Deskripsi singkat tentang Waruga ini.</p>
            <a href="${city.googleMapsLink}" target="_blank" rel="noopener noreferrer">Lihat di Google Maps</a>
          </div>
        </div>
      `);

        marker.on('mouseover', function (e) {
          setInfoContent(city);
          setShowInfo(true);
        });

        marker.on('mouseout', function (e) {
          setShowInfo(false);
        });
      });
    }
  }, []);

  return (
    <div>
      <Loader/>
      <h1 className="page-title">Peta Waruga</h1>
      <Card className="container-peta">
        <div className="foto-waruga">
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <Button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={0}
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              />
              <Button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={1}
                aria-label="Slide 2"
              />
              <Button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={2}
                aria-label="Slide 3"
              />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval={10000}>
                <img src={waruga2} className="waruga-slider" alt="..." />
              </div>
              <div className="carousel-item" data-bs-interval={2000}>
                <img src={waruga3} className="waruga-slider" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={waruga4} className="waruga-slider" alt="..." />
              </div>
            </div>
          </div>
        </div>
        <h1 className="waruga-name">
          <strong className="waruganame">Waruga</strong>
        </h1>
        <h2 className="isi-waruga">
          Waruga atau kuburan tua, adalah peti kubur peninggalan zaman
          megalithic orang Minahasa - Daerah Sulawesi Utara (Sulut) yang
          berkembang pada awal abad ke-13 SM. Tetapi kemunculannya di tafsir
          pada sekitar abad ke-16 pertengahan.Waruga pertama muncul di daerah
          bukit Kelewer, Treman dan Tumaluntung Kabupaten Minahasa Utara (Minut)
          dan terus berkembang diberbagai daerah di Sulawesi Utara sampai pada
          awal abad 20 Masehi.
          <a href="https://samratulangi-airport.com/id/panduan-wisata/index/waruga-1">
            {" "}
            Baca selengkapnya..
          </a>
        </h2>
        <h3 className="heading-name">
          <strong className="purple">Peta Waruga</strong>
        </h3>
        <div id="map" style={{ height: "500px", cursor: "grab" }}></div>
        {showInfo && (
          <div className="info-container">
            <div className="info-content">
              <h4>{infoContent.name}</h4>
              <img src={infoContent.photo} alt={infoContent.name} className="popup-image" />
              <a href={infoContent.googleMapsLink} target="_blank" rel="noopener noreferrer">Lihat di Google Maps</a>
            </div>
          </div>
        )}
        <Container fluid className="resume-section">
          {/* Hapus <Row></Row> jika tidak digunakan */}
        </Container>
      </Card>
    </div>
  );
};

export default MapComponent;