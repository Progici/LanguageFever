import { useState, useEffect, useRef, useContext } from "react"; // Added useContext
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Hamburger from "hamburger-react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "../css/HeaderMain.css";
import Avatar from "@mui/material/Avatar";
import { AppContext } from "../../AppContext";
import { ApiConfig } from "../../config/api.config";

function HeaderMain() {
  const { active, selected, currentUser, setCurrentUser } =
    useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (active) {
      const fetchActivityStatus = async () => {
        try {
          const response = await fetch(
            ApiConfig.API_URL + "/trenutnikorisnik",
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!response.ok) {
            setCurrentUser("");
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCurrentUser(data);
        } catch (error) {
          setCurrentUser("");
          console.error("Error fetching status:", error);
        }
      };
      fetchActivityStatus();
    }
  }, [active, setCurrentUser]);

  // Effect for closing hamburger menu
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
          <Nav.Link as={Link} to="/new-requests">
            Zahtjevi
          </Nav.Link>
          <Nav.Link as={Link} to="/faqs">
            FAQs
          </Nav.Link>
        </Nav>

        {/* Profile icon for logged-in user */}
        {active && currentUser ? (
          <div className="profile-container1">
            <button id="profile-pic">
              <Avatar alt="K" src={currentUser.picture || ""} />{" "}
              {/* Check if data.picture exists */}
            </button>
            <div>
              {selected === 1 && "Učenik"}
              {selected === 2 && "Učitelj"}
              {selected === 0 && "Odaberi"}
            </div>
            <div className="dropdown-menu">
              <ul>
                <li className="d-grid">
                  <Link to="/edit-user" className="link-underline-opacity-0">
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
            <Link to="/login">
              <Button className="btn-login">Log In</Button>
            </Link>
          </div>
        )}

        {/* Hamburger icon for navigation */}
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
                  <Link to="/new-requests">
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

                {!active && (
                  <li className="d-grid">
                    <Link to="/login" className="link-underline-opacity-0">
                      <button className="btn btn-primary" id="logout2">
                        Log In
                      </button>
                    </Link>
                  </li>
                )}

                {active && currentUser && (
                  <>
                    <li className="d-grid">
                      <button
                        id="profile-pic"
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Avatar
                          alt="K"
                          src={currentUser.picture || ""}
                        ></Avatar>
                      </button>
                      <div style={{ marginLeft: "20px" }}>
                        {selected === 1 && "Učenik"}
                        {selected === 2 && "Učitelj"}
                        {selected === 0 && ""}
                      </div>
                    </li>
                    <li className="d-grid">
                      <Link
                        to="/edit-user"
                        className="link-underline-opacity-0"
                      >
                        <button className="btn btn-primary" id="logout2">
                          Uredi profil
                        </button>
                      </Link>
                    </li>
                    <li className="d-grid">
                      <Link to="/calendar">
                        <button className="btn btn-primary" id="logout2">
                          Kalendar
                        </button>
                      </Link>
                    </li>
                    <li className="d-grid">
                      <Link to="/logout">
                        <button className="btn btn-primary" id="logout2">
                          Log Out
                        </button>
                      </Link>
                    </li>
                  </>
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
