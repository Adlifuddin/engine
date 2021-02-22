import React, { useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { navBar, navBrand, navLink } from '../customStyle/NavColor'
import Logo from "../../assets/images/Nexent_200x30px.svg"
import './Navbar.css'
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  BackgroundColorContext,
  backgroundColors,
} from "../../contexts/BackgroundColorContext";
import { PropTypes } from "prop-types";

function NavigationBar(props) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const { routes } = props;

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
    <Navbar variant="dark" style={navBar} data={color}>
      <Navbar.Brand style={navBrand} href="#">
        <img alt="logo" src={Logo}/>{' '}
      </Navbar.Brand>
        <Nav className="mr-auto">
        {routes.map((prop, key) => {
              if (prop.redirect) {
                return null
              } else if (prop.invisible) {
                return null
              };
              return (
                  <li
                    className={
                      activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                    }
                    id={prop.path}
                    key={key}
                  >
                    <Nav.Link as={Link} style={navLink} key={key} to={prop.layout + prop.path} className="nav-link" activeclassname="active">{prop.name}</Nav.Link>
                  </li>
              );
        })}
        {/* <Nav.Link as={Link} style={navLink} key='database' to="/database" className="nav-link" activeclassname="active">Database</Nav.Link> */}
      </Nav>
        </Navbar>
        )}
    </BackgroundColorContext.Consumer>
  );
}

NavigationBar.defaultProps = {
  routes: [{}],
};

NavigationBar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
  }),
};

export default NavigationBar;