import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import "./HeaderMain.css";

function HeaderMain({ active }) {
  return (
    <Navbar bg="light" data-bs-theme="light" className="header">
      <Container>
        <Navbar.Brand as={Link} to="/">LanguageFever</Navbar.Brand>

        <Nav className="me-auto" id="navigation">
          <Nav.Link as={Link} to="/teachers">Predavači</Nav.Link>
          <Nav.Link as={Link} to="/lessons">Lekcije</Nav.Link>
          <Nav.Link as={Link} to="/faqs">FAQs</Nav.Link>
        </Nav>

        <div className="d-flex align-items-center">
          <div className="search-container">
            <button className="icon-button">
              <FaSearch />
            </button>
            <input
              type="search"
              placeholder="Pretraži"
              className="search-input"
            />
          </div>

          {active ? (
            <div className="profile-container">
              <button id="profile-pic">
                <FaUserCircle size={30} />
              </button>
              <div className="dropdown-menu">
                <ul>
                  <li id="option">
                    <Link to="/editUser" className="link-underline-opacity-0">
                      Uredi profil
                    </Link>
                  </li>
                  <li id="option">
                    <Link to="/calendar">Kalendar</Link>
                  </li>
                  <li className="d-grid">
                    <Link to="/">
                      <button className="btn btn-primary" id="logout">
                        Log Out
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="d-flex">
              <Link to="/login">
                <Button className="btn-login" href="#login">
                  Log In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default HeaderMain;
