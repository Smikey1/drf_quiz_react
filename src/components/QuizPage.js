import React, { useState, useEffect } from 'react';
import QuizSelectionDialog from './QuizSelectionDialog';
import './QuizPage.css';
import './QuizSelectionDialog.css';
import axios from 'axios';
import SingleTypeQuestion from './SingleTypeQuestion';
import MultipleTypeQuestion from './MultipleTypeQuestion'; // Import the MultipleTypeQuestion component

function Quiz() {
    const [quizType, setQuizType] = useState(null);
    const [quizQuestion, setQuizQuestion] = useState([]);

    const handleSelectQuizType = (type) => {
        setQuizType(type);
    };

    useEffect(() => {
        const baseUrl = 'http://127.0.0.1:8000/question';

        axios.get(`${baseUrl}`)
            .then((res) => {
                if (res.data.success === true) {
                    setQuizQuestion(res.data.data);
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.error('Error:', err);
            })
    }, []);

    const quizData = quizQuestion.map((item) => {
        const options = item.options.map((option) => option.answer_text);
        const answer = item.options.findIndex((option) => option.is_correct) + 1;

        return {
            category: item.category.category_name,
            question: item.question_text,
            options: options,
            answer: [answer],
            mark: item.mark
        };
    });


    // Split the JSON data into two types
    const splitData = quizQuestion.reduce(
        (result, item) => {
            const correctAnswerIndices = item.options
                .map((option, index) => (option.is_correct ? index + 1 : -1))
                .filter((index) => index !== -1);

            if (correctAnswerIndices.length >= 2) {
                result.multipleCorrect.push({
                    category: item.category.category_name,
                    question: item.question_text,
                    options: item.options.map((option) => option.answer_text),
                    mark: item.mark,
                    answer: correctAnswerIndices,
                });
            } else {
                const correctAnswerIndex = correctAnswerIndices[0];
                result.singleCorrect.push({
                    category: item.category.category_name,
                    question: item.question_text,
                    options: item.options.map((option) => option.answer_text),
                    mark: item.mark,
                    answer: [correctAnswerIndex], // Wrap the answer in a list
                });
            }

            return result;
        },
        { singleCorrect: [], multipleCorrect: [] }
    );


    let renderComponent;

    if (quizType === 'S') {
        renderComponent = <SingleTypeQuestion data={splitData.singleCorrect} />;
    } else if (quizType === 'M') {
        renderComponent = <MultipleTypeQuestion data={splitData.multipleCorrect} />;
    } else {
        renderComponent = null; // Render nothing when quizType is neither 'S' nor 'M'
    }

    return (
        <>
            <div>
                <p className="heading-txt">Hira Datta Dhakal: Quiz APP</p>
                <div className="container">
                    <div className="quiz-type-container">
                        {quizType === null && (
                            <QuizSelectionDialog onSelectQuizType={handleSelectQuizType} />
                        )}
                    </div>
                    {renderComponent}
                </div>
            </div>
        </>
    );
}

export default Quiz;
