import React from "react"
import "./homepage.css"
import { Routing } from "../../../App"

const Homepage = ({setLoginUser}) => {
    return (
        <div className="homepage">
            <div>Hello Homepage</div>
            <div>Hello Homepage</div>
            <div>Hello Homepage</div>
            <div>Hello Homepage</div>
            {/* <div className="butto" onClick={()=>handleLogout()}></div> */}
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </div>
    )
}

export default Homepage