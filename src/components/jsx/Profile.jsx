import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Profile.css";
import StudentInfo from "./StudentInfo";
import TeacherInfo from "./TeacherInfo";

function Profile() {
  // Držimo aktivnu tablicu (1 = Učenik, 2 = Učitelj)
  const [activeTab, setActiveTab] = useState(1); // Početno stanje je aktivan "Učenik" tab (1)

  // Funkcija koja omogućava prebacivanje između tabova
  function toggleTab(tab) {
    setActiveTab(tab); // Ažurira stanje na temelju tab-a koji je kliknut
  }

  return (
    <div className="d-flex align-items-center justify-content-center profile-content-container">
      {/* Glavni kontejner za profil sa centriranim sadržajem */}
      <div className="col-6 tab p-5 grid-layout profile-form-container">
        <ul className="d-flex tabs">
          <li
            className={`flex-fill ${activeTab === 1 ? "active-tab" : ""}`} // Aktivira tab "Učenik" ako je activeTab 1
            onClick={() => toggleTab(1)} // Poziva toggleTab funkciju sa tab-om 1 (Učenik)
          >
            Učenik
          </li>
          <li
            className={`flex-fill ${activeTab === 2 ? "active-tab" : ""}`} // Aktivira tab "Učitelj" ako je activeTab 2
            onClick={() => toggleTab(2)} // Poziva toggleTab funkciju sa tab-om 2 (Učitelj)
          >
            Učitelj
          </li>
        </ul>
        {/* Prikazuje sadržaj ovisno o aktivnom tabu */}
        <div
          className={
            activeTab === 1 ? "show-content content-area" : "content" // Ako je activeTab 1, prikazuje sadržaj za Učenika
          }
        >
          <StudentInfo /> {/* Prikazuje komponentu za informacije o učeniku */}
        </div>
        <div
          className={
            activeTab === 2 ? "show-content content-area" : "content" // Ako je activeTab 2, prikazuje sadržaj za Učitelja
          }
        >
          <TeacherInfo /> {/* Prikazuje komponentu za informacije o učitelju */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
