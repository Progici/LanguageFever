import { AppProvider, AppContext } from "./AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RequireLogin from "./RequireLogin";
import Logout from "./components/jsx/Logout";
import Home from "./components/jsx/Home";
import TeacherProfile from "./components/jsx/TeacherProfile";
import HeaderMain from "./components/jsx/HeaderMain";
import Profile from "./components/jsx/Profile";
import CalendarUser from "./components/jsx/CalendarUser";
import TeachersPage from "./components/jsx/TeachersPage";
import Faqs from "./components/jsx/Faqs";
import LoginUser from "./components/jsx/LoginUser";
import ArchiveStudent from "./components/jsx/ArchiveStudent";
import ArchiveTeacher from "./components/jsx/ArchiveTeacher";
import { ToastContainer } from "react-toastify";
import RequestTeacher from "./components/forms/RequestTeacher";
import RequestStudent from "./components/forms/RequestStudent";
import RateTeachers from "./components/forms/RateTeachers";
import AdminDeleteUser from "./components/forms/AdminDeleteUser";
import RequireSelection from "./RequireSelection";
import { useContext, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ApiConfig } from "./config/api.config";
import dayjs from "dayjs";

function AppContent() {
  dayjs.locale("hr");
  const { setActive, setSelected, selected } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveStatus = async () => {
      try {
        const response = await fetch(ApiConfig.API_URL + "/active", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          setActive(false);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setActive(data);
        console.log("dap");
        if (!data) setSelected(0);
      } catch (error) {
        setActive(false);
        setSelected(0);
        console.error("Error fetching active status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveStatus();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress /> {/* Display loading circle */}
      </div>
    ); // Show loading circle while teacher data is being fetched
  }

  return (
    <>
      <HeaderMain />

      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/teachers/:idKorisnika" element={<TeacherProfile />} />
        <Route
          path="/edit-user"
          element={
            <RequireLogin>
              <Profile />
            </RequireLogin>
          }
        />
        <Route path="/faqs" element={<Faqs />} />
        <Route
          path="/calendar"
          element={
            <RequireLogin>
              <RequireSelection>
                <CalendarUser />
              </RequireSelection>
            </RequireLogin>
          }
        />
        <Route
          path="/new-requests"
          element={
            <RequireLogin>
              <RequireSelection>
                {selected === 2 ? <RequestTeacher /> : <RequestStudent />}
              </RequireSelection>
            </RequireLogin>
          }
        />
        <Route
          path="/rate-teachers"
          element={
            <RequireLogin>
              <RequireSelection>
                <RateTeachers />
              </RequireSelection>
            </RequireLogin>
          }
        />
        <Route
          path="/archived-lessons"
          element={
            <RequireLogin>
              <RequireSelection>
                {selected === 2 ? <ArchiveTeacher /> : <ArchiveStudent />}
              </RequireSelection>
            </RequireLogin>
          }
        />
        <Route
          path="/admin-deleteUser"
          element={
            <RequireLogin>
              <RequireSelection>
                <AdminDeleteUser />
              </RequireSelection>
            </RequireLogin>
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
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
