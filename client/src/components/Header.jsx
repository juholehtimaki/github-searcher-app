import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import "../sass/header.scss";

export const Header = () => {
  return (
    <Jumbo fluid className="jumbo">
      <Container>
        <div className="overlay">
          <h1>GitHub Searcher</h1>
        </div>
      </Container>
    </Jumbo>
  );
};
