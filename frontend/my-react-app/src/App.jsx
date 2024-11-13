import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import TeacherInfo from "./components/TeacherInfo";
import StudentInfo from "./components/StudentInfo";
import HeaderMain from "./components/HeaderMain";
import Profile from "./components/Profile";
import CalendarUser from "./components/CalendarUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeachersPage from "./components/TeachersPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header /> <Home />
              </>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/teachers" element={<TeachersPage />}></Route>
          {/*privremeno*/}
          <Route path="/teacherInfo" element={<TeacherInfo />}></Route>
          <Route path="/studentInfo" element={<StudentInfo />}></Route>
          <Route
            path="/proba"
            element={
              <>
                <HeaderMain></HeaderMain>
                <Home></Home>
              </>
            }
          ></Route>
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
