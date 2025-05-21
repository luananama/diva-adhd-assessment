/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const AssessmentContext = createContext();

export function AssessmentProvider({ children }) {
  const [answers, setAnswers] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("adhd-assessment-answers");
      return saved
        ? JSON.parse(saved)
        : {
            patientInfo: {
              name: "",
              birthDate: "",
              gender: "", // "male", "female", or "other"
              interviewDate: "",
              doctorName: "",
              patientNumber: "",
            },
          };
    }
    return {
      patientInfo: {
        name: "",
        birthDate: "",
        gender: "", // "male", "female", or "other"
        interviewDate: "",
        doctorName: "",
        patientNumber: "",
      },
    };
  });

  useEffect(() => {
    sessionStorage.setItem("adhd-assessment-answers", JSON.stringify(answers));
  }, [answers]);

  const updateAnswers = (section, questionId, answerObject) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [questionId]: {
          ...(prev[section]?.[questionId] || {}),
          ...answerObject,
          timestamp: new Date().toISOString(),
        },
      },
    }));
  };

  const updatePatientInfo = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        [field]: value,
      },
    }));
  };

  const clearAssessment = () => {
    setAnswers({
      patientInfo: {
        name: "",
        age: "",
        gender: "",
        occupation: "",
      },
    });
    sessionStorage.removeItem("adhd-assessment-answers");
  };

  return (
    <AssessmentContext.Provider
      value={{
        answers,
        updateAnswers,
        updatePatientInfo,
        clearAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export const useAssessment = () => useContext(AssessmentContext);
