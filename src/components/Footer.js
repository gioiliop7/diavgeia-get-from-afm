import React from "react";
import { Container, Row } from "react-bootstrap";

function Footer() {
    const d = new Date();
    const year = d.getFullYear();
    return (
      <>
        <footer>
          <Container className="align-items-center justify-content-center">
            <Row>
              <h5 className="pt-3 pb-3 text-center">Development by Giorgos Iliopoulos © {year}</h5>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
  
  export default Footer;