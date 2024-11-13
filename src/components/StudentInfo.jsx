import { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentInfo.css";
import { ApiConfig } from "../config/api.config";

function StudentInfo() {
  const [jezici, setJezici] = useState("");
  const [razina, setRazina] = useState("");
  const [stilUcenja, setStilUcenja] = useState("");
  const [ciljevi, setCiljevi] = useState("");

  const options = [
    { value: "Begginer" },
    { value: "Intermediate" },
    { value: "Advanced" },
  ];

  function handleSelect(e) {
    setRazina(e.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      language: language,
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

  return (
    <>
      <div className="student-info">
        <form className="template" onSubmit={handleSubmit}>
          <h3 id="text">Profil učenika</h3>

          <div className="name-container">
            <div className="name-field floating-label">
              <input
                type="text"
                name="jezici"
                placeholder=" "
                className="form-control"
                value={jezici}
                onChange={(e) => setJezici(e.target.value)}
              />
              <label htmlFor="language">Jezici</label>
            </div>

            <div className="floating-label">
              <select
                className="form-control"
                name="razina"
                value={razina}
                onChange={handleSelect}
              >
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
              <label htmlFor="knowledge">Razina znanja</label>
            </div>

            <div className="name-field floating-label">
              <input
                type="text"
                name="stilUcenja"
                placeholder=" "
                className="form-control"
                value={stilUcenja}
                onChange={(e) => setStilUcenja(e.target.value)}
              />
              <label htmlFor="teachingStyle">Željeni stil učenja</label>
            </div>
          </div>

          <div className="floating-label">
            <input
              type="text"
              name="ciljevi"
              placeholder=" "
              className="form-control"
              value={ciljevi}
              onChange={(e) => setCiljevi(e.target.value)}
            />
            <label htmlFor="motivation">Ciljevi</label>
          </div>

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

export default StudentInfo;
