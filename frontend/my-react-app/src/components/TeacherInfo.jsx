import { useState } from "react";
import { Link } from "react-router-dom";
/*import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";*/
import "./TeacherInfo.css";
import { ApiConfig } from "../config/api.config";

function TeacherInfo() {
  {
    /*const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };*/
  }
  /*
  const [lagnuage, setLanguage] = useState();
  const [years, setYears] = useState();
  const [qualifications, setQualificatios] = useState();
  const [style, setStyle] = useState();
  const [rate, setRate] = useState();
  //profile pic?*/

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formJson),
      credentials: "include",
    };
    fetch(ApiConfig + "/ucitelji", requestOptions).then(async (response) => {
      if (!response.ok) {
        console.log("Error!");
      }
    });
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
