/* eslint-disable react/prop-types */
import styled from "styled-components";
import StyledCheckbox from "../ui/StyledCheckbox";
import { useAssessment } from "../../contexts/AssessmentContext";
import useToggleArrayValue from "../../hooks/useToggleArrayValue";

const QuestionBox = styled.div`
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 90%;
  max-width: 1200px;
  margin-bottom: 20px;
`;

const QuestionNumberBox = styled.div`
  background-color: var(--color-primary);
  color: var(--color-white);
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
  color: var(--color-gray-900);
  margin-bottom: 15px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ColumnHeader = styled.h3`
  font-size: 1rem;
  color: var(--color-gray-900);
  margin-top: 30px;
  margin-bottom: 20px;
`;

const AnswerOption = styled.label`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  color: var(--color-gray-800);

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
  color: var(--color-gray-900);

  label {
    margin-bottom: 5px;
    font-size: 1rem;
  }

  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--color-gray-300);
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
    resize: vertical;
    min-height: 50px;
    max-height: 200px;
    color: var(--color-gray-800);

    &::placeholder {
      color: var(--color-gray-600); /* or another subtle gray */
      opacity: 1; /* Make sure it's fully visible */
    }
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
  border: 1px solid var(--color-gray-200);
  padding: 10px 10px 5px 10px;
  margin-top: auto; /* Push to the bottom */
  border-radius: 8px;
  background-color: var(--color-gray-100);
  position: relative;
`;

const QuestionCard = ({ question, sectionNumber }) => {
  const { answers, updateAnswers } = useAssessment();
  const sectionKey = `section${sectionNumber}`;

  const toggleArrayValue = useToggleArrayValue();

  const updateSymptom = ({
    prevAnswer = {},
    checkboxValue,
    textValue,
    context = {},
  }) => {
    const value = checkboxValue ?? prevAnswer.value ?? [];
    const other = textValue ?? prevAnswer.other ?? "";
    const symptomPresent = value.length > 0 || other.trim().length > 0;

    return {
      value,
      other,
      symptomPresent,
      ...context,
    };
  };

  const handleCheckbox = (questionId, selectedIndex, context = {}) => {
    const prevAnswer = answers[sectionKey]?.[questionId] || {};
    const newValue = toggleArrayValue(prevAnswer.value, selectedIndex);

    const updatedAnswer = updateSymptom({
      prevAnswer,
      checkboxValue: newValue,
      context: {
        ...context,
        questionText: question.questionText,
        summaryText: question.summaryText,
        optionText: context.optionText,
      },
    });

    updateAnswers(sectionKey, questionId, updatedAnswer);
  };

  const handleTextInput = (questionId, value, context = {}) => {
    const prevAnswer = answers[sectionKey]?.[questionId] || {};

    const updatedAnswer = updateSymptom({
      prevAnswer,
      textValue: value,
      context: {
        ...context,
        questionText: question.questionText,
        summaryText: question.summaryText,
      },
    });

    updateAnswers(sectionKey, questionId, updatedAnswer);
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

        {/* text input for "other examples" */}
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

        {/* symptom present checkbox (read-only for now) */}
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
