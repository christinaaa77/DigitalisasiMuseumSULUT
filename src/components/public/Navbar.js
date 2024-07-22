import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Link } from "react-router-dom";
import { Logo, contoh, rightButton } from "assets";
import "./Navbar.css";

const PublicNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar expand="lg" expanded={expanded}>
      <Container className="navbar-position">
        <Navbar.Brand>
          <img
            src={Logo}
            alt="logo"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          Museum Sulawesi Utara
        </Navbar.Brand>
        <NavbarToggle onClick={() => setExpanded(!expanded)}>
          <img src={contoh} alt="Menu" className="menu-toggler" />
        </NavbarToggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/home" className="nav-link" onClick={closeNavbar}>
              <img
                src={rightButton}
                alt="Home"
                width="24"
                height="24"
                className="mr-2"
              />
              Beranda
            </Link>
            <Link to="/about" className="nav-link" onClick={closeNavbar}>
              <img
                src={rightButton}
                alt="About"
                width="24"
                height="24"
                className="mr-2"
              />
              Profil Museum
            </Link>
            <Link to="/koleksi" className="nav-link" onClick={closeNavbar}>
              <img
                src={rightButton}
                alt="Koleksi Museum"
                width="24"
                height="24"
                className="mr-2"
              />
              Koleksi Museum
            </Link>
            <Link to="/koleksi-3d" className="nav-link" onClick={closeNavbar}>
              <img
                src={rightButton}
                alt="Koleksi 3D"
                width="24"
                height="24"
                className="mr-2"
              />
              Koleksi 3D
            </Link>
            <Link to="/peta" className="nav-link" onClick={closeNavbar}>
              <img
                src={rightButton}
                alt="PetaWaruga"
                width="24"
                height="24"
                className="mr-2"
              />
              Peta Waruga
            </Link>
            <Link to="/wbtb" className="nav-link" onClick={closeNavbar}>
              <img
                src={rightButton}
                alt="wbtb"
                width="24"
                height="24"
                className="mr-2"
              />
              Warisan Budaya Tak Benda
            </Link>
            <Link to="/ulasan" className="nav-link" onClick={closeNavbar}>
              <img
                src={rightButton}
                alt="ulasan"
                width="24"
                height="24"
                className="mr-2"
              />
              Ulasan
            </Link>
            <div className="nav-link">
              <a
                className="download"
                href="https://drive.google.com/drive/folders/1UWAgEF9OWRpFZMjuQ-NlNhpZTr7qvW8Q"
                onClick={closeNavbar}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={rightButton}
                  alt="download"
                  width="24"
                  height="24"
                  className="mr-2"
                />
                Unduh
              </a>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;
