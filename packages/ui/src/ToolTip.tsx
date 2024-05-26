'use client'

import React from "react";
import styled from "@emotion/styled";
import InfoIcon from "./icons/InfoIcon";

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

type ToolTipProps = {
  message: string
} & React.ComponentPropsWithoutRef<'span'>

const ToolTip: React.FC<ToolTipProps> = ({message, ...props}) => {
  return <ToolTipWrapper {...props}>
    <InfoIcon/>
    <div>{message}</div>
  </ToolTipWrapper>
}

export default ToolTip
