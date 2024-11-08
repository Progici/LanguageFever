import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./Header.css";

function Header() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className="header">
        <Container>
          <Navbar.Brand>LanguageFever</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link href="#link">FAQs</Nav.Link>
          </Nav>

          <div className="d-flex">
            <Link to="/login">
              <Button className="btn-login" href="#login">
                Log In
              </Button>
            </Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
