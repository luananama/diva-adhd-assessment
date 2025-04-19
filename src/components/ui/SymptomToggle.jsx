/* eslint-disable react/prop-types */

import styled from "styled-components";
import StyledCheckbox from "./StyledCheckbox";
import { useState } from "react";

// const CheckboxLabel = styled.label`
//   display: inline-flex;
//   align-items: center;
//   font-size: 1.1rem;
//   font-weight: 600;
//   color: #333;
//   gap: 6px;
//   cursor: pointer;
// `;

const ToggleWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const SymptomToggle = () => {
  const [selected, setSelected] = useState(null); // 'yes' | 'no' | null

  return (
    <ToggleWrapper>
      <StyledCheckbox
        checked={selected === "yes"}
        label={"Da"}
        onChange={() => setSelected(selected === "yes" ? null : "yes")}
      />

      <StyledCheckbox
        checked={selected === "no"}
        onChange={() => setSelected(selected === "no" ? null : "no")}
        label={"Nu"}
      />
    </ToggleWrapper>
  );
};

export default SymptomToggle;
