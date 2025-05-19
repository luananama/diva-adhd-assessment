/* eslint-disable react/prop-types */

import { useState } from "react";
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
  onSelect = () => {},
  inline = true,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    const newSelected = selectedOption === option ? null : option;
    setSelectedOption(newSelected);
    onSelect(newSelected);
  };

  return (
    <OptionGroup inline={inline}>
      {options.map((option, index) => (
        <StyledCheckbox
          key={index}
          label={option}
          checked={selectedOption === option}
          onChange={() => handleChange(option)}
        />
      ))}
    </OptionGroup>
  );
};

export default MultiOptionToggle;
