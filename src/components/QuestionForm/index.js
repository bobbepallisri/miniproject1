import React, { useState } from "react";

import "./index.css";

const QuestionForm = ({ mcq }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(0); // State to track the score
  const [incorrectAnswers, setIncorrectAnswers] = useState(0); // State to track incorrect answers

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleOptionSelect = (optionKey) => {
    setUserResponses({ ...userResponses, [currentQuestionIndex]: optionKey });
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    let incorrect = 0;

    Object.entries(userResponses).forEach(([questionIndex, userAnswer]) => {
      const correctAnswer = mcq[questionIndex].answer;
      if (userAnswer === correctAnswer) {
        correctAnswers++;
      } else {
        incorrect++;
      }
    });

    setScore(correctAnswers);
    setIncorrectAnswers(incorrect);
  };

  if (!mcq || mcq.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = mcq[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mcq.length - 1;
  const isAllQuestionsAnswered =
    Object.keys(userResponses).length === mcq.length;

  return (
    <div>
      {currentQuestion && (
        <div className="bg">
          <p className="questionn">{currentQuestion.question}</p>
          <ul>
            {Object.entries(currentQuestion).map(([key, value], index) => {
              if (index === 0 || key === "answer" || key === "question")
                return null;
              return (
                <li key={index}>
                  <input
                    type="radio"
                    id={`option-${key}`}
                    name={`question-${currentQuestionIndex}`}
                    value={key}
                    onChange={() => handleOptionSelect(key)}
                    checked={userResponses[currentQuestionIndex] === key}
                  />
                  <label htmlFor={`option-${key}`}>{value}</label>
                </li>
              );
            })}
          </ul>
          {isLastQuestion && isAllQuestionsAnswered ? (
            <div>
              <button onClick={handleSubmit}>Submit</button>
              {score !== undefined && incorrectAnswers !== undefined && (
                <div>
                  <p>Score: {score}</p>
                  <p>Incorrect Answers: {incorrectAnswers}</p>
                </div>
              )}
            </div>
          ) : (
            <button className="btn" onClick={handleNextQuestion}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
