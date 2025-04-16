/* eslint-disable react/prop-types */
// src/contexts/AssessmentContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AssessmentContext = createContext();

export function AssessmentProvider({ children }) {
  const [answers, setAnswers] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("adhd-assessment-answers");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Persist to localStorage whenever answers change
  useEffect(() => {
    localStorage.setItem("adhd-assessment-answers", JSON.stringify(answers));
  }, [answers]);

  const updateAnswers = (section, questionId, value, context = {}) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [questionId]: {
          value,
          timestamp: new Date().toISOString(),
          ...context,
        },
      },
    }));
  };

  const clearAssessment = () => {
    setAnswers({});
    localStorage.removeItem("adhd-assessment-answers");
  };

  return (
    <AssessmentContext.Provider
      value={{ answers, updateAnswers, clearAssessment }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export const useAssessment = () => useContext(AssessmentContext);
