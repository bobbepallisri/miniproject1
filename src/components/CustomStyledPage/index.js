import React, { useState } from "react";
import useGenerativeAI from "../generative_ai";
import QuestionForm from "../QuestionForm";
import "./index.css";

const CustomStyledPage = () => {
  const [userInput, setUserInput] = useState("");
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const { mcq, error } = useGenerativeAI(userInput);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleGenerateMCQs = () => {
    setShowQuestionForm(true);
  };

  return (
    <div className="container">
      <header className="header">
        <img
          className="logo"
          src="https://res.cloudinary.com/dlkovvlud/image/upload/v1710153103/Screenshot_2024-03-02_152204_d5yncr.png"
          alt="Icon"
        />
        <h1 className="title">QuestBot</h1>
      </header>
      <main className="main">
        <section className="hero">
          <h2 className="hero-title">Generate Multiple Choice Questions</h2>
          <p className="hero-description">
            Input your text and let QuestBot generate multiple choice
            questions for you!
          </p>
          <div className="user-input">
            <input
              className="chat-input"
              placeholder="Enter your text here..."
              type="text"
              value={userInput}
              onChange={handleInputChange}
            />
            <button className="generate-button" onClick={handleGenerateMCQs}>
              Generate MCQs
            </button>
          </div>
        </section>
        {showQuestionForm && <QuestionForm mcq={mcq} />}
        {error && <p className="error">Error: {error}</p>}
      </main>
      <footer className="footer">
        <p>&copy; 2024 QuestBot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CustomStyledPage;
