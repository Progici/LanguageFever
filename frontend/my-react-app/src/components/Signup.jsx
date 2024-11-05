import { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

function Signup() {
  const [pVisible, setpVisible] = useState(false);
  const togglePassword = () => {
    setpVisible(!pVisible);
  };

  return (
    <>
      <div className="signup">
        <form className="template">
          <h3 id="text">Sign up</h3>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              className="form-control"
            ></input>

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              className="form-control"
            ></input>

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
            <button className="btn btn-primary">Sign up</button>
          </div>
          <br></br>
          <p id="option">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
