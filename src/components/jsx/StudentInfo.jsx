import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/StudentInfo.css";
import { ApiConfig } from "../../config/api.config";

function StudentInfo() {
  const [language, setLanguage] = useState(""); // Jedan jezik
  const [level, setLevel] = useState(""); // Razina znanja
  const [style, setStyle] = useState(""); // Stil učenja
  const [goals, setGoals] = useState(""); // Ciljevi

  // Opcije za razinu znanja
  const levelOptions = [
    { value: "BEGINNER", label: "Početna" },
    { value: "INTERMEDIATE", label: "Srednja" },
    { value: "EXPERT", label: "Napredna" },
  ];

  // Opcije za stilove učenja
  const teachingStyles = [
    { value: "The_Direct_Method", label: "Direktna metoda" },
    {
      value: "The_Grammar_Translation_Method",
      label: "Metoda gramatičkog prevođenja",
    },
    { value: "The_Structural_Approach", label: "Strukturni pristup" },
  ];

  // Opcije za jezike
  const languageOptions = [
    { value: "ENGLISH", label: "Engleski" },
    { value: "GERMAN", label: "Njemački" },
    { value: "SPANISH", label: "Španjolski" },
  ];

  // Funkcija za provjeru jesu li svi podaci uneseni
  const isFormValid = () => {
    return (
      language && // Moraju biti odabrani jezici
      level && // Moraju biti odabrana razina
      style && // Moraju biti odabrani stil učenja
      goals // Moraju biti uneseni ciljevi
    );
  };

  // Funkcija za promjenu odabranog jezika
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value); // Sprema odabrani jezik
  };

  // Funkcija za promjenu razine znanja
  const handleLevelChange = (event) => {
    setLevel(event.target.value); // Sprema odabranu razinu znanja
  };

  // Funkcija za slanje podataka na server kada se forma pošalje
  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      jezici: [language], // Jedan jezik u nizu
      razina: level, // Razina znanja
      ciljevi: goals, // Ciljevi
      stilUcenja: style, // Stil učenja
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    };

    try {
      const response = await fetch(
        ApiConfig.API_URL + "/ucenici",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="student-info">
        <form className="template" onSubmit={handleSubmit}>
          <h3 id="text">Profil učenika</h3>

          <div className="name-container">
            {/* Polje za odabir jezika */}
            <div className="name-field floating-label">
              <label>Jezik</label>
              <select
                className="form-control"
                name="language"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="">Izaberite jezik</option>
                {languageOptions.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Polje za odabir razine znanja */}
            <div className="floating-label">
              <select
                className="form-control"
                name="level"
                value={level}
                onChange={handleLevelChange}
              >
                <option value="">Izaberite razinu znanja</option>
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <label htmlFor="level">Razina znanja</label>
            </div>

            {/* Polje za unos stila učenja */}
            <div className="name-field floating-label">
              <select
                className="form-control"
                name="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option value="">Izaberite stil učenja</option>
                {teachingStyles.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
              <label htmlFor="style">Stil učenja</label>
            </div>

            {/* Polje za unos ciljeva */}
            <div className="floating-label">
              <input
                type="text"
                name="goals"
                className="form-control"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
              <label htmlFor="goals">Ciljevi</label>
            </div>
          </div>

          <br />

          <div className="btns">
            <Link to="/proba">
              <button className="btn">Natrag</button>
            </Link>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={!isFormValid()} // Onemogućujemo gumb dok forma nije valjana
            >
              Spremi
            </button>
          </div>
          <br />
        </form>
      </div>
    </>
  );
}

export default StudentInfo;
