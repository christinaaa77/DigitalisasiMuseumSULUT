import React from "react";
import { Card, Col, Container,Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./landing.css";

const Landing = () => {
  return (
      <Container>
        <Row>
          <Col className="col-md-12 text-center">
            <Card className="content-auth">
              <h3>Selamat datang di Museum Sulawesi Utara</h3>
              <h5>
                Kami mengundang Anda untuk menjelajahi koleksi kami dan
                mengeksplorasi sejarah dan budaya Sulawesi Utara.
              </h5>
              <p>
                Kami memiliki berbagai artefak bersejarah, lukisan seni lokal,
                dan benda-benda berharga lainnya yang menceritakan kisah
                beragamnya warisan budaya kami.
              </p>
              <p>
                Untuk melihat semua koleksi kami, silakan klik tombol di bawah:
              </p>
              <p>
                <Link className="btn btn-primary btn-lg" to="/products">
                  Lihat Koleksi
                </Link>
                <Link className="btn btn-primary btn-lg" to="/wbtbs">
                  Lihat Wbtb
                </Link>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export default Landing;
