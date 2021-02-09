import React, { useState } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Navbar = (props) => {

  return (
    <div>
      <Nav tabs>
        <NavItem>
            <NavLink id="a" href="/" activeclassname="active">Home</NavLink>
        </NavItem>
        <NavItem>
            <NavLink id="b" href="/google" activeclassname="active">Google Api</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default Navbar;