import React from "react";
import "../sass/header.scss";
import githublogo from "../assets/github.png";

export const Header = () => {
  return (
    <div className="header-container">
      <div className="img-container">
        <img src={githublogo} alt="githublogo" />
      </div>
      <div className="title-container">
        <h1>GitHub Searcher</h1>
      </div>
    </div>
  );
};
