import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/TeacherInfo.css";
import { useEffect } from "react";
import { ApiConfig } from "../../config/api.config";

function TeacherInfo() {
  // Definicija stanja za unos podataka o učitelju
  const [language, setLanguage] = useState(""); // Drži informacije o jezicima koje učitelj govori
  const [years, setYears] = useState(""); // Drži informacije o godinama iskustva učitelja
  const [qualifications, setQualifications] = useState(""); // Drži informacije o kvalifikacijama učitelja
  const [style, setStyle] = useState(""); // Drži informacije o stilu podučavanja učitelja
  const [hourlyRate, setHourlyRate] = useState(""); // Drži informacije o satnici učitelja

  // Definicija predviđenih vrijednosti za jezike, kvalifikacije i stilove podučavanja
  const languages = [
    { value: "English", label: "ENGLESKI" },
    { value: "German", label: "NJEMAČKI" },
    { value: "Spanish", label: "ŠPANJOLSKI" },
  ];

  const qualificationsList = [
    { value: "BACHELORS_DEGREE", label: "Preddiplomski studij" },
    { value: "POST_BACCALAUREATE_DIPLOMA", label: "Postdiplomski studij" },
    { value: "MASTERS_DEGREE", label: "Magistarski studij" },
    { value: "DOCTORATE", label: "Doktorski studij" },
  ];

  const teachingStyles = [
    { value: "THE_DIRECT_METHOD", label: "Direktna metoda" },
    {
      value: "THE_GRAMMAR_TRANSLATION_METHOD",
      label: "Metoda gramatičkog prevođenja",
    },
    { value: "THE_STRUCTURAL_APPROACH", label: "Strukturni pristup" },
    { value: "SUGGESTOPEDIA", label: "Suggestopedia" },
    { value: "TOTAL_PHYSICAL_RESPONSE", label: "Akcija i reakcija" },
    { value: "COMMUNiCATIVE_LANGUAGE_TEACHING", label: "Poučavanje komunikacije i komuniciranja" },
    { value: "THE_SILENT_WAY", label: "Tihi način učenja" },
    { value: "THE_NATURAL_APPROACH", label: "Prirodni pristup usvajanju jezika" },
    { value: "IMMERSION", label: "Uranjanje u jezik" },
    { value: "THE_LEXICAL_SYLLABUS", label: "Vokabular" },
  ];

  // Funkcija za provjeru da li su svi podaci uneseni
  const isFormValid = () => {
    const isYearsValid =
      Number.isInteger(parseInt(years)) && parseInt(years) > 0;
    const isHourlyRateValid =
      Number.isInteger(parseInt(hourlyRate)) && parseInt(hourlyRate) > 0;

    return (
      language &&
      years &&
      qualifications &&
      style &&
      hourlyRate &&
      isYearsValid &&
      isHourlyRateValid
    );
  };

//improvizirano rješenje za teacher
  const [korisnik, setKorisnik] = useState(null);

  useEffect(() => {
    const fetchKorisnik = async () => {
      try {
        const response = await fetch(ApiConfig.API_URL + "/trenutnikorisnik", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setKorisnik(data);
      } catch (error) {
        console.error("Error fetching korisnik:", error);
      }
    };
    fetchKorisnik();
  }, []);

  const idUser = korisnik ? Object.values(korisnik)[0] : null;

//kraj improviziranog rješenja za teacher


  // Funkcija za slanje podataka na server kada se forma pošalje
  async function handleSubmit(event) {
    event.preventDefault();

    // Parsiramo podatke o godinama iskustva i satnici u brojčane vrijednosti
    const parsedYears = parseInt(years);
    const parsedHourlyRate = parseInt(hourlyRate);

    const data = {
      idKorisnik: idUser,
      jezici: [language], // Prebacujemo uneseni jezik u niz
      godineIskustva: parsedYears, // Parsirani broj
      kvalifikacija: qualifications,
      stilPoducavanja: style,
      satnica: parsedHourlyRate, // Parsirani broj
    };

    // Opcije za fetch zahtjev (POST metoda)
    const requestOptions = {
      method: "POST", // Definiramo HTTP metodu kao POST
      headers: { "Content-Type": "application/json" }, // Postavljamo Content-Type header na JSON
      body: JSON.stringify(data), // Podaci koje šaljemo u tijelu zahtjeva, pretvoreni u JSON
      credentials: "include", // Uključujemo kolačiće za autentifikaciju ako je potrebno
    };

    try {
      // Pokrećemo fetch zahtjev za slanje podataka na API
      const response = await fetch(
        ApiConfig.API_URL + "/ucitelji",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json(); // Parsiramo odgovor u JSON
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="teacher-info">
        <form className="template" onSubmit={handleSubmit}>
          <h3 id="text">Profil učitelja</h3>

          <div className="name-container">
            {/* Polje za odabir jezika */}
            <div className="name-field floating-label">
              <select
                name="jezici"
                className="form-control"
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Izaberite jezik</option>
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label} {/* Prikazujemo prijevod na HR */}
                  </option>
                ))}
              </select>
              <label htmlFor="language">Jezici</label>
            </div>

            {/* Polje za unos godina iskustva */}
            <div className="name-field floating-label">
              <input
                type="text"
                name="godineIskustva"
                placeholder=" "
                className="form-control"
                id="years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
              <label htmlFor="years">Godine iskustva</label>
            </div>
          </div>

          {/* Polje za odabir kvalifikacija */}
          <div className="floating-label">
            <select
              name="kvalifikacija"
              className="form-control"
              id="qualifications"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
            >
              <option value="">Izaberite kvalifikacije</option>
              {qualificationsList.map((qualification) => (
                <option key={qualification.value} value={qualification.value}>
                  {qualification.label} {/* Prikazujemo prijevod na HR */}
                </option>
              ))}
            </select>
            <label htmlFor="qualifications">Kvalifikacije</label>
          </div>

          {/* Polje za odabir stila podučavanja */}
          <div className="floating-label">
            <select
              name="stilPoducavanja"
              className="form-control"
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="">Izaberite stil podučavanja</option>
              {teachingStyles.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label} {/* Prikazujemo prijevod na HR */}
                </option>
              ))}
            </select>
            <label htmlFor="style">Stil podučavanja</label>
          </div>

          {/* Polje za unos satnice */}
          <div className="floating-label">
            <input
              type="text"
              name="satnica"
              placeholder=" "
              className="form-control"
              id="money"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
            <label htmlFor="money">Satnica</label>
          </div>

          <br />

          <div className="btns">
            <Link to="/">
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

export default TeacherInfo;
