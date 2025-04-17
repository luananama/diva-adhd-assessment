import styled from "styled-components";
import StyledButton, { ButtonContainer } from "../components/ui/StyledButton";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Instructions = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  // color: #333;
  color: #333333;
`;

const Citation = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
  text-align: left;
`;

function Home() {
  return (
    <>
      <HomePageContainer>
        <Instructions>
          Testul ADHD DIVA (Interviul Diagnostic pentru ADHD la Adulți) este un
          instrument standardizat conceput pentru profesioniștii din domeniul
          sănătății, precum psihiatri, psihologi, și alți specialiști în
          sănătate mintală, pentru a evalua simptomele ADHD la adulți conform
          criteriilor DSM V. Aplicația permite administrarea digitală a testului
          DIVA, oferind o modalitate eficientă și sigură de a evalua simptomele
          de inatenție și hiperactivitate/impulsivitate atât în prezent, cât și
          din copilărie, cu scorare automată și generare de rapoarte detaliate,
          păstrând în același timp confidențialitatea și securitatea datelor
          pacientului.
        </Instructions>
        <Citation>
          <p>
            <strong>Reference:</strong> Kooij JJS, Francken MH. Diagnostic
            Interview for ADHD in adults (DIVA-5). DIVA Foundation; 2018.
          </p>
        </Citation>
        <ButtonContainer>
          <StyledButton to="/instructions">Instructions</StyledButton>
          <StyledButton to="/section/1">Start Assessment</StyledButton>
        </ButtonContainer>
      </HomePageContainer>
    </>
  );
}

export default Home;
