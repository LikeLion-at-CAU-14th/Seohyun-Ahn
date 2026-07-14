import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeColorContext } from '../../context/context';
import { Input, Label } from '../layout/common';

const Form = ({ type, label, name, value, onChange }) => {
  const mode = useContext(ThemeColorContext);
    // ── useContext로 테마 읽기 ────
    

    if (!type) {
        return (
            <Label>
                {label}
                <RadioGroup>
                    {['남자', '여자'].map((v) => (
                        <RadioLabel key={v} accent={mode.main}>
                            <RadioInput 
                            type="radio" 
                            name="gender" 
                            value={v} 
                            
                            checked={value === v} // 라디오 버튼이 선택되어 있는지를 React가 직접 관리
                            onChange={onChange}
                            />
                            {v}
                        </RadioLabel>
                    ))}
                </RadioGroup>
            </Label>
        );
    }

    return (
        <Label>
            {label}
            <Input 
            type={type} 
            accent={mode.main}

            name={name}
            value={value}
            onChange={onChange}
            />
        </Label>
    );
};

export default Form;

const RadioGroup = styled.div`
  display: flex;
  gap: 8px;
  padding: 2px 0;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid #e4e4e7;
  font-size: 14px;
  font-weight: 500;
  color: #52525b;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;

  &:has(input:checked) {
    background: ${(p) => p.accent || '#5B8BF4'};
    border-color: ${(p) => p.accent || '#5B8BF4'};
    color: #fff;
  }
`;

const RadioInput = styled.input`
  display: none;
`;
