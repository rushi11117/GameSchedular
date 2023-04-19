import React from "react";
import "./header.css"
import { useHistory } from "react-router-dom"

const Header = () => {
    const history = useHistory()

    let redirectLogin = () => history.push("/login")
    let redirectRegister = () => history.push("/components/register")

    return (

        <div className="nav">
            <div className="sub-nav2">
                <div className="logo">
                    <img src={require("./logo.png")} width={"80px"} height={"80px"} alt="" />
                </div>
                <a href="/" className="bn3637 bn38"> Games Nearby</a>
                <a href="/" className="bn3637 bn38"> Help?</a>
                <a href="/" className="bn3637 bn38"> About us</a>
            </div>
            <div className="sub-nav">
                <div className="button" onClick={redirectLogin}>
                    Login
                </div>
                <div className="button" onClick={redirectRegister}>
                    Signup
                </div>
            </div>
        </div>
    )
}
export default Header;