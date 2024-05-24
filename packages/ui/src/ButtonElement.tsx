"use client"

import React from "react";
import styled from "@emotion/styled";

export const ButtonWrapper = styled.button<{disabled: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

    padding: 8px;
    border-radius: 2px;
    border: 1px solid gray;
    
    &:hover {
        background: rgba(0, 0, 0, 0.08);
    }
`

type ButtonElementProps = {
  disabled?: boolean
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'button'>

const ButtonElement: React.FC<ButtonElementProps> = ({disabled, children, ...props}) => {

  return <ButtonWrapper
    disabled={disabled ?? false}
    {...props}
  >
    {children}
  </ButtonWrapper>
}
export default ButtonElement
