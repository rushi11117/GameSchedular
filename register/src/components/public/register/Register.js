



import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Clear error message when user types in the input field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    const { name, email, password, reEnterPassword } = user;
    const updatedErrors = {
      name: "",
      email: "",
      password: "",
      reEnterPassword: "",
    };

    if (!name) {
      updatedErrors.name = "Please enter your name";
      valid = false;
    }
    if (!email) {
      updatedErrors.email = "Please enter your email";
      valid = false;
    }
    if (!password) {
      updatedErrors.password = "Please enter a password";
      valid = false;
    }
    if (!reEnterPassword) {
      updatedErrors.reEnterPassword = "Please re-enter your password";
      valid = false;
    }
    if (password !== reEnterPassword) {
      updatedErrors.reEnterPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(updatedErrors);
    return valid;
  };

  const register = () => {
    if (validateForm()) {
      axios
        .post("http://localhost:9002/register", user)
        .then((res) => {
          alert(res.data.message);
          history.push("/login");
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
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
            <h5 className="card-header">Register</h5>
            <div className="card-body">
              <Form>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user.name}
                    placeholder="Your Name"
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={user.email}
                    placeholder="Your Email"
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="Your Password"
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Re-enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="reEnterPassword"
                    value={user.reEnterPassword}
                    placeholder="Re-enter Password"
                    onChange={handleChange}
                    isInvalid={!!errors.reEnterPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.reEnterPassword}</Form.Control.Feedback>
                </Form.Group>
                <div className="form-group">
                  <Button type="button" variant="secondary" onClick={register}>
                    Register
                  </Button>
                  <span className="mx-2">or</span>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => history.push("/login")}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
