import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="mt-5">
      <Container fluid={true}>
        <Row className="border-top justify-content-between p-3">
          <Col className="p-0" md={3} sm={12}>
            Vincit GitHub App
          </Col>
          <Col className="p-0 d-flex justify-content-end" md={3}>
            Juho Lehtimäki
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
