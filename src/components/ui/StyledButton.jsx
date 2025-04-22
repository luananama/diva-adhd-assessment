import styled from "styled-components";
import { NavLink } from "react-router-dom";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
`;

const StyledButton = styled(NavLink)`
  text-decoration: none;
  background-color: var(--color-primary-alt); /* Drop shadow color */
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: var(--color-white) !important;
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

  &:after {
    background-clip: padding-box;
    background-color: var(--color-primary);
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    bottom: -5px;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.1);
    -webkit-filter: brightness(1.1);
  }

  &:focus {
    user-select: auto;
  }

  &:disabled {
    cursor: auto;
  }

  &:active {
    border-width: 4px 0 0;
    background: none;
  }
`;

export default StyledButton; // Default export
export { ButtonContainer };
