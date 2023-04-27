import React, {useContext, useState} from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"



const Login = ({ setLoginUser ,handlelogin}) => {


    const [isLogedIn, setIsLogedIn] = useState(false);

    const history = useHistory()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://192.168.43.46:9002/login", user)
        .then(res => {
            setIsLogedIn(true);
            alert(res.data.message)
            console.log(setIsLogedIn)
            setLoginUser(res.data.user)
            history.push("/")
        })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}

export default Login