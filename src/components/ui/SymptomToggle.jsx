/* eslint-disable react/prop-types */

import styled from "styled-components";
import StyledCheckbox from "./StyledCheckbox";

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  gap: 6px;
  cursor: pointer;
`;

const ToggleWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const SymptomToggle = ({ value, onChange, disabled = false }) => {
  return (
    <ToggleWrapper>
      <CheckboxLabel>
        <StyledCheckbox
          checked={value === "yes"}
          onChange={() => onChange(value === "yes" ? null : "yes")}
          disabled={disabled}
        />
        Da
      </CheckboxLabel>

      <CheckboxLabel>
        <StyledCheckbox
          checked={value === "no"}
          onChange={() => onChange(value === "no" ? null : "no")}
          disabled={disabled}
        />
        Nu
      </CheckboxLabel>
    </ToggleWrapper>
  );
};

export default SymptomToggle;
