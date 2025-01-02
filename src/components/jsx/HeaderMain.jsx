import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaUserCircle, FaBars } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import "../css/HeaderMain.css";

function HeaderMain({ active }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Navbar bg="light" data-bs-theme="light" className="header">
      <Container>
        <Navbar.Brand as={Link} to="/">
          LanguageFever
        </Navbar.Brand>

        {/* Profilna ikona za prijavljenog korisnika */}
        {active ? (
          <div className="profile-container">
            <button id="profile-pic">
              <FaUserCircle size={30} />
            </button>
            <div className="dropdown-menu">
              <ul>
                <li className="d-grid">
                  <Link to="/editUser" className="link-underline-opacity-0">
                    <button className="btn btn-primary" id="logout">
                      Uredi profil
                    </button>
                  </Link>
                </li>
                <li className="d-grid">
                  <Link to="/calendar">
                    <button className="btn btn-primary" id="logout">
                      Kalendar
                    </button>
                  </Link>
                </li>
                <li className="d-grid">
                  <Link to="/logout">
                    <button className="btn btn-primary" id="logout">
                      Log Out
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {/* Hamburger ikona za navigaciju */}
        <div className="hamburger-container">
          <div className="hamburger-icon" onClick={() => setShowMenu(!showMenu)}>
            <FaBars size={24} />
          </div>

          {showMenu && (
          <div className="hamburger-menu">
            <ul>
              {!active && ( // Log In gumb samo ako korisnik nije prijavljen
                <li className="d-grid">
                  <Link to="/login" className="link-underline-opacity-0">
                    <button className="btn btn-primary" id="logout">
                      Log In
                    </button>
                  </Link>
                </li>
              )}
              <li className="d-grid">
                <Link to="/teachers">
                  <button className="btn btn-primary" id="logout">
                    Predavači
                  </button>
                </Link>
              </li>
              <li className="d-grid">
                <Link to="/lessons">
                  <button className="btn btn-primary" id="logout">
                    Lekcije
                  </button>
                </Link>
              </li>
              <li className="d-grid">
                <Link to="/faqs">
                  <button className="btn btn-primary" id="logout">
                    FAQs
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        )}
        </div>
      </Container>
    </Navbar>
  );
}

export default HeaderMain;
