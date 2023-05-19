import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicHeader from './components/PublicHeader/PublicHeader';
import PrivateHeader from './components/PrivateHeader/PrivateHeader';
import Footer from './components/footer/footer';
import GamesNear from './components/public/GamesNear/GamesNear';
import AboutUs from './components/public/AboutUs/AboutUs';
import Help from './components/public/help/Help';
import AddGame from './components/private/AddGame/AddGame';
import Logout from './components/private/Logout/Logout';
import ProfilePage from './components/private/Profile/ProfilePage';
import Homepage from './components/private/homepage/Homepage';
import Login from "./components/public/login/Login";
import Register from "./components/public/register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const loginState = sessionStorage.getItem('isLoggedIn');

  if (loginState === null) {
    sessionStorage.setItem('isLoggedIn', 'false');
  }

  return (
    <Router>
      <div className="container-fluid">
        {loginState === 'true' ? (
          <PrivateHeader />
        ) : (
          <PublicHeader />
        )}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/logout">
            <Logout />
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
          <Route exact path="/homepage">
            <Homepage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
