import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import "./app.css";
import PrivateRoute from "./components/PrivateRoute";
import EditScreen from "./screens/EditScreen";
import Loading from "./components/Loading";

const App = () => {
  return (
    <Router>
      <PrivateRoute path="/" component={MainScreen} exact></PrivateRoute>
      <PrivateRoute path="/edit/:id" component={EditScreen}></PrivateRoute>
      <Route path="/login" component={LoginScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/loading" component={Loading}></Route>
    </Router>
  );
};

export default App;
