import { useState } from "react";
import "./StudentInfo.css";
import { Link } from "react-router-dom";
import { ApiConfig } from "../config/api.config";

function StudentInfo() {
  const [value, setValue] = useState("");
  const options = [
    { value: "Begginer" },
    { value: "Intermediate" },
    { value: "Advanced" },
  ];
  function handleSelect(e) {
    setValue(e.target.value);
  }

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
    fetch(ApiConfig + "/ucenici", requestOptions).then(async (response) => {
      if (!response.ok) {
        console.log("Error!");
      }
    });
  }
  return (
    <>
      <div className="student-info">
        <form className="template" onSubmit={handleSubmit}>
          <h3 id="text">Profil učenika</h3>
          <div className="name-container">
            {/*za jezike koje zele naucit*/}
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

            {/*za razinu znanja*/}
            <div className="floating-label">
              <select
                className="form-control"
                name="razina"
                id="knowledge"
                value={value}
                onChange={handleSelect}
              >
                {options.map((option) => (
                  <option>{option.value}</option>
                ))}
              </select>
              <label htmlFor="knowledge">Razina znanja</label>
            </div>
            {/*za zeljeni stil poducavanja
             */}
            <div className="name-field floating-label">
              <input
                type="text"
                name="stilUcenja"
                placeholder=" "
                className="form-control"
                id="teachingStyle"
              />
              <label htmlFor="teachingStyle">Željeni stil učenja</label>
            </div>
          </div>

          {/*za cilj ucenja*/}
          <div className="floating-label">
            <input
              type="text"
              name="ciljevi"
              placeholder=" "
              className="form-control"
              id="motivation"
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
