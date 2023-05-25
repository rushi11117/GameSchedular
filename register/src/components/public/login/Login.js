import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert, Row, Col, Form, Button } from "react-bootstrap";

const Login = ({ setIsLoggedIn }) => {
  const history = useHistory();


  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const login = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    sessionStorage.setItem('email',user.email);
    if (!user.email || !user.password) {
      alert("Email and password are required.");
      return;
    }

    axios
      .post("http://localhost:9002/login", user)
      .then((res) => {
        const loginState = sessionStorage.getItem("isLoggedIn");
        sessionStorage.setItem("userName",res.data.user.name);
        if (loginState === "true") {
          alert("User already logged in");
        } else {
          sessionStorage.setItem("isLoggedIn", true);
          setIsLoggedIn(true);
          
          // console.log(user)
          // sessionStorage.setItem('PlayerName',user.name);
          window.location.reload();
        }        
      })
      .catch((error) => {
        if (
          window.location.reload() && 
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert(error.response.data.message);
        } else {
          console.log("An unknown error occurred.");
        }
      });
    history.push("/landerpage")
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

                <Button
                  variant="secondary"
                  type="submit"
                  style={{ margin: "2px" }}
                  onClick={login}
                >
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