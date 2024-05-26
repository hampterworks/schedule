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

/**
 * Represents the props for a Button component.
 * @typedef {Object} ButtonElementProps
 * @property {boolean} [disabled] - Whether the button is disabled or not.
 * @property {React.ReactNode} children - The content to be displayed inside the button element.
 * @property {React.ComponentPropsWithoutRef<'button'>} - Additional props to be passed to the button element.
 */
type ButtonElementProps = {
  disabled?: boolean
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'button'>

/**
 * Represents a button element component.
 *
 * @component
 * @param {Object} props - The properties of the ButtonElement.
 * @param {boolean} props.disabled - Whether the button is disabled or not. Default is false if not provided.
 * @param {React.ReactNode} props.children - The content to be rendered inside the button.
 * @returns {React.ReactNode} The rendered button element.
 */
const ButtonElement: React.FC<ButtonElementProps> = ({disabled, children, ...props}) => {

  return <ButtonWrapper
    disabled={disabled ?? false}
    {...props}
  >
    {children}
  </ButtonWrapper>
}
export default ButtonElement
