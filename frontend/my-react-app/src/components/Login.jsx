import { useEffect } from "react";
import { ApiConfig } from "../config/api.config";

function Login() {
  useEffect(() => {
    // Preusmjerava korisnika na URL za login s konfiguracije API-ja
    window.location.replace(ApiConfig.API_URL + "/login");
  }, []); // Prazna lista ovisnosti znači da se useEffect poziva samo jednom, nakon što je komponenta montirana

  return null; // Komponenta ne prikazuje ništa (jer samo preusmjerava korisnika)
}

export default Login;
