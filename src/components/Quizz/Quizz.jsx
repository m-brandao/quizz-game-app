import React, { useState } from 'react';
import Question from '../Question/Question';
import quizzData from '../QuizzData/quizzData';

const Quizz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnswer = (selectedOption) => {
        const currentAnswer = quizzData[currentQuestion].correctAnswer;
        if (selectedOption === currentAnswer) {
            setScore(score + 5);
        }

        if (currentQuestion < quizzData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsLoading(true);
            // Simulating a loading delay before showing the final score
            setTimeout(() => {
                setIsLoading(false);
                setShowScore(true);
            }, 2000);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    if (isLoading) {
        return <div>Calculating your score...</div>;
    }

    if (showScore) {
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
