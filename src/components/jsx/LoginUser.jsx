import "../css/LoginUser.css";

function LoginUser() {
  return (
    <>
      <div class="login">
        <div class="grid-container">
          <div class="item login-text">Prijava putem OAuth 2.0</div>
          <div class="item instructions">Izaberite jedan od načina prijave</div>
          <div class="item options">
            {/*<a href="/oauth2/authorization/github" id="option">*/}
            <a href="#" id="option">
              GitHub
            </a>
            {/*<a href="/oauth2/authorization/google" id="option">*/}
            <a href="#" id="option">
              Google
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
