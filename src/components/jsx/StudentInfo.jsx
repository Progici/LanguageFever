import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";
import "../css/StudentInfo.css";
import { ApiConfig } from "../../config/api.config";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

function StudentInfo() {
  const [language, setLanguage] = useState([]); // Koristimo niz za višestruki odabir jezika
  const [level, setLevel] = useState(""); // Razina znanja
  const [style, setStyle] = useState(""); // Stil učenja
  const [goals, setGoals] = useState(""); // Ciljevi

  const [levelOptions, setLevelOptions] = useState([]);
  const [teachingStyles, setTeachingStyles] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);

  // Dodavanje stanja za trenutnog učenika
  const { setCurrentStudent } = useContext(AppContext);

  // Fetch podaci za jezike
  useEffect(() => {
    fetch(ApiConfig.API_URL + "/jezici", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setLanguageOptions(data));
  }, []);

  // Fetch podaci za razine
  useEffect(() => {
    fetch(ApiConfig.API_URL + "/enums/razine", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setLevelOptions(data));
  }, []);

  // Fetch podaci za stilove učenja
  useEffect(() => {
    fetch(ApiConfig.API_URL + "/enums/stilovi", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setTeachingStyles(data));
  }, []);

  // Dohvat podataka o trenutnom učeniku
  useEffect(() => {
    fetch(ApiConfig.API_URL + "/trenutniucenik", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 404) {
          setCurrentStudent(null); // Ako nema podataka, postavite na null
          return;
        }

        console.log("Fetch pokušaj");
        return response.json();
      })
      .then((data) => {
        if (data) {
          setCurrentStudent(data); // Postavite podatke o trenutnom učeniku
          setLanguage(data.jezici || []);
          setLevel(data.razina || "");
          setStyle(data.stilUcenja || "");
          setGoals(data.ciljevi || "");
          console.log("Evo došli podaci.");
        }
      })
      .catch((error) => {
        console.error("Error fetching current student data:", error);
        setCurrentStudent(null);
      });
  }, []);

  // Funkcija za provjeru jesu li svi podaci uneseni
  const isFormValid = () => {
    return language.length > 0 && level && style && goals;
  };

  // Funkcija za promjenu odabranih jezika
  const handleLanguageChange = (selectedOptions) => {
    setLanguage(selectedOptions.map((option) => option.value));
  };

  // Funkcija za promjenu razine znanja
  const handleLevelChange = (selectedOption) => {
    setLevel(selectedOption ? selectedOption.value : "");
  };

  // Funkcija za promjenu stila učenja
  const handleStyleChange = (selectedOption) => {
    setStyle(selectedOption ? selectedOption.value : "");
  };

  // Funkcija za slanje podataka na server
  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      jezici: language,
      razina: level,
      ciljevi: goals,
      stilUcenja: style,
    };

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        ApiConfig.API_URL + "/azurirajucenika",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Podaci o učeniku su uspješno ažurirani", {
        position: "bottom-right",
        autoClose: 3000, // 3 sekunde
        hideProgressBar: true,
        closeOnClick: true,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Opcije jezika za React Select
  const languageSelectOptions = languageOptions.map((lang) => ({
    value: lang,
    label: lang,
  }));

  // Opcije razina za React Select
  const levelSelectOptions = levelOptions.map((level) => ({
    value: level,
    label: level,
  }));

  // Opcije stilova za React Select
  const styleSelectOptions = teachingStyles.map((style) => ({
    value: style,
    label: style.replace(/_/g, " "),
  }));

  return (
    <>
      <div className="student-info">
        <form className="template" onSubmit={handleSubmit}>
          <h3 id="text">Profil učenika</h3>

          <div className="name-container">
            <div className="floating-label react-select-container">
              <label>Jezici:</label>
              <Select
                isMulti
                name="languages"
                options={languageSelectOptions}
                value={languageSelectOptions.filter((option) =>
                  language.includes(option.value)
                )}
                onChange={handleLanguageChange}
                placeholder="Izaberite jezike"
              />
            </div>

            <div className="name-field floating-label">
              <label>Stil učenja:</label>
              <Select
                name="style"
                options={styleSelectOptions}
                value={styleSelectOptions.find(
                  (option) => option.value === style
                )}
                onChange={handleStyleChange}
                placeholder="Izaberite stil učenja"
              />
            </div>

            <div className="floating-label">
              <label>Razina znanja:</label>
              <Select
                name="level"
                options={levelSelectOptions}
                value={levelSelectOptions.find(
                  (option) => option.value === level
                )}
                onChange={handleLevelChange}
                placeholder="Izaberite razinu znanja"
              />
            </div>

            <div className="floating-label">
              <label htmlFor="goals">Ciljevi:</label>
              <TextareaAutosize
                name="goals"
                className="form-control textarea-autosize no-resize"
                minRows={1}
                maxRows={6}
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="Unesite ciljeve"
              />
            </div>
          </div>

          <br />

          <div className="btns">
            <Link to="/">
              <button className="btn">Natrag</button>
            </Link>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={!isFormValid()}
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
