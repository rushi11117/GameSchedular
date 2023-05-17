import Homepage from './components/private/homepage/Homepage';
import Login from "./components/public/login/Login";
import Register from "./components/public/register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import PublicHeader from './components/PublicHeader/PublicHeader';
import PrivateHeader from './components/PrivateHeader/PrivateHeader'
import Footer from './components/footer/footer';
import GamesNear from './components/public/GamesNear/GamesNear'
import AboutUs from './components/public/AboutUs/AboutUs';
import Help from './components/public/help/Help';
import AddGame from './components/private/AddGame/AddGame'
import Logout from './components/private/Logout/Logout';
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS
// import UserProvider  from './Context';

import { Provider } from 'react-redux';
import store from './redux/store';
import { connect } from 'react-redux'
import ProfilePage from './components/private/Profile/ProfilePage';


function App() {


  // sessionStorage.getItem('isLoggedIn') === null ?
  //   sessionStorage.setItem('isLoggedIn',false)
  // :
  //   sessionStorage.setItem('isLoggedIn',true)

  console.log(sessionStorage.getItem('isLoggedIn'));

  return (
    <Router>
      <div className="container-fluid"> {/* add Bootstrap container class */}
        <div>
          {/* {sessionStorage.getItem('isLoggedIn') ? ( */}
            <PrivateHeader />
          {/* ) : ( */}
            {/* <PublicHeader /> */}
          {/* )} */}
          {/* Rest of your application */}
        </div>
        <div>
          <Switch>
            <Route exact path="/">
              {
                // user && user._id ? <Homepage setLoginUser={setLoggedIn} /> : <Login setLoginUser={setLoggedIn} />
              }
            </Route>
            <Route path="/login">
              <Login  />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/logout" >
              <Logout  />
            </Route>
            <Route path="/gamesnear">
              <GamesNear />
            </Route>
            <Route path="/help">
              <Help />
            </Route>
            <Route path="/about">
              <AboutUs />
            </Route>
            <Route path="/newgame">
              <AddGame />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
