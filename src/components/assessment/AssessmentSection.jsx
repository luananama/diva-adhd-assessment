import { useParams, useNavigate } from "react-router-dom";
import questionsData from "../../assets/questions.json";
import { useAssessment } from "../../contexts/AssessmentContext";
import styled from "styled-components";
import QuestionCard from "../ui/QuestionCard";

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 20px;
`;

const AssessmentSection = () => {
  const { sectionNumber } = useParams();
  const navigate = useNavigate();
  const { answers, updateAnswers } = useAssessment();

  const currentSection = questionsData.sections.find(
    (section) => section.sectionNumber === parseInt(sectionNumber)
  );

  const handleAnswer = (questionId, value, context = {}) => {
    updateAnswers(`section${sectionNumber}`, questionId, value, {
      questionText: context.questionText,
      summaryText: context.summaryText,
      optionText: context.optionText || "",
    });
  };

  const handleNext = () => {
    const nextSection = parseInt(sectionNumber) + 1;
    const hasMoreSections = questionsData.sections.some(
      (section) => section.sectionNumber === nextSection
    );
    if (hasMoreSections) {
      navigate(`/section/${nextSection}`);
    } else {
      navigate("/summary"); // Navigate to summary when done
    }
  };

  if (!currentSection) return <div>Section not found</div>;

  const currentAnswers = answers[`section${sectionNumber}`] || {};
  const totalAnswered = Object.keys(currentAnswers).length;
  const totalExpected = currentSection.questions.length * 2; // adult + child

  return (
    <SectionContainer>
      <h2>Section {sectionNumber}</h2>

      {currentSection.questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          sectionNumber={sectionNumber}
          currentAnswers={currentAnswers}
          handleAnswer={handleAnswer}
        />
      ))}

      <button onClick={handleNext} disabled={totalAnswered < totalExpected}>
        Next
      </button>
    </SectionContainer>
  );
};

export default AssessmentSection;
