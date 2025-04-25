import React from 'react';
import styled from 'styled-components';

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  justify-content:flex-end;
`;

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    background-color: #6a5acd;
  }
  &:checked + span:before {
    transform: translateX(22px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0; left: 0;
  right: 0; bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 28px;

  &:before {
    content: "";
    position: absolute;
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <ToggleWrapper>
      <ToggleLabel>
        <ToggleInput type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <Slider />
      </ToggleLabel>
    </ToggleWrapper>
  );
};

export default ThemeToggle;
