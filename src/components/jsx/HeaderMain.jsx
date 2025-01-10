import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Hamburger from "hamburger-react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FaUserCircle, FaBars } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import "../css/HeaderMain.css";
import Avatar from "@mui/material/Avatar";
import { ApiConfig } from "../../config/api.config";

function HeaderMain({ active }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  /*nadodani kod
  const [userType, setUserType] = useState(null); // 'ucitelj', 'ucenik' ili null

  useEffect(() => {
    //je li ucitelj
    fetch(ApiConfig.API_URL + "/trenutniucitelj", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Not a teacher");
        }
      })
      .then(() => {
        setUserType("ucitelj"); // Ako je uspješno, korisnik je učitelj
      })
      .catch(() => {
        // Ako nije učitelj, proveri da li je učenik
        fetch(ApiConfig.API_URL + "/trenutniucenik", {
          method: "GET",
          credentials: "include",
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Not a student");
            }
          })
          .then(() => {
            setUserType("ucenik"); // Ako je uspješno, korisnik je učenik
          })
          .catch(() => {
            setUserType("null"); // Ako nije ni učitelj ni učenik
          });
      });
  }, []);
  */
  // Efekt za zatvaranje hamburger izbornika
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar bg="light" data-bs-theme="light" className="header">
      <Container>
        <Navbar.Brand as={Link} to="/">
          LanguageFever
        </Navbar.Brand>

        <Nav className="navigation">
          <Nav.Link as={Link} to="/teachers">
            Predavači
          </Nav.Link>
          <Nav.Link as={Link} to="/lessons">
            Lekcije
          </Nav.Link>
          <Nav.Link as={Link} to="/newRequests">
            Zahtjevi
          </Nav.Link>
          {/* Link koji vodi do stranice s lekcijama */}
          <Nav.Link as={Link} to="/faqs">
            FAQs
          </Nav.Link>
        </Nav>

        {/* Profilna ikona za prijavljenog korisnika */}
        {active ? (
          <div className="profile-container1">
            <button id="profile-pic">
              <Avatar alt="K" src=""></Avatar>
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
          <div className="login-button">
            {/* Div za korisnike koji nisu prijavljeni */}
            <Link to="/login">
              {/* Link za prijavu */}
              <Button className="btn-login">Log In</Button>
              {/* Gumb za prijavu */}
            </Link>
          </div>
        )}

        {/* Hamburger ikona za navigaciju */}
        <div className="hamburger-container" ref={menuRef}>
          <div
            className="hamburger-icon"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <Hamburger
              size={24}
              direction="right"
              toggled={isOpen}
              toggle={setOpen}
            />
          </div>

          {showMenu && (
            <div className="hamburger-menu">
              <ul>
                <li className="d-grid">
                  <Link to="/teachers">
                    <button className="btn btn-primary" id="logout2">
                      Predavači
                    </button>
                  </Link>
                </li>
                <li className="d-grid">
                  <Link to="/lessons">
                    <button className="btn btn-primary" id="logout2">
                      Lekcije
                    </button>
                  </Link>
                </li>
                <li className="d-grid">
                  <Link to="/newRequests">
                    <button className="btn btn-primary" id="logout2">
                      Zahtjevi
                    </button>
                  </Link>
                </li>
                <li className="d-grid">
                  <Link to="/faqs">
                    <button className="btn btn-primary" id="logout2">
                      FAQs
                    </button>
                  </Link>
                </li>

                {!active && ( // Log In gumb samo ako korisnik nije prijavljen
                  <li className="d-grid">
                    <Link to="/login" className="link-underline-opacity-0">
                      <button className="btn btn-primary" id="logout2">
                        Log In
                      </button>
                    </Link>
                  </li>
                )}
                {active && ( // profil gumb samo ako korisnik je prijavljen
                  <li className="d-grid">
                    <button
                      id="profile-pic"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Avatar alt="K" src=""></Avatar>
                    </button>
                  </li>
                )}
                {active && (
                  <li className="d-grid">
                    <Link to="/editUser" className="link-underline-opacity-0">
                      <button className="btn btn-primary" id="logout2">
                        Uredi profil
                      </button>
                    </Link>
                  </li>
                )}
                {active && (
                  <li className="d-grid">
                    <Link to="/calendar">
                      <button className="btn btn-primary" id="logout2">
                        Kalendar
                      </button>
                    </Link>
                  </li>
                )}
                {active && (
                  <li className="d-grid">
                    <Link to="/logout">
                      <button className="btn btn-primary" id="logout2">
                        Log Out
                      </button>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default HeaderMain;
