import { NavLink } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import { useAssessment } from "../../contexts/AssessmentContext";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: var(--color-white);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-family: "Karla", sans-serif;
  font-size: 1.1rem;
  color: var(--color-gray-900);
  margin: 0;
  font-weight: 700;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
  align-items: center;
`;

const NavItem = styled.li`
  cursor: pointer;
`;

const RegularLink = styled(NavLink)`
  text-decoration: none;
  background-color: var(--color-white);
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: var(--color-primary-alt);
  display: inline-block;
  font-family: din-round, sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.8px;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 13px 16px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter 0.2s;

  &:hover {
    color: var(--color-primary);
  }

  &.active {
    border-bottom: 2px solid var(--color-gray-200);
    color: var(--color-primary-alt);
  }
`;

const LanguageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  font-size: 24px;
  line-height: 1;

  /* add back in when there is support for multiple languages*/
  /* &:hover {
    background-color: var(--color-gray-100);
  } */
`;

function Navbar() {
  const { clearAssessment } = useAssessment();
  const navigate = useNavigate();

  const handleStart = () => {
    clearAssessment();
    navigate("/"); // go to the start page
  };

  return (
    <HeaderContainer>
      <Title>Interviu privind diagnosticarea ADHD la adulți (DIVA)</Title>
      <Nav>
        <NavList>
          <NavItem>
            <StyledButton as="button" onClick={handleStart}>
              Evaluare ADHD
            </StyledButton>
          </NavItem>
          <NavItem>
            <RegularLink to="/about">Despre</RegularLink>
          </NavItem>
          <NavItem>
            <RegularLink to="/instructions">Instrucțiuni</RegularLink>
          </NavItem>
          <NavItem>
            <LanguageButton aria-label="Change language">
              🇷🇴 {/* static for now */}
            </LanguageButton>
          </NavItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
}

export default Navbar;
