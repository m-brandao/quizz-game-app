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
        <section className='uk-container'>
            <div className=''>
                <h3>{question.questionText}</h3>
                <form onSubmit={handleSubmit}>
                    {question.options.map(([id, option]) => (
                        <label key={id} className='answers'>
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
        </section>
    );
};

export default Question;
