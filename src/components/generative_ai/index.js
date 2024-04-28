import { useState, useEffect } from "react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyAPw2KFI4sgSOuDNDqAje_KMLUhgW8gUIE";

const useGenerativeAI = (userInput) => {
  const [error, setError] = useState(null);
  const [mcq, setMcq] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    async function generateMCQs() {
      try {
        if (!userInput.trim()) {
          setError("Please provide input to generate MCQs.");
          return;
        }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        };

        const safetySettings = [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ];

        const parts = [
          {
            text: `input: ${userInput} convert into mcq questions given response like this  [{
              no:1,
              question:value,
              a:value,
              b:value,
              c:value,
              d:value,
              answer:value_name
            }]`,
          },
          { text: "output: " },
        ];

        const result = await model.generateContent({ contents: [{ role: "user", parts }], generationConfig, safetySettings });
        const response = result.response;

        setError(null);
        const parsedResponse = JSON.parse(response.text());
        setMcq(parsedResponse);
      } catch (error) {
        setError("Error generating MCQs. Please try again later.");
      }
    }

    generateMCQs();
  }, [userInput]);

  return { error, mcq, userResponses, score, submitted, currentQuestion };
};

export default useGenerativeAI;
