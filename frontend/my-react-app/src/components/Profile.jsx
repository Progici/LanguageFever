import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentInfo from "./StudentInfo";
import "./Profile.css";
import TeacherInfo from "./TeacherInfo";

function Profile() {
  const [activeTab, setActiveTab] = useState(1);

  function toggleTab(tab) {
    setActiveTab(tab);
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div className="col-6 tab p-5 grid-layout">
          <ul className="d-flex tabs">
            <li
              className={`flex-fill ${activeTab === 1 ? "active-tab" : ""}`}
              onClick={() => toggleTab(1)}
            >
              Ucenik
            </li>
            <li
              className={`flex-fill ${activeTab === 2 ? "active-tab" : ""}`}
              onClick={() => toggleTab(2)}
            >
              Ucitelj
            </li>
          </ul>
          <div
            className={
              activeTab === 1 ? "show-content content-area" : "content"
            }
          >
            <StudentInfo />
          </div>
          <div
            className={
              activeTab === 2 ? "show-content content-area" : "content"
            }
          >
            <TeacherInfo />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
