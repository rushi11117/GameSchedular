import './content.css'
import Homepage from './homepage/homepage'
import Login from "./login/Login"
import Register from "./register/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';

function Content() {

  const [user, setLoginUser] = useState({})
  return (
    <div className="content">
      <div>
        <Router>
          <Switch>
            <Route exact path="/homepage">
              {
                user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />
              }
            </Route>
            <Route path="/login">
              <Login setLoginUser={setLoginUser} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}


export default Content;
