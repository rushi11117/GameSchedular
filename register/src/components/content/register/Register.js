import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios
        .post("http://192.168.43.46:9002/register", user)
        .then((res) => {
          alert(res.data.message);
          history.push("/login");
        });
    } else {
      alert("Invalid input");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h5 className="card-header">Register</h5>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    className="form-control"
                    placeholder="Your Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    className="form-control"
                    placeholder="Your Email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    className="form-control"
                    placeholder="Your Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reEnterPassword">Re-enter Password</label>
                  <input
                    type="password"
                    name="reEnterPassword"
                    value={user.reEnterPassword}
                    className="form-control"
                    placeholder="Re-enter Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={register}
                  >
                    Register
                  </button>
                  <span className="mx-2">or</span>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => history.push("/login")}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
