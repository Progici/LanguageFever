import { useState, useEffect, useRef, useContext } from "react"; // Added useContext
import { AppContext } from "../../AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Profile.css";
import StudentInfo from "./StudentInfo";
import TeacherInfo from "./TeacherInfo";
import { ApiConfig } from "../../config/api.config";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const {
    selected,
    setSelected,
    currentStudent,
    currentTeacher,
    setCurrentStudent,
    setCurrentTeacher,
  } = useContext(AppContext);
  const [activeTable, setActiveTable] = useState(selected);

  // Funkcija koja omogućava prebacivanje između tabova
  function toggleTab(activeTable) {
    setActiveTable(activeTable); // Ažurira stanje na temelju tab-a koji je kliknut
    if (activeTable === 1 && currentStudent != null) setSelected(1);
    else if (activeTable === 2 && currentTeacher != null) setSelected(2);
  }

  useEffect(() => {
    if (selected === 1)
      console.log("%c Selected: Student ", "background: #222; color: #bada55");
    else if (selected === 2)
      console.log("%c Selected: Teacher ", "background: #222; color: #bada55");
    else console.log("%c Selected: NONE", "background: #222; color: #bada55");
  }, [selected]);

  return (
    <div className="d-flex align-items-center justify-content-center profile-content-container">
      {/* Glavni kontejner za profil sa centriranim sadržajem */}
      <div className="tab profile-form-container">
        <ul className="d-flex tabs">
          <li
            className={`flex-fill ${activeTable === 1 ? "active-tab" : ""}`} // Aktivira tab "Učenik" ako je activeTab 1
            onClick={() => toggleTab(1)} // Poziva toggleTab funkciju sa tab-om 1 (Učenik)
          >
            Učenik
          </li>
          <li
            className={`flex-fill ${activeTable === 2 ? "active-tab" : ""}`} // Aktivira tab "Učitelj" ako je activeTab 2
            onClick={() => toggleTab(2)} // Poziva toggleTab funkciju sa tab-om 2 (Učitelj)
          >
            Učitelj
          </li>
        </ul>
        {/* Prikazuje sadržaj ovisno o aktivnom tabu */}
        <div
          className={
            activeTable === 1 ? "show-content content-area" : "content" // Ako je activeTab 1, prikazuje sadržaj za Učenika
          }
        >
          <StudentInfo /> {/* Prikazuje komponentu za informacije o učeniku */}
        </div>
        <div
          className={
            activeTable === 2 ? "show-content content-area" : "content" // Ako je activeTab 2, prikazuje sadržaj za Učitelja
          }
        >
          <TeacherInfo /> {/* Prikazuje komponentu za informacije o učitelju */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
