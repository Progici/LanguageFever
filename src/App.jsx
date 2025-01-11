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

// RequireSelection component that checks the 'selected' value
function RequireSelection({ children }) {
  const { currentStudent, currentTeacher, active } = useContext(AppContext);

  // Redirect to /edit-user if no selection is made
  if (currentStudent === null && currentTeacher === null && active) {
    return <Navigate to="/edit-user" replace />;
  }

  // Render children if selection exists
  return children;
}

function AppContent() {
  const { setActive, currentStudent, currentTeacher, currentUser, selected } =
    useContext(AppContext); // Use context inside AppContent

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
        console.log("-----------");
        console.log("Active: " + data);
        console.log("CurrentUser:");
        console.log(currentUser);
        console.log("CurrentStudent:");
        console.log(currentStudent);
        console.log("CurrentTeacher:");
        console.log(currentTeacher);
        if (selected === 1) console.log("Selected: Student");
        else console.log("Selected: Teacher");
        console.log("-----------");
        setActive(data);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchActivityStatus();
  }, [setActive]);

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
        <Route path="/edit-user" element={<Profile />} />
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
