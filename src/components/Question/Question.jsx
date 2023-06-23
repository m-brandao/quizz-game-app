import React, { useState } from 'react';

const Question = ({ question, handleAnswer }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAnswer(selectedOption);
    };

    return (
        <div>
            <h3>{question.questionText}</h3>
            <form onSubmit={handleSubmit}>
                {question.options.map(([id, option]) => (
                    <label key={id}>
                        <input
                            type="radio"
                            name={`question${question.id}`}
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleChange}
                        />
                        {option}
                    </label>
                ))}
                <button type="submit">Next</button>
            </form>
        </div>
    );
};

export default Question;
