import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

const Login = ({ setIsLoggedIn }) => {
  // const [isLogedIn, setIsLogedIn] = useState(false);
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };


  const login = () => {
    axios
      .post("http://localhost:9002/login", user)
      .then((res) => {
        sessionStorage.setItem('isLoggedIn', true)
        alert(res.data.message);
        console.log(sessionStorage.getItem('isLoggedIn'));
        // setLoginUser(res.data.user);
        history.push("/");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("An unknown error occurred.");
        }
      });
  };


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </Form.Group>

                <Button variant="secondary" type="submit" onClick={login}>
                  Login
                </Button>
                <div>or</div>

                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => history.push("/register")}
                >
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
