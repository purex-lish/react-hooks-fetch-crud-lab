import React, { useState } from "react";

const NewQuestionForm = ({ onAddQuestion }) => {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newQuestion = {
      prompt,
      answers,
      correctIndex
    };

    onAddQuestion(newQuestion);

    // Reset the form
    setPrompt('');
    setAnswers(['', '', '', '']);
    setCorrectIndex(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            value={answer}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = e.target.value;
              setAnswers(newAnswers);
            }}
          />
        </label>
      ))}
      <label>
        Correct Answer Index:
        <input
          type="number"
          min="0"
          max="3"
          value={correctIndex}
          onChange={(e) => setCorrectIndex(parseInt(e.target.value, 10))}
        />
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
};

export default NewQuestionForm;

