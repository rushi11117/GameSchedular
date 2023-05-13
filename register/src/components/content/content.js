import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://192.168.43.46:9002/register", user)
            .then( res => {
                alert(res.data.message)
                history.push("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">Register</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={user.name} placeholder="Enter your name" onChange={ handleChange } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input type="text" className="form-control" id="email" name="email" value={user.email} placeholder="Enter your email" onChange={ handleChange } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Your Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={user.password} placeholder="Enter your password" onChange={ handleChange } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reEnterPassword">Re-enter Password</label>
                                    <input type="password" className="form-control" id="reEnterPassword" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter your password" onChange={ handleChange } />
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mt-4" onClick={register}>Register</button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <p>or</p>
                                <button type="button" className="btn btn-link" onClick={() => history.push("/login")}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
