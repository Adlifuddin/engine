import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container, NavDropdown, Collapse, Button } from 'react-bootstrap'
import { navBar, navBrand, navLink } from '../customStyle/NavColor'
import Logo from "../../assets/images/Nexent_200x30px.svg"
import { NavLink, Link, useLocation, Redirect } from "react-router-dom";
import {
  BackgroundColorContext,
  backgroundColors,
} from "../../contexts/BackgroundColorContext";
import { PropTypes } from "prop-types";
import {FiSettings} from 'react-icons/fi'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';

function NavigationBar(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  useEffect(() => {
    const dat = document.getElementsByClassName('dropdown-menu show')
    console.log(dat)
  }, [])



  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.clear()
    dispatch(logout());
    window.location.replace('/')
    
  }

  

  const { routes } = props;

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
    <Navbar variant="dark" style={navBar} data={color}>
      <Navbar.Brand style={navBrand} href="/home">
        <span>
          <img alt="logo" src={Logo}/>{' '}
        </span>
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
          </Nav>
          <Nav>
            <NavDropdown title={<FiSettings />} id="collasible-nav-dropdown">
              <NavDropdown.Item href="https://dashboard-demo.nexent.co/user/edit_current">Account Settings</NavDropdown.Item>
              <NavDropdown.Item href="https://dashboard-demo.nexent.co">Exit Admin</NavDropdown.Item>
              <NavDropdown.Item href="/integration">Activity</NavDropdown.Item>
              <NavDropdown.Item href="/help">Help</NavDropdown.Item>
              <NavDropdown.Item href="/home">About Nexent</NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={handleLogout}>Signed Out</NavDropdown.Item>
            </NavDropdown>
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