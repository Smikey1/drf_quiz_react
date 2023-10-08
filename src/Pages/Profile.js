import React, { useState, useEffect } from 'react';
import "./Profile.css";
import axios from 'axios';

export const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    // Define the Base URL
    const baseUrl = 'http://127.0.0.1:8000/';

    const token = window.localStorage.getItem('token');

    // Define the headers with the Authorization header containing the bearer token
    const headers = {
      Authorization: `Bearer ${token}`,
    };


    axios
      .get(`${baseUrl}/score`, { headers })
      .then((res) => {
        if (res.data.success === true) {
          setScoreData(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      })


    axios
      .get(`${baseUrl}/user/profile`, { headers })
      .then((res) => {
        if (res.data.success === true) {
          setProfileData(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      })
  }, []);

  // Calculate the length of the score data list
  const scoreCount = scoreData.length == 0 ? "" : scoreData.length;

  //
  const totalNumberOfQuestion = 5;
  const markOfEachQuestion = 5;

  // Calculate the sum of all scores
  const totalUserScore = scoreData.reduce((acc, item) => acc + item.score_value, 0);
  const fullScore = scoreCount * totalNumberOfQuestion * markOfEachQuestion;

  // Calculate the percent score
  const percentScore = (totalUserScore / fullScore) * 100;

  let setAvegraceScore = `${totalUserScore}/${fullScore} OR ${percentScore.toFixed(1)}%`



  return (
    <>
      <p className="heading-txt"> View Your Profile {profileData.first_name}! </p>
    <div className="profile-container">
      <div className="left-container ">
        <div className="d-flex align-items-center card mb-4">

          {/* PROFILE IMAGE */}
          <div className="d-flex justify-content-start card-body text-center">
            <img
              src={profileData.profile_url}
              alt="avatar"
              className="rounded-circle img-fluid"
              style={{ width: 100 }}
            />

            {/* Name and Email */}
            <div className="flex-grow-1 ms-3">
              <h5 className="mt-2">{`${profileData.first_name} ${profileData.last_name}`}</h5>
              <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>{profileData.email}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div
            className="d-flex justify-content-center align-items-center rounded-3 p-2 mb-2"
            style={{ backgroundColor: "#efefef", width: "300px", padding: "100px" }}
          >
            <div style={{ paddingLeft: "5px", marginRight: "20px" }}>
              <p className="small mb-1" style={{ fontSize: "15px", color: "#1c8ef9", fontWeight: "bold" }}>No of Quiz Played</p>
              <p className="mb-0" style={{ fontSize: "15px", color: "#1f5156", fontWeight: "bold" }}>{scoreCount}</p>
            </div>

            <div>
              <p className="small mb-1" style={{ fontSize: "15px", color: "#1c8ef9", fontWeight: "bold" }}>Average Score</p>
                <p className="mb-0" style={{ fontSize: "15px", color: "#1f5156", fontWeight: "bold" }}>{setAvegraceScore}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-container">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{`${profileData.first_name} ${profileData.last_name}`}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{profileData.email}</p>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Bio</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{profileData.bio}</p>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </>
  );
};
