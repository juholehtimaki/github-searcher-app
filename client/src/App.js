import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./sass/main.scss";

import { Home } from "./components/Home.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { RepositoryInfo } from "./components/RepositoryInfo.jsx";
import { QueryContext } from "./components/QueryContext";

export const App = () => {
  const [query, setQuery] = useState(""); //Store query for easier navigation

  return (
    <Fragment>
      <Header />
      <Router>
        <Switch>
          <QueryContext.Provider value={{ query, setQuery }}>
            <Route path="/" exact component={Home} />
            <Route
              path="/repository/:owner/:repositoryname"
              component={RepositoryInfo}
            />
          </QueryContext.Provider>
        </Switch>
      </Router>
      <Footer />
    </Fragment>
  );
};
