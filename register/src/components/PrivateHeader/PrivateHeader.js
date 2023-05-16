import React, { useContext, useState, useEffect } from "react";
import $ from 'jquery'
import "./header.css"
import { Link } from "react-router-dom"
// import { UserContext } from "../Context";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import userAvatar from '../../../src/resources/avatar.png';

const PrivateHeader = ({ handleLogout }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [user, setLoginUser] = useState({})
    // const { isLogedIn } = useContext(UserContext);
    // console.log(user._id)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">LOGO</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/gamesnear" className="nav-link">Games Nearby</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/help" className="nav-link">Help?</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/newgame" className="nav-link">Request</Link>
                        </li>
                    </ul>

                    <div className="ml-auto">
                        <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                            <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                id="profileDropdown"
                                onClick={toggleDropdown}
                            >
                                <img
                                    src={userAvatar}
                                    alt="User Avatar"
                                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                />
                                Profile
                            </button>
                            {isDropdownOpen && (
                                <div
                                    className="dropdown-menu show"
                                    aria-labelledby="profileDropdown"
                                >
                                    <a className="dropdown-item" href="/profile">
                                        Profile
                                    </a>
                                    <a className="dropdown-item" href="">
                                        Settings
                                    </a>
                                    <a className="dropdown-item" href="/logout">
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}
export default PrivateHeader 