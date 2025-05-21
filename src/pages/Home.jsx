import styled from "styled-components";
import StyledButton, { ButtonContainer } from "../components/ui/StyledButton";
import { useAssessment } from "../contexts/AssessmentContext";
import { useNavigate } from "react-router-dom";
import LogoImage from "../assets/adhd.png";

import {
  PageContainer,
  PageTitle,
  Paragraph,
} from "../components/ui/StyledTextElements";

const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    width: 100px;
  }
`;

function Home() {
  const { clearAssessment } = useAssessment();
  const navigate = useNavigate();

  const handleStart = () => {
    clearAssessment();
    navigate("/patient-info");
  };
  return (
    <>
      <PageContainer>
        <Logo src={LogoImage} alt="DIVA ADHD Logo" />
        <PageTitle>Bine ați venit la Evaluarea DIVA ADHD</PageTitle>
        <Paragraph>
          Această aplicație oferă o versiune digitală a interviului DIVA 2.0, un
          instrument standardizat pentru evaluarea simptomelor ADHD la adulți,
          care are la bază criteriile DSM-IV.
        </Paragraph>

        <Paragraph>
          Datele sunt stocate local, nu sunt partajate, iar aplicația
          funcționează și offline. După completarea evaluării, veți putea genera
          un raport sumar. Dacă aveți nevoie de instrucțiuni, faceți clic pe
          „Instrucțiuni”. Altfel, apăsați „Start” pentru a începe evaluarea.
        </Paragraph>
        <ButtonContainer>
          <StyledButton to="/instructions">Instrucțiuni</StyledButton>
          <StyledButton as="button" onClick={handleStart}>
            Start
          </StyledButton>
        </ButtonContainer>
      </PageContainer>
    </>
  );
}

export default Home;
