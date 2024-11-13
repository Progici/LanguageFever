import { useState } from "react";
import { Link } from "react-router-dom";
import "./TeacherInfo.css";
import { ApiConfig } from "../config/api.config";

function TeacherInfo() {
  {
    /*const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };*/
  }
  
  const [language, setLanguage] = useState();
  const [years, setYears] = useState();
  const [qualifications, setQualificatios] = useState();
  const [style, setStyle] = useState();
  const [rate, setRate] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      language: [language],
      years: years,
      qualifications: qualifications,
      style: style,
      rate: rate
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include"
    };

    try {
      console.log(data)
      const response = await fetch(ApiConfig.API_URL + "/ucitelji", requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Response data:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  {
    /* const [fileName, setFileName] = useState("");
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };*/
  }

  return (
    <>
      <div className="teacher-info">
        <form className="template" onSubmit={handleSubmit}>
          <h3 id="text">Profil učitelja</h3>
          <div className="name-container">
            {/*za jezike koje govore*/}
            <div className="name-field floating-label">
              <input
                type="text"
                name="jezici"
                placeholder=" "
                className="form-control"
                id="language"
              />
              <label htmlFor="language">Jezici</label>
            </div>
            {/*za godine iskustva*/}
            <div className="name-field floating-label">
              <input
                type="text"
                name="godineIskustva"
                placeholder=" "
                className="form-control"
                id="years"
              />
              <label htmlFor="years">Godine iskustva</label>
            </div>
          </div>
          {/*za kvalifikacije*/}
          <div className="floating-label">
            <input
              type="text"
              name="kvalifikacija"
              placeholder=" "
              className="form-control"
              id="qualifications"
            />
            <label htmlFor="qualifications">Kvalifikacije</label>
          </div>
          {/*za stil podučavanja*/}
          <div className="floating-label">
            <input
              type="text"
              name="stilPoducavanja"
              placeholder=" "
              className="form-control"
              id="style"
            />
            <label htmlFor="style">Stil podučavanja</label>
          </div>
          {/*za satnicu*/}
          <div className="floating-label">
            <input
              type="text"
              name="satnica"
              placeholder=" "
              className="form-control"
              id="money"
            />
            <label htmlFor="money">Satnica</label>
          </div>
          {/*za sliku profila
          <div className="floating-label">
            <input
              type="file"
              placeholder=" "
              className="form-control"
              id="profilePic"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <p id="profilePic">Odaberi profilnu sliku</p>
            <button
              type="button"
              id="profilePic-btn"
              onClick={() => document.getElementById("profilePic").click()}
            >
              Choose
            </button>
          </div>*/}

          {/*<div className="calendar-container">
            <p id="calendar-text">Set Availability</p>
            <button id="calendar-btn" type="button" onClick={toggleCalendar}>
              
              {isCalendarOpen ? "Close Calendar" : "Open Calendar"}
            </button>
            {isCalendarOpen && (
              <div className="calendar">
                <Calendar></Calendar>
              </div>
            )}
          </div> */}

          <br />

          <div className="btns">
            <Link to="/proba">
              <button className="btn">Natrag</button>
            </Link>

            <button className="btn btn-primary" type="submit">
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
