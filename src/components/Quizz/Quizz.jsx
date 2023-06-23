import React, { useState, useEffect } from 'react';
import quizzData from '../QuizzData/quizzData';

const Quizz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [Question, setQuestion] = useState(null);

    useEffect(() => {
        // Dynamically import the Question component
        import('../Question/Question').then((module) => {
            setQuestion(module.default);
        });
    }, []);

    const handleAnswer = (selectedOption) => {
        const currentAnswer = quizzData[currentQuestion].correctAnswer;
        if (selectedOption === currentAnswer) {
            setScore(score + 5);
        }

        if (currentQuestion < quizzData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
    };

    if (!Question) {
        return <div>Loading...</div>;
    }

    if (currentQuestion === quizzData.length) {
        return (
            <div>
                <h2>Quiz Finished!</h2>
                <p>Your final score is: {score}</p>
                <button onClick={handleRestart}>Restart Quiz</button>
            </div>
        );
    }

    return (
        <Question
            question={quizzData[currentQuestion]}
            handleAnswer={handleAnswer}
        />
    );
};

export default Quizz;