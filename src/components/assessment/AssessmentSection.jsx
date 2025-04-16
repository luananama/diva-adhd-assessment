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
  const { answers } = useAssessment();

  const currentSection = questionsData.sections.find(
    (section) => section.sectionNumber === parseInt(sectionNumber)
  );

  //   const handleAnswer = (questionId, selectedIndex, context = {}) => {
  //     const sectionKey = `section${sectionNumber}`;
  //     const prev = answers[sectionKey]?.[questionId]?.value || [];

  //     const newValue = prev.includes(selectedIndex)
  //       ? prev.filter((i) => i !== selectedIndex)
  //       : [...prev, selectedIndex];

  //     updateAnswers(sectionKey, questionId, newValue, {
  //       ...context,
  //       symptomPresent: newValue.length > 0,
  //     });
  //   };

  //   const handleOtherExample = (questionId, value, context = {}) => {
  //   const sectionKey = `section${sectionNumber}`;

  //   updateAnswers(sectionKey, questionId, value, {
  //     ...context,
  //     other: value
  //   });
  // };

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
        <QuestionCard key={q.id} question={q} sectionNumber={sectionNumber} />
      ))}

      <button onClick={handleNext} disabled={totalAnswered < totalExpected}>
        Next
      </button>
    </SectionContainer>
  );
};

export default AssessmentSection;
