/* eslint-disable react/prop-types */

// import { useState } from "react";
import styled from "styled-components";
import StyledCheckbox from "./StyledCheckbox";

const OptionGroup = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "inline",
})`
  display: flex;
  flex-direction: ${({ inline }) => (inline ? "row" : "column")};
  gap: 20px;
  align-items: flex-start;
`;

const MultiOptionToggle = ({
  options = [],
  value = null, // new
  onSelect = () => {},
  inline = true,
}) => {
  const handleChange = (option) => {
    const newSelected = value === option ? null : option;
    onSelect(newSelected);
  };

  return (
    <OptionGroup inline={inline}>
      {options.map((option, index) => (
        <StyledCheckbox
          key={index}
          label={option}
          checked={value === option}
          onChange={() => handleChange(option)}
        />
      ))}
    </OptionGroup>
  );
};

export default MultiOptionToggle;
