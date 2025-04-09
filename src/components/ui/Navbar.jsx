import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from './StyledButton';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-family: 'Karla', sans-serif;
  font-size: 1.5rem;
  color: #1c688a;
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
  background-color: white;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #3297a6;
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
    color: #3db2c4;
  }

  &.active {
    font-weight: 600;
    border: solid;
    border-color: #efefef;
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

  &:hover {
    background-color: #f0f0f0;
  }
`;

function Navbar() {
  return (
    <HeaderContainer>
      <Title>Interviu privind diagnosticarea ADHD la adulți (DIVA)</Title>
      <Nav>
        <NavList>
          <NavItem>
            {/* <ButtonLink to="/">Assessment</ButtonLink> */}
            <StyledButton to="/">Assessment</StyledButton>
          </NavItem>
          <NavItem>
            <RegularLink to="/about">About</RegularLink>
          </NavItem>
          <NavItem>
            <LanguageButton aria-label="Change language">
              🇷🇴 {/* Static flag icon */}
            </LanguageButton>
          </NavItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
}

export default Navbar;