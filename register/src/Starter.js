import React from "react";
import { NavLink } from "react-router-dom";
import "./Starter.css"
// import { Route } from "react-router-dom"

const Header = () => {
    const testLogin = () => {
    }
    return (

        <div className="nav">
            <div className="sub-nav2">
                <div className="logo">
                    LOGO
                </div>
                <a href="/" className="bn3637 bn38"> Games Nearby</a>
                <a href="/" className="bn3637 bn38"> Help?</a>
                <a href="/" className="bn3637 bn38"> About us</a>
            </div>
            <nav>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/login">
                            <div className="button">Login</div>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Header