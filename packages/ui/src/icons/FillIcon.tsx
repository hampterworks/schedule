"use client"

import React from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/react";

const IconWrapper = styled.svg<{$sx?: ReturnType<typeof css>}>`
    height: 24px;
    ${props => props.$sx}
`

type FillIconProps = {
  $sx?: ReturnType<typeof css>
} & React.ComponentPropsWithoutRef<'svg'>

const FillIcon: React.FC<FillIconProps> = ({$sx, ...props}) => {
  return <IconWrapper
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    $sx={$sx}
    {...props}
  >
    <path fill='#111918' d="M21,12.17V6c0-1.206-0.799-3-3-3s-3,1.794-3,3v2.021L10.054,13H6c-1.105,0-2,0.895-2,2v9h2v-7
	l12,12l10-10L21,12.17z M18,5c0.806,0,0.988,0.55,1,1v4.17l-2-2V6.012C17.012,5.55,17.194,5,18,5z M18,26l-9-9l6-6v6h2v-6.001L25,19
	L18,26z M4,26h2v2H4V26z"/>
  </IconWrapper>
}

export default FillIcon
