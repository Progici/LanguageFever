import { useState } from "react";
import { Link } from "react-router-dom";
import "./ChooseUser.css";

function ChooseUser() {
  /*
  const [selectedRole, setSelectedRole] = useState(null);
  const handleChange = (role) => {
    setSelectedRole(role);
  };*/
  return (
    <>
      <div className="choose-user">
        <form className="template">
          <h3 id="text">Select your role</h3>
          <div className="role-btns">
            <Link to="/studentInfo">
              <button
              /*className={selectedRole === "student" ? "active" : ""}
              /*onclick={() => handleChange("student")}*/
              >
                Student
              </button>
            </Link>
            <Link to="/teacherInfo">
              <button
              /*className={selectedRole === "teacher" ? "active" : ""}
              /*onclick={() => handleChange("teacher")}*/
              >
                Teacher
              </button>
            </Link>
            <Link to="/">
              <button
              /*className={selectedRole === "admin" ? "active" : ""}
              onclick={() => handleChange("admin")}*/
              >
                Admin
              </button>
            </Link>
          </div>
          <br />
          {/*<div className="d-grid">
            <button className="btn btn-primary">Save changes</button>
          </div>
          <br />*/}
        </form>
      </div>
    </>
  );
}

export default ChooseUser;
