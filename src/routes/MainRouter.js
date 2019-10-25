import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../page/dashboard/Dashboard";
import Login from "../page/form/Login";
import Register from "../page/form/Register";

const MainRouter = () => (
  <div>
    <Route exact path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} />
  </div>
);

export default MainRouter;
