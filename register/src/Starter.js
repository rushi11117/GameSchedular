import React from 'react';
import "./starter.css";
import { Route, Switch, useHistory } from 'react-router-dom';
import {Login} from "./components/content/login/Login";
import {Register} from "./components/content/register/Register";

export function Starter () {
    let history = useHistory()
    // const changeUrl = () => {
    //     history.push('/login')
    // }

    return (
        <>
            <Switch>
                <div className='App'>
                    <div className='Header'>
                        <Route exact path='/login' component={Login} >
                            <div className='btn' onClick={() => history.push("/login")}>Login</div>
                        </Route>
                        <Route exact path='/register' component={Register} >
                            <div className='btn' onClick={() => history.push("/register")}>SignUp</div>
                        </Route>
                    </div>
                </div>
            </Switch>
        </>
    );
}


