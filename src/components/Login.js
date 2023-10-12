import React, { Component, useState } from "react";
import axios from 'axios'; // Import the Axios library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function handleSubmit(e) {
        e.preventDefault();

        // Define the Base URL
        const baseUrl = 'https://drf-quiz-api.onrender.com/user';

        // Define the data to send in the request body
        const loginData = {
            "username": username,
            "password": password
        };

        const success_toast = message => { toast.success(message) };
        const error_toast = message => { toast.error(message) };

        axios.post(`${baseUrl}/login`, loginData)
            .then((res) => {
                console.log(res.data, "userRegister");
                if (res.data.success == true) {
                    success_toast(res.data.message);
                    window.location.href = "/";
                    window.localStorage.setItem("token", res.data.data.token.access_token);
                    window.localStorage.setItem("loggedIn", true);
                } else {
                    error_toast(res.data.message);
                }
            })
            .catch(err => {
                console.log("Error:", err)
            });

    }

    return (
        <div className="auth-wrapper">
            <ToastContainer />
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Sign In</h3>

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
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Remember me
                            </label>
                        </div>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        Doesn't have an account? <NavLink
                            exact
                            to="/register"
                        >
                            Sign Up Here?
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
}