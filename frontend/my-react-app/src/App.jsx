import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import TeacherInfo from "./components/TeacherInfo";
import StudentInfo from "./components/StudentInfo";
import HeaderMain from "./components/HeaderMain";
import Profile from "./components/Profile";
import CalendarUser from "./components/CalendarUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeachersPage from "./components/TeachersPage";
import { useEffect, useState } from "react";
import { ApiConfig } from "./config/api.config";

function App() {

  const [active, setActive] = useState(false);

  useEffect(() => {
    const fetchActivityStatus = async () => {
      try {
        const response = await fetch(ApiConfig.API_URL + "/active", {
          method: "GET"
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data)
        setActive(data)
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchActivityStatus();
  }, []);

  return (
    <>
      <Router>
        <HeaderMain active={active}></HeaderMain>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/teachers" element={<TeachersPage />}></Route>
          <Route path="/teacherInfo" element={<TeacherInfo />}></Route>
          <Route path="/studentInfo" element={<StudentInfo />}></Route>
          <Route path="/editUser" element={<Profile />}></Route>
          <Route
            path="/calendar"
            element={<CalendarUser></CalendarUser>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
