'use client'

import React from "react";
import InfoIcon from "./icons/InfoIcon";
import styled from "styled-components";

const ToolTipWrapper = styled.span`
    position: relative;
    cursor: help;
    display: flex;
    justify-content: center;
    align-items: center;
    
    div {
        display: none;
        position: absolute;
        top: 8px;
        left: 24px;
        min-width: 250px;
        background: gray;
        padding: 8px;
        border-radius: 4px;
        color: white;
        z-index: 2;
    }
    
    svg:hover + div {
        display: block;
    }
    svg {
        height: 18px;
    }
`

/**
 * Defines the props for the ToolTip component.
 *
 * @typedef {Object} ToolTipProps
 * @property {string} message - The message to be displayed in the tooltip.
 * @property {React.ComponentPropsWithoutRef<'span'>} - Additional props for the underlying 'span' component.
 */
type ToolTipProps = {
  message: string
} & React.ComponentPropsWithoutRef<'span'>

/**
 * Tooltip component that displays an information message.
 *
 * @component
 * @param {Object} props - The props object containing the message and additional props.
 * @param {string} props.message - The message to be displayed in the tooltip.
 * @param {Object} props... - Additional props that can be passed to the Tooltip component.
 * @returns {ReactElement} The rendered Tooltip component.
 */
const ToolTip: React.FC<ToolTipProps> = ({message, ...props}) => {
  return <ToolTipWrapper {...props}>
    <InfoIcon/>
    <div>{message}</div>
  </ToolTipWrapper>
}

export default ToolTip
