import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/jsx/Login";
import Home from "./components/jsx/Home";
import TeacherInfo from "./components/jsx/TeacherInfo";
import StudentInfo from "./components/jsx/StudentInfo";
import HeaderMain from "./components/jsx/HeaderMain";
import Profile from "./components/jsx/Profile";
import CalendarUser from "./components/jsx/CalendarUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeachersPage from "./components/jsx/TeachersPage";
import { useEffect, useState } from "react";
import { ApiConfig } from "./config/api.config";
import Faqs from "./components/jsx/Faqs";
import LoginUser from "./components/jsx/LoginUser";
import NewReqTeacher from "./components/jsx/NewReqTeacher";
import RateTeachers from "./components/forms/RateTeachers";

function App() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fetchActivityStatus = async () => {
      try {
        const response = await fetch(ApiConfig.API_URL + "/active", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setActive(data);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchActivityStatus();
  }, []);

  return (
    <>
      <Router>
        <HeaderMain active={true}></HeaderMain>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginUser />}></Route>
          <Route path="/logout" element={<Login />}></Route>
          <Route path="/teachers" element={<TeachersPage />}></Route>
          <Route path="/teacherInfo" element={<TeacherInfo />}></Route>
          <Route path="/studentInfo" element={<StudentInfo />}></Route>
          <Route path="/editUser" element={<Profile />}></Route>
          <Route path="/faqs" element={<Faqs />}></Route>
          <Route path="/calendar" element={<CalendarUser />}></Route>
          <Route path="/newRequests" element={<NewReqTeacher />}></Route>
          <Route path="/rateTeachers" element={<RateTeachers />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
