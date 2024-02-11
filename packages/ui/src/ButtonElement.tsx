"use client"

import React from "react";
import styled from "@emotion/styled";

const ButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    
    padding: 8px;
    border-radius: 2px;
    border: 1px solid gray;
    
    &:hover {
        background: rgba(0, 0, 0, 0.08);
    }
`

type ButtonElementProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'button'>

const ButtonElement: React.FC<ButtonElementProps> = ({children, ...props}) => {

  return <ButtonWrapper {...props}>
    {children}
  </ButtonWrapper>
}
export default ButtonElement
