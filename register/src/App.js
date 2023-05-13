import './App.css';
import Homepage from './components/content/homepage/Homepage';
import Login from "./components/content/login/Login";
import Register from "./components/content/register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import GamesNear from './components/content/GamesNear/GamesNear'
import AboutUs from './components/content/AboutUs/AboutUs';
import Help from './components/content/help/Help';
import AddGame from './components/content/AddGame/AddGame'
// import { UserProvider } from './Context';
import Logout from './components/content/Logout/Logout';
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS

function App() {

  const [user, setLoginUser] = useState({})
  return (
    <Router>
      {/* <UserProvider> */}
        <div className="container-fluid"> {/* add Bootstrap container class */}
          <Header />
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
          <Footer />
        </div>
      {/* </UserProvider> */}
    </Router>
  );
}

export default App;
