"use client"

import React from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/react";

const IconWrapper = styled.svg<{$sx?: ReturnType<typeof css>}>`
    height: 24px;
    
    ${props => props.$sx}
`

type ScheduleIconProps = {
  $sx?: ReturnType<typeof css>
} & React.ComponentPropsWithoutRef<'svg'>

const ScheduleIcon: React.FC<ScheduleIconProps> = ({$sx, ...props}) => {
  return <IconWrapper
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    $sx={$sx}
    {...props}
  >
    <path fill='#111918' d="M24,6V4h-2v2H12V4h-2v2H7v20h20V6H24z M25,24H9V12h16V24z M9,10V8h1v1h2V8h10v1h2V8h1v2H9z
	 M13,16h-2v-2h4v8h-2V16z M23,14h-6v8h6V14z M21,20h-2v-4h2V20z M6,27h19v2H4V8h2V27z"/>
  </IconWrapper>
}

export default ScheduleIcon
