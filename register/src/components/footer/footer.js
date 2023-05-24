import React from "react";
import "./footer.css";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <Container className="py-3 bg-light text-center">
        <div>&copy; g18.org</div>
      </Container>
    </div>
  );
};

export default Footer;
