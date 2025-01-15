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
          <p>{active && <>Dobrodošli, {currentUser?.name}!</>}</p>
          <section className="hero-section">
            <div className="home-picture-div">
              <img src={homeImage} className="home-picture" />
            </div>
            <section className="hero-text">
              <h1>Zaronite u svijet stranih jezika uz LanguageFever</h1>
              <p>Povezujemo učenike i učitelje stranih jezika diljem svijeta</p>
            </section>
            <section className="hero-buttons">
              <Link to="/login">
                <button className="cta-button">Započni</button>
              </Link>

              <button className="cta-button">O nama</button>
            </section>
          </section>

          <section className="popular-section">
            <h2>Popularni učitelji i jezici</h2>
            <div className="popular-cards">
              <div className="card">
                <h3>John Doe</h3>
                <img src={teacherPhoto} className="teach-photo" />
                <p>★★★★★</p>
                <p>Jezik</p>
              </div>
              <div className="card">
                <h3>Jane Doe</h3>
                <img src={teacherPhoto} className="teach-photo" />
                <p>★★★★★</p>
                <p>Jezik</p>
              </div>
              <div className="card">
                <h3>John Doe</h3>
                <img src={teacherPhoto} className="teach-photo" />
                <p>★★★★☆</p>
                <p>Jezik</p>
              </div>
              <div className="card">
                <h3>Jane Doe</h3>
                <img src={teacherPhoto} className="teach-photo" />
                <p>★★★★☆</p>
                <p>Jezik</p>
              </div>
              <div className="card">
                <h3>John Doe</h3>
                <img src={teacherPhoto} className="teach-photo" />
                <p>★★★★☆</p>
                <p>Jezik</p>
              </div>
              <div className="card">
                <h3>Jane Doe</h3>
                <img src={teacherPhoto} className="teach-photo" />
                <p>★★★★☆</p>
                <p>Jezik</p>
              </div>
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
