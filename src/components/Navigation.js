import React from "react";
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";

const Navigation = () => (
  <Navbar color="light" light expand="md" className="mb-5">
    <NavbarBrand tag={Link} to="/">
      Drop App
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink tag={Link} to="/">
          Home
        </NavLink>
      </NavItem>
    </Nav>
  </Navbar>
);

export default Navigation;
