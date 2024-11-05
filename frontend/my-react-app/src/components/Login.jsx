import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [pVisible, setpVisible] = useState(false);
  const togglePassword = () => {
    setpVisible(!pVisible);
  };

  return (
    <>
      <div className="login">
        <form className="template">
          <h3 id="text">Log in</h3>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
            ></input>

            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={pVisible ? "text" : "password"}
                placeholder="Enter password"
                className="form-control"
              ></input>
              <button
                type="button"
                className="toggle-password"
                onClick={togglePassword}
              >
                {pVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <br></br>
          <div className="d-grid">
            <button className="btn btn-primary">Log in</button>
          </div>
          <br></br>
          <p id="option">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
