import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import "./sass/main.scss";

import { Home } from "./components/Home.jsx";
import { RepositoryInfo } from "./components/RepositoryInfo.jsx";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/repository/:owner/:repositoryname"
          component={RepositoryInfo}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
