import { useContext, useEffect } from "react";
import { AppContext, AppProvider } from "./AppContext"; // Ensure correct imports
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Logout from "./components/jsx/Logout";
import Home from "./components/jsx/Home";
import TeacherProfile from "./components/jsx/TeacherProfile";
import HeaderMain from "./components/jsx/HeaderMain";
import Profile from "./components/jsx/Profile";
import CalendarUser from "./components/jsx/CalendarUser";
import TeachersPage from "./components/jsx/TeachersPage";
import { ApiConfig } from "./config/api.config";
import Faqs from "./components/jsx/Faqs";
import LoginUser from "./components/jsx/LoginUser";
import { ToastContainer } from "react-toastify";
import NewReqTeacher from "./components/jsx/NewReqTeacher";
import RateTeachers from "./components/forms/RateTeachers";
import dayjs from "dayjs";
import "dayjs/locale/hr";

// RequireSelection component that checks the 'selected' value
function RequireSelection({ children }) {
  const { active, selected } = useContext(AppContext);

  if (selected === 0 && active) {
    return <Profile />;
  }

  // Render children if selection exists
  return children;
}

function AppContent() {
  dayjs.locale("hr");

  const {
    setActive,
    setSelected,
    setCurrentStudent,
    setCurrentTeacher,
    setCurrentUser,
    active,
    selected,
    currentUser,
    currentStudent,
    currentTeacher,
  } = useContext(AppContext); // Use context inside AppContent

  useEffect(() => {
    console.log("Active: " + active);
    console.log("CurrentUser:", currentUser);
    console.log("CurrentStudent:", currentStudent);
    console.log("CurrentTeacher:", currentTeacher);
    if (selected === 1)
      console.log("%c Selected: Student ", "background: #222; color: #bada55");
    else if (selected === 2)
      console.log("%c Selected: Teacher ", "background: #222; color: #bada55");
    else console.log("%c Selected: NONE", "background: #222; color: #bada55");
  }, [active, selected, currentUser, currentStudent, currentTeacher]);

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
        setActive(data);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchActivityStatus();
  }, [setActive]);

  useEffect(() => {
    // Fetch both current student and current teacher
    const fetchUserData = async () => {
      try {
        // Fetch student data
        const studentResponse = await fetch(
          ApiConfig.API_URL + "/trenutniucenik",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          setCurrentStudent(studentData);
          setSelected(1); // Student found, set as selected
        } else {
          setCurrentStudent("");
          // If student fetch fails, set as null
        }

        // Fetch teacher data only if student fetch fails
        const teacherResponse = await fetch(
          ApiConfig.API_URL + "/trenutniucitelj",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (teacherResponse.ok) {
          const teacherData = await teacherResponse.json();
          setCurrentTeacher(teacherData);
          setSelected(2); // Teacher found, set as selected
        } else {
          setCurrentTeacher("");
          // If teacher fetch fails, set as null
        }
      } catch (error) {
        setCurrentStudent("");
        setCurrentTeacher("");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setCurrentStudent, setCurrentTeacher, setSelected]);

  useEffect(() => {
    const fetchActivityStatus = async () => {
      try {
        const response = await fetch(ApiConfig.API_URL + "/trenutnikorisnik", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          setCurrentUser("");
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        setCurrentUser("");
        console.error("Error fetching status:", error);
      }
    };
    fetchActivityStatus();
  }, [setCurrentUser]);

  return (
    <>
      <HeaderMain />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route
          path="/teachers/:id"
          element={
            <RequireSelection>
              <TeacherProfile />
            </RequireSelection>
          }
        />
        <Route
          path="/edit-user"
          element={
            <RequireSelection>
              <Profile />
            </RequireSelection>
          }
        />
        <Route path="/faqs" element={<Faqs />} />
        <Route
          path="/calendar"
          element={
            <RequireSelection>
              <CalendarUser />
            </RequireSelection>
          }
        />
        <Route
          path="/new-requests"
          element={
            <RequireSelection>
              <NewReqTeacher />
            </RequireSelection>
          }
        />
        <Route
          path="/rate-teachers"
          element={
            <RequireSelection>
              <RateTeachers />
            </RequireSelection>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent /> {/* Separate content into a child component */}
      </Router>
    </AppProvider>
  );
}

export default App;
