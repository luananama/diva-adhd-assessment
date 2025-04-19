/* eslint-disable react/prop-types */

import { useState } from "react";
import styled from "styled-components";
import StyledCheckbox from "./StyledCheckbox";

const OptionGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const MultiOptionToggle = ({ options = [], onSelect = () => {} }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    const newSelected = selectedOption === option ? null : option;
    setSelectedOption(newSelected);
    onSelect(newSelected);
  };

  return (
    <OptionGroup>
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
