import React from "react";

function MCQOption({ option, mcq }) {
  return (
    <label>
      <input
        type="radio"
        name={`question_${mcq[currentQuestion].no}`}
        value={option}
        onChange={() => handleResponseChange(option)}
        disabled={submitted}
      />
      {mcq[currentQuestion][option]}
    </label>
  );
}

export default MCQOption;
