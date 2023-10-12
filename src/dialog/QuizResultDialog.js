import React from 'react';
import '../dialog/QuizSelectionDialog.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import the Axios library

const QuizSelectionDialog = (props) => {

  const saveScore = () => {
    // Define the Base URL
    const baseUrl = 'https://drf-quiz-api.onrender.com/score';

    const token = window.localStorage.getItem('token');

    // Define the data to send in the request body
    const scoreData = {
      "score_value": props.score * 5
    };

    const success_toast = message => { toast.success(message) };
    const error_toast = message => { toast.error(message) };

    // Define the headers with the Authorization header containing the bearer token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios.post(`${baseUrl}-add`, scoreData, { headers })
      .then((res) => {
        console.log(res.data, "userRegister");
        if (res.data.success == true) {
          success_toast(res.data.message);
          window.location.href = "/";
        } else {
          error_toast(res.data.message);
        }
      })
      .catch(err => {
        console.log("Error:", err)
      });
  }

  return (
    <>
      <ToastContainer />
      <div className="quiz-selection-dialog">
        <h2 style={{ color: 'green' }}>Save Your Quiz Score</h2>
        {/* Message Container */}
        <div>
          <p>Your Score is: <span className="quiz-types">{props.score * 5}</span>/<span className="developer-name">{props.totalQuestion * 5}</span>.</p>
          <p>Total Question Played: <span className="quiz-types">{props.totalQuestion}</span></p>
          <p>Thank you for playing.</p>
          <p><span className="quiz-types">Good Luck !!</span></p>
        </div>
        <button onClick={saveScore}>Save Score</button>
      </div>
    </>

  );
};

export default QuizSelectionDialog;
