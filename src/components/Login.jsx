import "./Login.css";

import { ApiConfig } from "../config/api.config";

function Login() {
  document.location = ApiConfig.API_URL + "/login";

  return "hej";
}

export default Login;
