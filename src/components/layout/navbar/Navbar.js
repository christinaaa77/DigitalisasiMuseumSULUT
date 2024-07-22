import { connect } from "react-redux";
import { signOut } from "actions/auth";
import { Logo, Menu } from "assets";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Link } from 'react-router-dom';

const NavbarAuth = ({
	signOut,
	auth
}) => {
	return (
		<Navbar expand="lg">
      <Container className="navbar-position">
        <Navbar.Brand>
          <img
            src={Logo}
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Museum Sulawesi Utara
        </Navbar.Brand>
        <NavbarToggle>
          <img src={Menu} alt="Menu" />
        </NavbarToggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
			<Link className="nav-link" to="#" onClick={signOut}><span className="muted">({auth.user.email})</span> Logout</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
	);
};

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

function mapDispatchToProps(dispatch) {
	return {
		signOut: () => dispatch(signOut())
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavbarAuth);