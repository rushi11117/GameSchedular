import React, { useState } from "react";
import { Link, Router, useHistory} from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Dropdown = styled.ul`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #333;
    padding: 0.5rem;
  }
`;

const Hamburger = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
`;

const NavItem = styled.li`
  display: inline-block;

  @media (max-width: 768px) {
    display: block;
  }
`;

function NavbarComponent() {
    const history = useHistory
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <Router>
            <Navbar>
                <Link to="/">Home</Link>
                <ul>
                    <NavItem><Link to="/login">Login</Link></NavItem>
                    <NavItem><Link to="/signup">Signup</Link></NavItem>
                    <NavItem><Link to="/about">About Us</Link></NavItem>
                    <NavItem>
                        <Hamburger onClick={() => setShowDropdown(!showDropdown)}>
                            <i className="fa fa-bars"></i>
                        </Hamburger>
                    </NavItem>
                </ul>
                {showDropdown && (
                    <Dropdown>
                        <NavItem><Link to="/login">Login</Link></NavItem>
                        <NavItem><Link to="/signup">Signup</Link></NavItem>
                        <NavItem><Link to="/about">About Us</Link></NavItem>
                    </Dropdown>
                )}
            </Navbar>
        </Router>
    );
}

export default NavbarComponent;