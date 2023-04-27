import './App.css';
import Homepage from './components/content/homepage/homepage';
import Login from "./components/content/login/Login";
import Register from "./components/content/register/register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import GamesNear from './components/content/GamesNear/GamesNear'
import AboutUs from './components/content/AboutUs/AboutUs';
import Help from './components/content/help/Help';
import AddGame from './components/content/AddGame/AddGame'
// import { UserProvider } from './Context';
import Logout from './components/content/Logout/Logout';


function App() {

  const [user, setLoginUser] = useState({})
  return (
    <Router>
      {/* <UserProvider> */}
        <div className="App">
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




// function App() {
//   return (
//     <UserProvider>
//       <Main />
//     </UserProvider>
//   );
// }

export default App;
