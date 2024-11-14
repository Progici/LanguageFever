import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import "./HeaderMain.css";

function HeaderMain({ active }) {
  // Stanje za kontrolu prikaza navigacije na manjim ekranima
  const [showMenu, setShowMenu] = useState(false);

  // prop 'active' koji određuje da li je korisnik prijavljen ili ne
  return (
    <Navbar bg="light" data-bs-theme="light" className="header">
      {/* Navigacijski bar */}
      <Container>
        <Navbar.Brand as={Link} to="/">LanguageFever</Navbar.Brand>

        {/* Hamburger ikona za manje ekrane */}
        <div className="hamburger-icon" onClick={() => setShowMenu(!showMenu)}>
          <FaBars size={24} />
        </div>

        {/* Navigacija - prikazuje se samo kad je showMenu true na manjim ekranima */}
        <Nav
          className={`me-auto navigation ${showMenu ? "show" : ""}`}
          id="navigation"
        >
          <Nav.Link as={Link} to="/teachers">Predavači</Nav.Link>
          {/* Link koji vodi do stranice s predavačima */}
          <Nav.Link as={Link} to="/lessons">Lekcije</Nav.Link>
          {/* Link koji vodi do stranice s lekcijama */}
          <Nav.Link as={Link} to="/faqs">FAQs</Nav.Link>
          {/* link koji vodi do stranice s čestim pitanjima */}
        </Nav>

        <div className="d-flex align-items-center">
          
          <div className="search-container">
            {/* Kontejner za ikonu pretrage i polje za pretragu */}
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
            // Ako je korisnik prijavljen (prop 'active' je true)
            <div className="profile-container">
              <button id="profile-pic">
                <FaUserCircle size={30} />
              </button>
              <div className="dropdown-menu">
                {/* Dropdown menu koji se prikazuje nakon klika na profilnu ikonu */}
                <ul>
                  <li id="option">
                    <Link to="/editUser" className="link-underline-opacity-0">
                      Uredi profil
                    </Link>
                    {/* Link za uređivanje korisničkog profila */}
                  </li>
                  <li id="option">
                    <Link to="/calendar">Kalendar</Link>
                    {/* Link za prikazivanje kalendara */}
                  </li>
                  <li className="d-grid">
                    <Link to="/">
                      <button className="btn btn-primary" id="logout">
                        Log Out
                      </button>
                      {/* Gumb za odjavu korisnika */}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            // Ako korisnik nije prijavljen (prop 'active' je false)
            <div className="d-flex">
              {/* Div za korisnike koji nisu prijavljeni */}
              <Link to="/login">
                {/* Link za prijavu */}
                <Button className="btn-login">
                  Log In
                </Button>
                {/* Gumb za prijavu */}
              </Link>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default HeaderMain;
