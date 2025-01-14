import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";
import "../css/TeacherInfo.css";
import { ApiConfig } from "../../config/api.config";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

function TeacherInfo() {
  const [language, setLanguage] = useState([]); // Drži odabrane jezike
  const [years, setYears] = useState(""); // Drži informacije o godinama iskustva učitelja
  const [qualifications, setQualifications] = useState(""); // Drži informacije o kvalifikacijama učitelja
  const [style, setStyle] = useState(""); // Drži informacije o stilu podučavanja učitelja
  const [hourlyRate, setHourlyRate] = useState(""); // Drži informacije o satnici učitelja

  // Opcije za jezike, kvalifikacije i stilove podučavanja
  const [languageOptions, setLanguageOptions] = useState([]);
  const [qualificationOptions, setQualificationOptions] = useState([]);
  const [teachingStyles, setTeachingStyles] = useState([]);

  // Stanje za trenutnog učitelja
  const { currentTeacher, setCurrentTeacher, setSelected } =
    useContext(AppContext);

  useEffect(() => {
    // Fetch current teacher data
    const fetchCurrentTeacher = async () => {
      try {
        const teacherResponse = await fetch(
          ApiConfig.API_URL + "/trenutniucitelj",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (teacherResponse.ok) {
          const teacherData = await teacherResponse.json();
          setCurrentTeacher(teacherData);
        }
      } catch (error) {
        console.error("Error fetching current teacher:", error);
      }
    };

    fetchCurrentTeacher();
  }, [setCurrentTeacher]);

  useEffect(() => {
    setLanguage(currentTeacher?.jezici || []);
    setYears(currentTeacher?.godineIskustva || "");
    setQualifications(currentTeacher?.kvalifikacija || "");
    setStyle(currentTeacher?.stilPoducavanja || "");
    setHourlyRate(currentTeacher?.satnica || "");
    console.log("CurrentTeacher", currentTeacher);
  }, [currentTeacher]);

  // Fetch podaci za jezike
  useEffect(() => {
    fetch(ApiConfig.API_URL + "/jezici", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setLanguageOptions(data));
  }, []);

  // Fetch podaci za kvalifikacije
  useEffect(() => {
    fetch(ApiConfig.API_URL + "/enums/kvalifikacije", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setQualificationOptions(data));
  }, []);

  // Fetch podaci za stilove podučavanja
  useEffect(() => {
    fetch(ApiConfig.API_URL + "/enums/stilovi", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setTeachingStyles(data));
  }, []);

  // Funkcija za provjeru jesu li svi podaci uneseni
  const isFormValid = () => {
    const isYearsValid =
      Number.isInteger(parseInt(years)) && parseInt(years) > 0;
    const isHourlyRateValid =
      !isNaN(parseFloat(hourlyRate)) && parseFloat(hourlyRate) > 0;

    return (
      language.length > 0 &&
      years &&
      qualifications &&
      style &&
      hourlyRate &&
      isYearsValid &&
      isHourlyRateValid
    );
  };

  function HandleDelete() {
    fetch(ApiConfig.API_URL + "/izbrisiucitelja", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Teacher successfully deleted");
        setCurrentTeacher(null);
        setSelected(0);
      })
      .catch((error) => {
        console.error("Error deleting teacher:", error);
      });
  }

  // Funkcija za promjenu odabranih jezika
  const handleLanguageChange = (selectedOptions) => {
    setLanguage(selectedOptions.map((option) => option.value)); // Ažuriraj stanje s nizom odabranih jezika
  };

  // Funkcija za promjenu kvalifikacija
  const handleQualificationsChange = (selectedOption) => {
    setQualifications(selectedOption ? selectedOption.value : ""); // Sprema odabrane kvalifikacije
  };

  // Funkcija za promjenu stila podučavanja
  const handleStyleChange = (selectedOption) => {
    setStyle(selectedOption ? selectedOption.value : ""); // Sprema odabrani stil
  };

  // Funkcija za slanje podataka na server
  async function handleSubmit(event) {
    event.preventDefault();

    const parsedYears = parseInt(years);
    const parsedHourlyRate = parseFloat(hourlyRate);

    const data = {
      jezici: language,
      godineIskustva: parsedYears,
      kvalifikacija: qualifications,
      stilPoducavanja: style,
      satnica: parsedHourlyRate,
    };

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        ApiConfig.API_URL + "/azurirajucitelja",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setCurrentTeacher(data);
      setSelected(2);
      toast.success("Podaci o učitelju su uspješno ažurirani", {
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

  // Opcije kvalifikacija za React Select
  const qualificationSelectOptions = qualificationOptions.map(
    (qualification) => ({
      value: qualification,
      label: qualification.replace(/_/g, " "),
    })
  );

  // Opcije stilova za React Select
  const styleSelectOptions = teachingStyles.map((style) => ({
    value: style,
    label: style.replace(/_/g, " "),
  }));

  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={HandleDelete}
        type="button"
        disabled={!currentTeacher}
      >
        Izbrisi učitelja
      </button>
      <div className="teacher-info">
        <form className="template" onSubmit={handleSubmit}>
          <h3 id="text">Profil učitelja</h3>

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

            <div className="floating-label">
              <label>Stil podučavanja:</label>
              <Select
                name="style"
                options={styleSelectOptions}
                value={
                  style
                    ? styleSelectOptions.find(
                        (option) => option.value === style
                      )
                    : null
                }
                onChange={handleStyleChange}
                placeholder="Izaberite stil podučavanja"
              />
            </div>

            <div className="floating-label">
              <label>Kvalifikacije:</label>
              <Select
                name="kvalifikacije"
                options={qualificationSelectOptions}
                value={
                  qualifications
                    ? qualificationSelectOptions.find(
                        (option) => option.value === qualifications
                      )
                    : null
                }
                onChange={handleQualificationsChange}
                placeholder="Izaberite kvalifikacije"
              />
            </div>

            <div className="floating-label">
              <label>Godine iskustva:</label>
              <TextareaAutosize
                name="godineIskustva"
                className="form-control textarea-autosize no-resize full-width"
                minRows={1}
                maxRows={1}
                value={years}
                onChange={(e) => setYears(e.target.value)}
                maxLength={15}
                placeholder="Unesite godine iskustva"
              />
            </div>

            <div className="floating-label">
              <label>Satnica:</label>
              <TextareaAutosize
                name="satnica"
                className="form-control textarea-autosize no-resize full-width"
                minRows={1}
                maxRows={1}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                maxLength={15}
                placeholder="Unesite satnicu"
              />
            </div>
          </div>

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
        </form>
      </div>
    </>
  );
}

export default TeacherInfo;
