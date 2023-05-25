import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Col, Form, Button, Alert } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = ({ setIsLoggedIn }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let valid = true;
    const { email, password } = user;
    const updatedErrors = {
      email: "",
      password: "",
    };
    if (!email) {
      updatedErrors.email = "Please enter your email";
      valid = false;
    }
    if (!password) {
      updatedErrors.password = "Please enter a password";
      valid = false;
    }

    setErrors(updatedErrors);
    return valid;
  };

  const login = () => {
    if (validateForm()) {
      axios
        .post("http://localhost:9002/login", user)
        .then((res) => {
          const loginState = sessionStorage.getItem("isLoggedIn");
          if (loginState === "true") {
            alert("User already logged in");
          } else {
            sessionStorage.setItem("isLoggedIn", true);
            setIsLoggedIn(true);
            sessionStorage.setItem("userName", user.email);
            window.location.reload();
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            alert(error.response.data.message);
          } else {
            console.log("An unknown error occurred.");
          }
        });
    }
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
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Col>
                  <Form.Group controlId="formBasicPassword" className="row">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input-wrapper row">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        isInvalid={!!errors.password}
                        required
                      />
                      <div
                        className="password-toggle-icon"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </div>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

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
