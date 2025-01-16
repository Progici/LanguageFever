import teacherPhoto from "../../assets/images/teacherdefault.png";
import homeImage from "../../assets/images/homeimage.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "../css/Home.css";
import { AppContext } from "../../AppContext";

function Home() {
  const { currentUser, active } = useContext(AppContext);
  return (
    <>
      <div className="home">
        <div className="home-section">
          <h2 className="welcome-text">
            {active && <>Dobrodošli, {currentUser?.name}!</>}
          </h2>
          <section className="hero-section">
            <div className="home-picture-div">
              <img src={homeImage} className="home-picture" />
            </div>
            <section className="hero-text">
              <h1>Zaronite u svijet stranih jezika uz LanguageFever</h1>
              <p>Povezujemo učenike i učitelje stranih jezika diljem svijeta</p>
            </section>
            <section className="hero-buttons">
              {!active && (
                <Link to="/login">
                  <button className="cta-button">Započni</button>
                </Link>
              )}
            </section>
          </section>

          <section className="popular-section">
            <div className="popular-content">
              {active ? (
                <div className="popular-text">
                  <p>Vaša LanguageFever pustolovina počinje ovdje!</p>
                  <p>
                    Možete pretraživati učitelje, rezervirati lekcije ili se čak
                    prijaviti kao učitelj kako biste podučavali druge korisnike.
                    Iskoristite sve što LanguageFever nudi!
                  </p>
                </div>
              ) : (
                <div className="popular-text">
                  <p>Dobrodošli u LanguageFever!</p>
                  <p>
                    Trenutno možete pregledavati učitelje, ali stvaranjem računa
                    dobivate pristup punom iskustvu naše aplikacije:
                  </p>
                  <p>
                    Pretražujte učitelje, rezervirajte lekcije ili sami
                    postanite učitelj. Postanite član LanguageFever zajednice za
                    pristup svim našim mogućnostima!
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="testimonials-section">
            <h2>Iskustva naših korisnika</h2>
            <div className="testimonial">
              <p>"Language Fever je najbolja aplikacija!!!"</p>
              <span>- Sretni korisnik</span>
            </div>
          </section>

          <footer className="footer">
            <p>&copy; 2024 LanguageFever. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
