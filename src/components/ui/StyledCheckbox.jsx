/* eslint-disable react/prop-types */

import styled from 'styled-components';

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  margin-left: 10px;
  color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #ccc;
  appearance: none;
  outline: none;
  transition: all 0.2s ease;
  position: relative;
  background-color: white;
  

  &:checked {
    background-color: #3db2c4;
    border-color: #3db2c4;
  }

  &:hover {
    border-color: #0074cc;
  }

  &:checked::after {
    content: '✔';
    font-size: 12px;
    color: white;
    position: absolute;
    top: 1px;
    left: 3px;
  }
    
`;

const CheckboxCell = styled.td`
  text-align: center;
  padding-left: 5px; /* Reduce gap between text and checkboxes */
  padding-right: 20px; 
  gap: 5px; /* Space between Da and Nu options */
`;

const StyledCheckbox = ({ label, checked, onChange, disabled, readOnly, name }) => {
  return (
    <CheckboxCell>
      <CheckboxLabel disabled={disabled}>
        <Checkbox 
        name={name}
        checked={checked} 
        onChange={onChange} 
        disabled={disabled}
        readOnly={readOnly}/>
        {label}
      </CheckboxLabel>
    </CheckboxCell>
  );
};

export default StyledCheckbox;
