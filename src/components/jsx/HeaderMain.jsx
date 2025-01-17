import { useState, useEffect, useRef, useContext } from "react"; // Added useContext
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Hamburger from "hamburger-react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "../css/HeaderMain.css";
import Avatar from "@mui/material/Avatar";
import { AppContext } from "../../AppContext";
import { ApiConfig } from "../../config/api.config";
import Badge from "@mui/material/Badge";
import teacherdefault from "../../assets/images/teacherdefault.png";

function HeaderMain() {
  const { active, selected, currentUser, setCurrentUser, change } =
    useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [newRequests, setNewRequests] = useState(0);

  //potrebno za isActive funkciju
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

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
          console.log("CurrentUser:", data);
        } catch (error) {
          setCurrentUser(null);
          console.error("Error fetching status:", error);
        }
      };
      fetchActivityStatus();
    }
  }, [active, setCurrentUser]);

  useEffect(() => {
    if (active) {
      const fetchRequests = async () => {
        let endpoint = null;
        if (selected === 1) {
          endpoint = "/mojelekcije/ucenik/prihvacenizahtjevi"; // Endpoint for students
          console.warn("HM Selected value is Student");
        } else if (selected === 2) {
          console.warn("HM Selected value is Teacher");
          endpoint = "/mojelekcije/ucitelj/novizahtjevi"; // Endpoint for teachers
        } else {
          console.warn("Selected value is not valid. Skipping fetch.");
          return;
        }
        try {
          const response = await fetch(ApiConfig.API_URL + endpoint, {
            method: "GET",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch requests");
          }

          const data = await response.json();
          setNewRequests(data.length);
          console.log("NewRequests:", data.length);
        } catch (error) {
          console.error("Error fetching lessons:", error);
        }
      };

      fetchRequests();
    }
  }, [selected, change]);

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
          <Nav.Link
            as={Link}
            to="/teachers"
            className={isActive("/teachers") ? "active-link" : "nav-link"}
          >
            Učitelji
          </Nav.Link>

          {/* Prikazujemo samo ako je korisnik ulogiran */}
          {active && currentUser && (
            <>
              <Nav.Link
                as={Link}
                to="/archived-lessons"
                className={
                  isActive("/archived-lessons") ? "active-link" : "nav-link"
                }
              >
                Arhiva
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/new-requests"
                className={isActive("/new-requests") ? "active-link" : "nav-link"}
              >
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Badge
                    badgeContent={newRequests}
                    color="primary"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 1.55,
                      transform: "translate(-50%, 50%)",
                    }}
                  />
                  <span>Zahtjevi</span>
                </div>
              </Nav.Link>
            </>
          )}

          <Nav.Link
            as={Link}
            to="/faqs"
            className={isActive("/faqs") ? "active-link" : "nav-link"}
          >
            FAQs
          </Nav.Link>

          {currentUser?.role === "ROLE_ADMIN" ? (
            <Nav.Link
              as={Link}
              to="/admin-options"
              className={
                isActive("/admin-options") ? "active-link" : "nav-link"
              }
            >
              Admin
            </Nav.Link>
          ) : null}
        </Nav>


        {/* Profile icon for logged-in user */}
        {active && currentUser ? (
          <div className="profile-container1">
            <button id="profile-pic">
              <Avatar src={currentUser.picture || teacherdefault} />{" "}
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
                      Učitelji
                    </button>
                  </Link>
                </li>
                {active && (
                  <li className="d-grid">
                    <Link to="/archived-lessons">
                      <button className="btn btn-primary" id="logout2">
                        Arhiva
                      </button>
                    </Link>
                  </li>
                )}
                {active && (
                <li className="d-grid">
                  <Link to="/new-requests">
                    <button className="btn btn-primary" id="logout2">
                      <Badge badgeContent={newRequests} color="primary">
                        Zahtjevi
                      </Badge>
                    </button>
                  </Link>
                </li>
                )}
                <li className="d-grid">
                  <Link to="/faqs">
                    <button className="btn btn-primary" id="logout2">
                      FAQs
                    </button>
                  </Link>
                </li>

                <li className="d-grid">
                  {currentUser?.role === "ROLE_ADMIN" ? (
                    <Link to="/admin-options">
                      <button className="btn btn-primary" id="logout2">
                        Admin
                      </button>
                    </Link>
                  ) : null}
                </li>

                {!active && (
                  <>
                    <li className="d-grid">
                      <Link to="/login" className="link-underline-opacity-0">
                        <button className="btn btn-primary" id="logout2">
                          Log In
                        </button>
                      </Link>
                    </li>
                  </>
                )}

                {active && currentUser && (
                  <>
                    <li className="d-grid">
                      <button
                        id="profile-pic"
                        style={{ display: "flex", justifyContent: "center", margin:"0px" }}
                      >
                        <Avatar
                          src={currentUser.picture || teacherdefault}
                        ></Avatar>
                      </button>
                      <div className = "burger-profile" >
                        {selected === 1 && "Učenik"}
                        {selected === 2 && "Učitelj"}
                        {selected === 0 && "Odaberi"}
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
