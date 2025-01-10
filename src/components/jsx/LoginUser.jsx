import { ApiConfig } from "../../config/api.config";
import "../css/LoginUser.css";

function LoginUser() {
  return (
    <>
      <div className="login">
        <div className="grid-container">
          <div className="item login-text">Prijava putem OAuth 2.0</div>
          <div className="item instructions">
            Izaberite jedan od načina prijave
          </div>
          <div className="item options">
            <a
              href={`${ApiConfig.API_URL}/oauth2/authorization/github`}
              id="option"
            >
              Github
            </a>
            <a
              href={`${ApiConfig.API_URL}/oauth2/authorization/google`}
              id="option"
            >
              Google
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
