import teacherPhoto from '../assets/images/teacherphoto.jpg';
import homeImage from '../assets/images/homeimage.png';
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="home">
        
        <div className="home-section">
          <section className="hero-section">
            {/* Hero sekcija koja prikazuje sliku i tekst */}
            <div className="home-picture-div">
              <img src={homeImage} className="home-picture"/> 
            </div>
            <section className="hero-text">
              <h1>Zaronite u svijet stranih jezika uz LanguageFever</h1>
              <p>Povezujemo učenike i učitelje stranih jezika diljem svijeta</p> 
            </section>
            
            <section className="popular-section">
              <h2>Popularni učitelji i jezici</h2>
              <div className="popular-cards">
                <div className="card">
                  <h3>John Doe</h3> 
                  <img src={teacherPhoto} className="teach-photo"/>
                  <p>★★★★★</p> 
                  <p className="language">Jezik</p>
                </div>
                <div className="card">
                  <h3>Jane Doe</h3>
                  <img src={teacherPhoto} className="teach-photo"/> 
                  <p>★★★★★</p> 
                  <p className="language">Jezik</p>
                </div>
                <div className="card">
                  <h3>John Doe</h3>
                  <img src={teacherPhoto} className="teach-photo"/> 
                  <p>★★★★☆</p> 
                  <p className="language">Jezik</p>
                </div>
                <div className="card">
                  <h3>Jane Doe</h3>
                  <img src={teacherPhoto} className="teach-photo"/> 
                  <p>★★★★☆</p> 
                  <p className="language">Jezik</p>
                </div>
                <div className="card">
                  <h3>John Doe</h3>
                  <img src={teacherPhoto} className="teach-photo"/> 
                  <p>★★★★☆</p> 
                  <p className="language">Jezik</p>
                </div>
                <div className="card">
                  <h3>Jane Doe</h3>
                  <img src={teacherPhoto} className="teach-photo"/> 
                  <p>★★★★☆</p> 
                  <p className="language">Jezik</p>
                </div>
              </div>
              <Link to="/teachers" className="teacher-list-link">            
                  <h3 className="teacher-list">Pogledaj više</h3>
              </Link>
            </section>
          </section>
          
          <section className="testimonials-section">
            {/* Sekcija za prikazivanje korisničkih recenzija */}
            <h2>Iskustva naših korisnika</h2>
            <div className="testimonial">
              {/* Recenzija korisnika */}
              <p>"Language Fever je najbolja aplikacija!!!"</p>
              {/* Tekst recenzije */}
              <span>- Sretni korisnik</span>
              {/* Ime korisnika koji je dao recenziju */}
            </div>
          </section>

          <footer className="footer">
            <p>&copy; 2024 Language Fever. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
