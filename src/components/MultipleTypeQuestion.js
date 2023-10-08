import React, { useState } from 'react';
import QuizResultDialog from '../components/QuizResultDialog';
import './QuizPage.css';
import './QuizSelectionDialog.css';
import { ToastContainer, toast } from 'react-toastify';

function evaluateMultipleChoice(questionData, selectedOptions) {
    const correctAnswerIndices = questionData.answer;
    const correctChoices = correctAnswerIndices.map(index => questionData.options[index - 1]);
    const userSelectedChoices = selectedOptions.map(index => questionData.options[index - 1]);

    const numCorrectSelected = correctChoices.filter(choice => userSelectedChoices.includes(choice)).length;
    const numIncorrectSelected = selectedOptions.length - numCorrectSelected;

    let message = '';
    let score = 0;

    if (numCorrectSelected === 0) {
        message = 'All answers are incorrect';
    } else if (numCorrectSelected === correctAnswerIndices.length) {
        message = 'All answers are correct';
        score = questionData.mark;
    } else if (numCorrectSelected === 1) {
        message = '1 answer is correct';
        score = questionData.mark / 4;
    } else {
        message = `${numCorrectSelected} answers are correct`;
        score = (numCorrectSelected / correctAnswerIndices.length) * questionData.mark;
    }

    if (numIncorrectSelected > 0) {
        message += `, ${numIncorrectSelected} answer(s) are incorrect`;
    }

    return {
        score,
        message,
    };
}

function MultipleTypeQuestion(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOptions, setClickedOptions] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const successToast = message => { toast.success(message) };
    const errorToast = message => { toast.error(message) };

    const changeQuestion = () => {
        const isCorrect = checkCorrectAnswers();
        if (isCorrect) {
            updateScore();
        } else {
            errorToast("Wrong Answer");
        }

        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOptions([]);
        } else {
            setShowResult(true);
        }
    };

    const toggleOption = (optionIndex) => {
        // Clone the existing array of selected options
        const updatedOptions = [...clickedOptions];

        // Check if the optionIndex is already in the array
        const index = updatedOptions.indexOf(optionIndex);

        if (index === -1) {
            // If not in the array, add it
            updatedOptions.push(optionIndex);
        } else {
            updatedOptions.splice(index, 1);
        }
        // Update the state with the updated array of selected options
        setClickedOptions(updatedOptions);
    };


    const checkCorrectAnswers = () => {
        const selectedOptions = clickedOptions.map(optionIndex => quizData[currentQuestion].options[optionIndex - 1]);
        const correctOptions = quizData[currentQuestion].answer.map(answerIndex => quizData[currentQuestion].options[answerIndex - 1]);

        // Compare selectedOptions with correctOptions
        console.log("SO==>", selectedOptions)
        console.log("CO==>", correctOptions)
        console.log("Test 1 left equal -->", selectedOptions.length === correctOptions.length)
        console.log("Test 2 after equal -->", selectedOptions.every(option => correctOptions.includes(option)))
        console.log("Test 3 final -->", selectedOptions.length === correctOptions.length &&
            selectedOptions.every(option => correctOptions.includes(option)))

        return selectedOptions.length === correctOptions.length &&
            selectedOptions.every(option => correctOptions.includes(option));
    };

    const updateScore = () => {
        const { score, message } = evaluateMultipleChoice(quizData[currentQuestion], clickedOptions);
        setScore(score);
        successToast(message);
    };

    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOptions([]);
        setScore(0);
    };

    const quizData = props.data;

    return (
        <>
            <ToastContainer />
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
                                        className={`option-btn ${clickedOptions.includes(i + 1) ? 'checked' : ''}`}
                                        key={i}
                                        onClick={() => toggleOption(i + 1)}
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

export default MultipleTypeQuestion;
