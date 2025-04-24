import { useParams } from "react-router-dom";
import questionsData from "../../assets/questions.json";
import styled from "styled-components";
import QuestionCard from "../ui/QuestionCard";
import StyledButton, { ButtonContainer } from "../ui/StyledButton";

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 20px;
`;

const ProgressBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: var(--color-gray-300);
  z-index: 999;
`;

const Progress = styled.div`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
`;

const AssessmentSection = () => {
  const { sectionNumber } = useParams();

  const currentSection = questionsData.sections.find(
    (section) => section.sectionNumber === parseInt(sectionNumber)
  );

  // calculate progress in assessment for the progress bar
  const totalSections = questionsData.sections.length;
  const currentIndex = parseInt(sectionNumber);
  const progressPercent = (currentIndex / totalSections) * 100;

  // determine which page the back and next buttons go to based on the current page
  const nextSection = parseInt(sectionNumber) + 1;
  const hasMoreSections = nextSection <= totalSections;

  const nextPath = hasMoreSections ? `/section/${nextSection}` : "/summary";

  const prevSection = parseInt(sectionNumber) - 1;
  // #TODO go to instructions instead of start?
  const backPath = prevSection >= 1 ? `/section/${prevSection}` : "/";
  if (!currentSection) return <div>Section not found</div>;

  return (
    <SectionContainer>
      <ProgressBarContainer>
        <Progress percent={progressPercent} />
      </ProgressBarContainer>

      <h2>Section {sectionNumber}</h2>

      {currentSection.questions.map((q) => (
        <QuestionCard key={q.id} question={q} sectionNumber={sectionNumber} />
      ))}

      <ButtonContainer>
        <StyledButton to={backPath}>Înapoi</StyledButton>
        <StyledButton to={nextPath}>Înainte</StyledButton>
      </ButtonContainer>
    </SectionContainer>
  );
};

export default AssessmentSection;
