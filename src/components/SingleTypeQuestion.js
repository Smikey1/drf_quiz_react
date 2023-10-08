import React, { useState } from 'react';
// import { QuizData } from '../Data/QuizData';
import QuizResultDialog from '../components/QuizResultDialog';
import './QuizPage.css';
import './QuizSelectionDialog.css';
import { ToastContainer, toast } from 'react-toastify';

function SingleTypeQuestion(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const success_toast = message => { toast.success(message) };
    const error_toast = message => { toast.error(message) };

    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
            setShowResult(true);
        }
    };

    const updateScore = () => {
        if (clickedOption === quizData[currentQuestion].answer[0]) {
            setScore(score + 1);
            success_toast("Right Answer!!")
        } else {
            error_toast("Wrong Answer")
        }
    };

    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    };

    // Convert JSON data to the desired format
    const quizData = props.data

    return (
        <>
        <ToastContainer/>
            <div className="quiz-container">
                {showResult ? (
                    <QuizResultDialog score={score} totalQuestion={quizData.length} tryAgain={resetAll} />
                ) : (
                    <>
                        <h4 style={{ textAlign: 'right', color: "blue", marginLeft: "10px" }}>Score: {score}</h4>
                        <h4 style={{ textAlign: 'left', color: "black", marginLeft: "10px" }}>Category: <span style={{ color: "blue" }}>{quizData[currentQuestion].category}</span></h4>
                        <div className="question">
                            <span id="question-number">{currentQuestion + 1}{")"} </span>
                            <span id="question-txt">{quizData[currentQuestion].question}</span>
                        </div>
                        <div className="option-container">
                            <h3 style={{ textAlign: 'left', color: "black", marginLeft: "10px" }}>Choose Option</h3>
                            {quizData[currentQuestion].options.map((option, i) => {
                                return (
                                    <button
                                        className={`option-btn ${clickedOption === i + 1 ? 'checked' : ''}`}
                                        key={i}
                                        onClick={() => setClickedOption(i + 1)}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                        <input type="button" value="Submit" id="next-button" onClick={changeQuestion} />
                    </>
                )}
            </div>
        </>
    );
}

export default SingleTypeQuestion;
