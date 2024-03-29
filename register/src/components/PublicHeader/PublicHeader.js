import React, { useContext, useState } from "react";
import "./header.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
// import { UserContext } from "../Context";
import 'bootstrap/dist/css/bootstrap.min.css';

const PublicHeader = ({ handleLogout }) => {
    const [user, setLoginUser] = useState({})
    // const { isLogedIn } = useContext(UserContext);
    // console.log(user._id)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">लोगो</Link>
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
                    </ul>
                    {/* <div className="d-flex">
                        <Link to="/login" className="" icon={}>
                            Login
                        </Link>
                    </div> */}

                    <Button variant="" style={{ margin: '0.05px' }}>
                        <Link to="/login" className="secondary" >
                            <FontAwesomeIcon icon={faSignInAlt} />
                            Login
                        </Link>
                    </Button>

                    <Button variant="" style={{ margin: '0.05px' }}>
                        <Link to="/register" className="secondary" >
                            <FontAwesomeIcon icon={faUserPlus} />
                            SignUp
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>

    )
}
export default PublicHeader