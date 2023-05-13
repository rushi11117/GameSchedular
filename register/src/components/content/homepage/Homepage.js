import React from "react";
import "./homepage.css";
import { Routing } from "../../../App";
import Button from "react-bootstrap/Button";

const Homepage = ({ setLoginUser }) => {
  return (
    <div className="homepage">
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <div className="m-3">
          <Button variant="primary">Hello Homepage</Button>
        </div>
        <div className="m-3">
          <Button variant="primary">Hello Homepage</Button>
        </div>
        <div className="m-3">
          <Button variant="primary">Hello Homepage</Button>
        </div>
        <div className="m-3">
          <Button variant="primary">Hello Homepage</Button>
        </div>
      </div>
      <div className="button" onClick={() => setLoginUser({})}>
        Logout
      </div>
    </div>
  );
};

export default Homepage;
