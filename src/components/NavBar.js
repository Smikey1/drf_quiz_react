import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";
import axios from 'axios'; // Import the Axios library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavBar() {
  const [click, setClick] = useState(false);
  const token = window.localStorage.getItem('token');

  const isAuthenticated = token !== null;

  // Define the Base URL
  const baseUrl = 'https://drf-quiz-api.onrender.com';

  // Define the data to send in the request body
  const logOutData = {};

  const success_toast = message => { toast(message) };
  const error_toast = message => { toast.error(message) };
  const handleClick = () => setClick(!click);

  const handleLogOut = () => {
    axios.post(`${baseUrl}/user/logout`, logOutData)
      .then((res) => {
        if (res.data.success == true) {
          success_toast(res.data.message)
          window.localStorage.clear();
          window.location.href = "/";
        } else {
          error_toast(res.data.message);
        }
      })
      .catch(err => {
        console.log("Error:", err)
      });
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>Valearnis Quiz</span>
            <span className="icon">
              <CodeIcon />
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {isAuthenticated ? ( // Check if the user is authenticated
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Play Quiz
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/profile"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/view-score"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Score
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-links" href={`${baseUrl}/admin`} target="_blank">Django Admin</a>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </NavLink>
                </li>
              </>
            ) : ( // User is not authenticated
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/register"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
