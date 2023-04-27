import React, { useContext, useState } from "react";
import "./header.css"
import { Link } from "react-router-dom"
import { UserContext } from "../Context";

const Header = ({handleLogout}) => {
    const [user, setLoginUser] = useState({})
    // const { isLogedIn } = useContext(UserContext);
    console.log(user._id)

    return (
        <div className="Header">
            <div className="nav">
                <div className="sub-nav2">
                    <div className="logo">
                        LOGO
                    </div>
                    <Link to="/gamesnear" className="bn3637 bn38"> Games Nearby</Link>
                    <Link to="/help" className="bn3637 bn38"> Help?</Link>
                    <Link to="/about" className="bn3637 bn38"> About us</Link>
                    <Link to="/newgame" className="bn3637 bn38"> Request</Link>
                </div>
                <div className="sub-nav">

                    {
                        user && user._id ?
                            <Link to="/logout" onClick={alert("FuckOff")} className="button">
                                Logout
                            </Link>
                            :
                            <>
                                <Link to="/login" className="button">
                                    Login
                                </Link>
                                <Link to="/register" className="button">
                                    Signup
                                </Link>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}
export default Header
