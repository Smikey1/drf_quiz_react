import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Score.css'
import ListView from '../components/ListView.js';
import CustomLoader  from '../components/CustomLoader.js';

export const Score = () => {
  const [scoreData, setScoreData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Define the Base URL
    const baseUrl = 'http://127.0.0.1:8000/';

    const token = window.localStorage.getItem('token');

    // Define the headers with the Authorization header containing the bearer token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`${baseUrl}/user/profile`, { headers })
      .then((res) => {
        console.error(`Data-->${res.data.data}`);
        if (res.data.success === true) {
          setProfileData(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(`Error-->${err}`);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });



    axios
      .get(`${baseUrl}/score`, { headers })
      .then((res) => {
        console.error(`Data-->${res.data.data}`);
        if (res.data.success === true) {
          setScoreData(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
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
  const percentScore = (totalUserScore / fullScore)*100;

  let setScoreCount = isLoading == true ? "" : scoreCount
  let setAvegraceScore = isLoading == true ? "" : `${totalUserScore}/${fullScore} OR ${percentScore.toFixed(1)}%`

  return (
    <>
      <p className="heading-txt"> Overall Score Report </p>
      <div className="auth-inner">
        <h3>Live Score</h3>
        {/* Additional Info */}
        <div
          className="d-flex justify-content-center align-items-center rounded-3 p-2 mb-2"
          style={{ marginLeft: "30px", backgroundColor: "#efefef", width: "300px", padding: "100px", textAlign: "center" }}
        >
          <div style={{ paddingLeft: "5px", marginRight: "20px" }}>
            <p className="small mb-1" style={{ fontSize: "15px", color: "#1c8ef9", fontWeight: "bold" }}>No of Quiz Played</p>
            <p className="mb-0" style={{ fontSize: "15px", color: "#1f5156", fontWeight: "bold" }}>{setScoreCount}</p>
          </div>

          <div>
            <p className="small mb-1" style={{ fontSize: "15px", color: "#1c8ef9", fontWeight: "bold" }}>Score Percentage</p>
            <p className="mb-0" style={{ fontSize: "15px", color: "#1f5156", fontWeight: "bold" }}>{ percentScore.toString() == "NaN" ? "" : setAvegraceScore }</p>
          </div>
        </div>

        {isLoading ? (
          <CustomLoader />
        ) : (
          <ul className="list-view-container">
            {scoreData.map((item, index) => (
              <ListView
                key={index}
                avatarSrc={profileData.profile_url}
                title={`${profileData.first_name} ${profileData.last_name}`}
                description={profileData.email}
                number={item.score_value}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
