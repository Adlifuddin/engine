import React, { useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { navBar, navBrand, navLink } from '../customStyle/NavColor'
import Logo from "../../assets/images/Nexent_200x30px.svg"
import './Navbar.css'
import NavRoutes from '../../navroutes'
import { Link } from 'react-router-dom';

function NavigationBar(props) {

  const Route = NavRoutes.filter(x => x.isVisible !== true)

  return (
    <Navbar variant="dark" style={navBar}>
      <Navbar.Brand style={navBrand} href="#">
        <img alt="logo" src={Logo}/>{' '}
      </Navbar.Brand>
      <Nav className="mr-auto">
        {Route.map(results => (
          <Nav.Link as={Link} style={navLink} key={results.name} to={results.pathname}>{results.name}</Nav.Link>
        ))}
      </Nav>
  </Navbar>
  );
}

export default NavigationBar;