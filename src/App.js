import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import QuizPage from "./components/QuizPage.js";
import { Profile } from "./Pages/Profile";
import { Score } from "./Pages/Score";
import { Contact } from "./Pages/Contact";
import NavBar from "./components/NavBar.js";

function App() {
  const token = window.localStorage.getItem("token");

  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              token ? <QuizPage /> : <Navigate to="/login" />
            }
          />

          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/view-score" element={token ? <Score /> : <Navigate to="/login" />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
