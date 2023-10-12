import React, { useState, useEffect } from 'react';
import QuizSelectionDialog from '../dialog/QuizSelectionDialog';
import '../Pages/Home.css';
import '../dialog/QuizSelectionDialog.css';
import axios from 'axios';
import SingleTypeQuestion from '../components/SingleTypeQuestion';
import MultipleTypeQuestion from '../components/MultipleTypeQuestion'; // Import the MultipleTypeQuestion component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const [quizType, setQuizType] = useState(null);
    const [quizQuestion, setQuizQuestion] = useState([]);

    const success_toast = message => { toast(message) };

    const handleSelectQuizType = (type) => {
        setQuizType(type);
    };

    useEffect(() => {
        const baseUrl = 'https://drf-quiz-api.onrender.com/question';

        axios.get(baseUrl)
            .then((res) => {
                if (res.data.success) {
                    if (res.data.data.length === 0) {
                        setQuizQuestion([]);
                    } else {
                        setQuizQuestion(res.data.data);
                    }
                } else {
                    setQuizQuestion([]);
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }, []);

    const quizData = quizQuestion.map((item) => {
        const options = item.options.map((option) => option.answer_text);
        const answer = item.options.findIndex((option) => option.is_correct) + 1;
        return {
            category: item.category.category_name,
            question: item.question_text,
            options: options,
            answer: [answer], // Wrap the answer in an array
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
                result.multipleCorrectQuestionType.push({
                    category: item.category.category_name,
                    question: item.question_text,
                    options: item.options.map((option) => option.answer_text),
                    mark: item.mark,
                    answer: correctAnswerIndices,
                });
            } else {
                const correctAnswerIndex = correctAnswerIndices[0];
                result.singleCorrectQuestionType.push({
                    category: item.category.category_name,
                    question: item.question_text,
                    options: item.options.map((option) => option.answer_text),
                    mark: item.mark,
                    answer: [correctAnswerIndex], // Wrap the answer in an array
                });
            }

            return result;
        },
        { singleCorrectQuestionType: [], multipleCorrectQuestionType: [] }
    );

    let renderComponent;
    if (quizType === 'S') {
        if (splitData.singleCorrectQuestionType.length > 0) {
            renderComponent = <SingleTypeQuestion data={splitData.singleCorrectQuestionType} />;
        } else {
            renderComponent = null
            success_toast("Single Types Question Not Available")
        }
    } else if (quizType === 'M') {
        if (splitData.multipleCorrectQuestionType.length > 0) {
            renderComponent = <MultipleTypeQuestion data={splitData.multipleCorrectQuestionType} />;
        } else {
            renderComponent = null
            success_toast("Multiple Types Question Not Available")
        }
    } else {
        renderComponent = null
    }

    return (
        <>
            <ToastContainer />
            <div>
                <p className="heading-txt">Hira Datta Dhakal: Quiz APP</p>
                <div className="container">
                    <div className="quiz-type-container">
                        {renderComponent === null && (
                            <QuizSelectionDialog onSelectQuizType={handleSelectQuizType} />
                        )}
                    </div>
                    {renderComponent}
                </div>
            </div>
        </>
    );
}

export default Home;
