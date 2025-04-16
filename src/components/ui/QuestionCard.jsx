/* eslint-disable react/prop-types */
import styled from "styled-components";
import StyledCheckbox from "../ui/StyledCheckbox";

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
  align-items: center;
  margin-bottom: 10px;
  color: #555;

  input {
    margin-right: 8px;
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

const QuestionCard = ({
  question,
  sectionNumber,
  currentAnswers,
  handleAnswer,
}) => {
  return (
    <QuestionBox>
      <div style={{ display: "flex", alignItems: "center" }}>
        <QuestionNumberBox>{question.questionNumber}</QuestionNumberBox>
        <QuestionText>{question.questionText}</QuestionText>
      </div>

      <Row>
        <Column>
          <ColumnHeader>Exemple pentru perioada maturităţii:</ColumnHeader>
          {question.adulthoodOptions.map((option, index) => {
            const id = `adult-${question.id}`;
            const checked = currentAnswers[id]?.value === index;
            return (
              <AnswerOption key={`${id}-${index}`}>
                <StyledCheckbox
                  name={`section${sectionNumber}-adulthood-${question.id}-example${index}`}
                  onChange={() =>
                    handleAnswer(id, index, {
                      questionText: question.questionText,
                      summaryText: question.summaryText,
                      optionText: option,
                    })
                  }
                  checked={checked}
                />
                {option}
              </AnswerOption>
            );
          })}
        </Column>

        <Column>
          <ColumnHeader>Exemple pentru perioada copilăriei:</ColumnHeader>
          {question.childhoodOptions.map((option, index) => {
            const id = `child-${question.id}`;
            const checked = currentAnswers[id]?.value === index;
            return (
              <AnswerOption key={`${id}-${index}`}>
                <StyledCheckbox
                  name={`section${sectionNumber}-childhood-${question.id}-example${index}`}
                  onChange={() =>
                    handleAnswer(id, index, {
                      questionText: question.questionText,
                      summaryText: question.summaryText,
                      optionText: option,
                    })
                  }
                  checked={checked}
                />
                {option}
              </AnswerOption>
            );
          })}
        </Column>
      </Row>
    </QuestionBox>
  );
};

export default QuestionCard;
