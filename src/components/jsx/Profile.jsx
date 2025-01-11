import { useState, useEffect, useRef, useContext } from "react"; // Added useContext
import { AppContext } from "../../AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Profile.css";
import StudentInfo from "./StudentInfo";
import TeacherInfo from "./TeacherInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const { selected, setSelected } = useContext(AppContext);
  // Držimo aktivnu tablicu (1 = Učenik, 2 = Učitelj)

  // Funkcija koja omogućava prebacivanje između tabova
  function toggleTab(tab) {
    setSelected(tab); // Ažurira stanje na temelju tab-a koji je kliknut
  }

  return (
    <div className="d-flex align-items-center justify-content-center profile-content-container">
      {/* Glavni kontejner za profil sa centriranim sadržajem */}
      <div className="tab profile-form-container">
        <ul className="d-flex tabs">
          <li
            className={`flex-fill ${selected === 1 ? "active-tab" : ""}`} // Aktivira tab "Učenik" ako je activeTab 1
            onClick={() => toggleTab(1)} // Poziva toggleTab funkciju sa tab-om 1 (Učenik)
          >
            Učenik
          </li>
          <li
            className={`flex-fill ${selected === 2 ? "active-tab" : ""}`} // Aktivira tab "Učitelj" ako je activeTab 2
            onClick={() => toggleTab(2)} // Poziva toggleTab funkciju sa tab-om 2 (Učitelj)
          >
            Učitelj
          </li>
        </ul>
        {/* Prikazuje sadržaj ovisno o aktivnom tabu */}
        <div
          className={
            selected === 1 ? "show-content content-area" : "content" // Ako je activeTab 1, prikazuje sadržaj za Učenika
          }
        >
          <StudentInfo /> {/* Prikazuje komponentu za informacije o učeniku */}
        </div>
        <div
          className={
            selected === 2 ? "show-content content-area" : "content" // Ako je activeTab 2, prikazuje sadržaj za Učitelja
          }
        >
          <TeacherInfo /> {/* Prikazuje komponentu za informacije o učitelju */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
