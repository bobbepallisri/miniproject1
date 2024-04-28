import React from "react";
import MCQOption from "./MCQOption";

function MCQQuestion({ mcq }) {
  return (
    <div className="mcq-container">
      {mcq.length > 0 && (
        <div key={mcq[currentQuestion].no} className="question">
          <p>{mcq[currentQuestion].question}</p>
          <div className="options">
            {["a", "b", "c", "d"].map((option) => (
              <MCQOption key={option} option={option} mcq={mcq} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MCQQuestion;
