import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function MyNavbar() {
  const [searchValue, setSearchValue] = useState();
  function handleChange(e) {
    setSearchValue(e.target.value);
  }
  const navigate = useNavigate();
  const onClick = useCallback(
    () =>
      navigate("/intelliq_api/to_be_implemented", {
        replace: true,
      }),
    [navigate]
  );

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>intelliq</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/intelliq_api">Home</Nav.Link>
            <NavDropdown title="Action" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/intelliq_api/FillingPage">
                Take Survey
              </NavDropdown.Item>
              <NavDropdown.Item href="/intelliq_api/AdminPage">
                See statistics
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/intelliq_api/to_be_implemented">
                get verified
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="search here"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button onClick={onClick} variant="outline-success">
              Go!
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
