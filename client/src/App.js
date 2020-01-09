import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import "./sass/main.scss";

import { Home } from "./components/Home.jsx";
import { RepositoryInfo } from "./components/RepositoryInfo.jsx";
import { QueryContext } from "./components/QueryContext";

export const App = () => {
  const [query, setQuery] = useState("");

  return (
    <Router>
      <Switch>
        <QueryContext.Provider value={{ query, setQuery }}>
          <Route path="/" exact component={Home} />
          <Route
            path="/repository/:owner/:repositoryname"
            component={RepositoryInfo}
          />
        </QueryContext.Provider>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
