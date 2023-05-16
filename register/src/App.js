import './App.css';
import Homepage from './components/private/homepage/Homepage';
import Login from "./components/public/login/Login";
import Register from "./components/public/register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import PublicHeader from './components/PublicHeader/PublicHeader';
import PrivateHeader from './components/PrivateHeader/PrivateHeader'
import Footer from './components/footer/footer';
import GamesNear from './components/public/GamesNear/GamesNear'
import AboutUs from './components/public/AboutUs/AboutUs';
import Help from './components/public/help/Help';
import AddGame from './components/private/AddGame/AddGame'
import Logout from './components/private/Logout/Logout';
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [user, setLoginUser] = useState({})
  return (
    <Router>
      <div className="container-fluid"> {/* add Bootstrap container class */}
      <div>
      {isLoggedIn ? (
        <PrivateHeader />
      ) : (
        <PublicHeader />
      )}
      {/* Rest of your application */}
    </div>
        <div>
          <Switch>
            <Route exact path="/">
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
