import React, { Component, useState } from "react";
import axios from 'axios'; // Import the Axios library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";

export default function SignUp() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    // Define the Base URL
    const baseUrl = 'https://drf-quiz-api.onrender.com/user';

    // Define the data to send in the request body
    const registerData = {
        "first_name": fname,
        "last_name": lname,
        "username": username,
        "email": email,
        "password": password,
        "confirm_password": confirmPassword
    };

    const success_toast = message => { toast(message) };
    const error_toast = message => { toast.error(message) };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${baseUrl}/register`, registerData)
            .then((res) => {
                if (res.data.success == true) {
                    success_toast(res.data.message)
                    window.location.href = "/login";
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.log("Error:", err)
            });
    };

    return (
        <div className="auth-wrapper">
            <ToastContainer />
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>

                    <div className="mb-3">
                        <label>First name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First name"
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last name"
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Re-Enter password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                       Already registered  <NavLink
                            exact
                            to="/login"
                        >
                            Sign In?
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
}