import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chart from "./pages/Chart";
import Devices from "./pages/Devices";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Admin from "./pages/Admin/Admin";
import AdminMac from "./pages/Admin/AdminMac";

function App() {

  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <div className="web">
      <Router>
        {isLogin && <Navbar />}
        <Switch>

          <Route path="/login" exact component={() => <Login setIsLogin={setIsLogin} />} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={() => <Home setIsLogin={setIsLogin} />} />
          <Route path="/home" exact component={() => <Home setIsLogin={setIsLogin} />} />
          <Route path="/chart" exact component={() => <Chart setIsLogin={setIsLogin} />} />
          <Route path="/Devices" exact component={() => <Devices setIsLogin={setIsLogin} />} />
          <Route path="/logout" exact component={() => <Logout setIsLogin={setIsLogin} />} />
          <Route path="/Admin" exact component={() => <Admin setIsLogin={setIsLogin} />} />
          <Route path="/AdminMac" exact component={() => <AdminMac setIsLogin={setIsLogin} />} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
