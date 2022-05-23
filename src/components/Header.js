import React from "react";
import { Container, Row } from "react-bootstrap";

function Header() {
  return (
    <>
      <header>
        <Container className="align-items-center justify-content-center">
          <Row>
            <h3 className="text-center pt-3 pb-3">Diavgeia Apofaseis</h3>
          </Row>
        </Container>
      </header>
    </>
  );
}

export default Header;