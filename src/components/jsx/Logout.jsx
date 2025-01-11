import { useEffect } from "react";
import { ApiConfig } from "../../config/api.config";

function handleLogout() {
  localStorage.removeItem("currentTeacher");
  localStorage.removeItem("currentStudent");
  localStorage.removeItem("currentUser");
}

function Login() {
  useEffect(() => {
    handleLogout();
    // Preusmjerava korisnika na URL za login s konfiguracije API-ja
    window.location.replace(ApiConfig.API_URL + "/logout");
  }, []); // Prazna lista ovisnosti znači da se useEffect poziva samo jednom, nakon što je komponenta montirana

  return null; // Komponenta ne prikazuje ništa (jer samo preusmjerava korisnika)
}

export default Login;
