/* eslint-disable react/prop-types */
import styled from "styled-components";
import StyledCheckbox from "../ui/StyledCheckbox";
import { useAssessment } from "../../contexts/AssessmentContext";
import useToggleArrayValue from "../../hooks/useToggleArrayValue";

const QuestionBox = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 90%;
  max-width: 1200px;
  margin-bottom: 20px;
`;

const QuestionNumberBox = styled.div`
  background-color: #5bc0be;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 20px;
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`;

const QuestionText = styled.p`
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 15px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ColumnHeader = styled.h3`
  font-size: 1rem;
  color: #555;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const AnswerOption = styled.label`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  color: #555;

  textarea {
    width: 100%;
    min-height: 60px;
    margin-top: 8px;
  }
`;

const OtherExample = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #555;

  label {
    margin-bottom: 5px;
    font-size: 1rem;
  }

  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
    resize: vertical;
    min-height: 50px;
    max-height: 200px;
    color: #555;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SymptomLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

// wrapper for the entire symptom present section
const SymptomCheckBoxWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px 10px 5px 10px;
  margin-top: auto; /* Push to the bottom */
  border-radius: 8px;
  background-color: #f9f9f9;
  position: relative;
`;

const QuestionCard = ({ question, sectionNumber }) => {
  const { answers, updateAnswers } = useAssessment();
  const sectionKey = `section${sectionNumber}`;

  const toggleArrayValue = useToggleArrayValue();

  const handleCheckbox = (questionId, selectedIndex, context = {}) => {
    const rawValue = answers[sectionKey]?.[questionId]?.value;
    // toggle checkbox - add new value if it doesn't exist, remove it if it does
    const newValue = toggleArrayValue(rawValue, selectedIndex);

    updateAnswers(sectionKey, questionId, newValue, {
      ...context,
      symptomPresent: newValue.length > 0,
      other: answers[sectionKey]?.[questionId]?.other || "",
    });
  };

  const handleTextInput = (questionId, value, context = {}) => {
    const prevValue = answers[sectionKey]?.[questionId]?.value || [];

    updateAnswers(sectionKey, questionId, prevValue, {
      ...context,
      other: value,
      symptomPresent: prevValue.length > 0,
    });
  };

  // builds the answers for either the adulthood or childhood part of a question
  const renderGroup = (label, options, groupKey) => {
    const questionId = `${groupKey}-${question.id}`;
    const current = answers[sectionKey]?.[questionId] || {};

    return (
      <Column>
        <ColumnHeader>{label}</ColumnHeader>

        {options.map((option, index) => {
          const checked =
            Array.isArray(current.value) && current.value.includes(index);

          return (
            <AnswerOption key={`${questionId}-${index}`}>
              <StyledCheckbox
                name={`${questionId}-option${index}`}
                checked={checked}
                onChange={() =>
                  handleCheckbox(questionId, index, {
                    questionText: question.questionText,
                    summaryText: question.summaryText,
                    optionText: option,
                  })
                }
              />
              {option}
            </AnswerOption>
          );
        })}

        {/* Text input for "Other" */}
        <OtherExample>
          <label>Altele:</label>
          <textarea
            placeholder="Exemplu personal..."
            value={current.other || ""}
            onChange={(e) =>
              handleTextInput(questionId, e.target.value, {
                questionText: question.questionText,
                summaryText: question.summaryText,
              })
            }
          />
        </OtherExample>

        {/* Symptom present checkbox (read-only for now) */}
        <SymptomCheckBoxWrapper>
          <SymptomLabel>
            <StyledCheckbox
              checked={current.symptomPresent || false}
              disabled
              label="Simptom prezent"
              name={`${questionId}-symptom-present`}
            />
          </SymptomLabel>
        </SymptomCheckBoxWrapper>
      </Column>
    );
  };

  return (
    <QuestionBox>
      <div style={{ display: "flex", alignItems: "center" }}>
        <QuestionNumberBox>{question.questionNumber}</QuestionNumberBox>
        <QuestionText>{question.questionText}</QuestionText>
      </div>

      <Row>
        {renderGroup(
          "Exemple pentru perioada maturităţii:",
          question.adulthoodOptions,
          "adult"
        )}
        {renderGroup(
          "Exemple pentru perioada copilăriei:",
          question.childhoodOptions,
          "child"
        )}
      </Row>
    </QuestionBox>
  );
};

export default QuestionCard;
