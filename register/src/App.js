import './App.css';
import {Login} from "./components/content/login/Login";
// import Header from "./header/header";
// import Footer from "./footer/footer";
// import Content from "./components/content/content";
import {Starter} from "./Starter"
import {Register} from "./components/content/register/Register";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
const App = () => {
  return (
    <>
    <Login/>
    </>
    // <BrowserRouter>
    //   <div>
    //     <Switch>
    //       <Route exact path='/' component={Starter} />
    //       <Route exact path='/login' component={Login} />
    //       <Route exact path='/register' component={Register} />
    //     </Switch>
    //   </div>
    // </BrowserRouter>
    // <>
    //   <Switch>
    //     <Route exact path='/' component={Starter} />
    //     <Route exact path='/login' component={Login} />
    //     <Route exact path='/register' component={Register} />
    //   </Switch>
    // </>
  );
}

export default App