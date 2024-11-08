import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
