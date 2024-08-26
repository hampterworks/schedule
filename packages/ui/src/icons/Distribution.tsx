"use client"

import React from "react";
import styled from "styled-components";


const Icon = styled.svg`
    cursor: pointer;
    pointer-events: auto;

    &:hover {
        fill: #cdcdcd;
    }

    rect {
        pointer-events: none;
    }
`
const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
type DistributionProps = {
  toggle: boolean
  onSelected?: (event: string) => void
} & React.ComponentPropsWithoutRef<'svg'>

const Distribution: React.FC<DistributionProps> = ({toggle, onSelected, ...props}) => {

  const handleOnClick = (event: string) => {
    if (onSelected) {
      onSelected(event)
    }
  }

  return <IconWrapper>
    <Icon
      viewBox="0 0 128 64.4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke='#999999'
        fill={toggle ? '#E6E6E6' : 'fff'}
        strokeMiterlimit={10}
        d="M4,64V9c0-2.8,2.3-5,5-5h110c2.8,0,5,2.3,5,5v54.9L4,64z"
        onClick={() => handleOnClick('top')}
      />
      <g>

        <rect x="24.5" y="11.5"
              fillRule='evenodd' clipRule='evenodd' fill='#1A1A1A' stroke='#1A1A1A' strokeLinejoin='round'
              strokeMiterlimit={10}
              width="79" height="10"/>

        <rect x="24.5" y="29.25"
              fillRule='evenodd' clipRule='evenodd' fill='#1A1A1A' stroke='#1A1A1A' strokeLinejoin='round'
              strokeMiterlimit={10}
              width="79" height="10"/>

        <rect x="24.5" y="46.5"
              fillRule='evenodd' clipRule='evenodd' fill='#1A1A1A' stroke='#1A1A1A' strokeLinejoin='round'
              strokeMiterlimit={10}
              width="79" height="10"/>
        <rect x="25" y="47" fillRule='evenodd' clipRule='evenodd' fill='#FFFFFF' width="13" height="9"/>
        <rect x="25" y="29.75" fillRule='evenodd' clipRule='evenodd' fill='#FFFFFF' width="13" height="9"/>
        <rect x="25" y="12" fillRule='evenodd' clipRule='evenodd' fill='#FFFFFF' width="13" height="9"/>
      </g>
    </Icon>
    <Icon
      viewBox="0 0 128 64.4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke='#999999'
        fill={toggle ? 'fff' : '#E6E6E6'}
        strokeMiterlimit={10}
        d="M4,0.5v55c0,2.8,2.3,5,5,5h110c2.8,0,5-2.3,5-5V0.4L4,0.5z"
        onClick={() => handleOnClick('bottom')}
      />

      <g>
        <rect x="10.5" y="10"
              fillRule='evenodd' clipRule='evenodd' fill='#808080' stroke='#808080' strokeLinejoin='round'
              strokeMiterlimit={10}
              width="30" height="19"/>

        <rect x="49.5"  y="10"
              fillRule='evenodd' clipRule='evenodd' fill='#808080' stroke='#808080' strokeLinejoin='round'
              strokeMiterlimit={10}
              width="30" height="19"/>

        <rect x="88.5"  y="10"
              fillRule='evenodd' clipRule='evenodd' fill='#808080' stroke='#808080' strokeLinejoin='round'
              strokeMiterlimit={10}
              width="30" height="19"/>

        <rect x="10.5" y="34"
              fillRule='evenodd' clipRule='evenodd' fill='#808080' stroke='#808080' strokeLinejoin='round'
              strokeMiterlimit={10}
              width="30" height="19"/>

        <rect x="49.5" y="34"
              fillRule='evenodd' clipRule='evenodd' fill='#808080' stroke='#808080' strokeLinejoin='round'
              strokeMiterlimit={10}
              width="30" height="19"/>

        <rect x="88.5" y="34"
              fillRule='evenodd' clipRule='evenodd' fill='#808080' stroke='#808080' strokeLinejoin='round'
              strokeMiterlimit={10}
              width="30" height="19"/>
        <rect x="11" y="10.5" fillRule='evenodd' clipRule='evenodd' fill='#FFFFFF' width="29" height="5"/>
        <rect x="50" y="10.5" fillRule='evenodd' clipRule='evenodd' fill='#FFFFFF' width="29" height="5"/>
        <rect x="89" y="10.5" fillRule='evenodd' clipRule='evenodd' fill='#FFFFFF' width="29" height="5"/>
        <rect x="89" y="34.5" fillRule='evenodd' clipRule='evenodd' fill='#FFFFFF' width="29" height="5"/>
        <rect x="50" y="34.5" fillRule='evenodd' clipRule='evenodd' fill='#FFFFFF' width="29" height="5"/>
        <rect x="11" y="34.5" fillRule='evenodd' clipRule='evenodd' fill='#FFFFFF' width="29" height="5"/>
      </g>
    </Icon>
  </IconWrapper>
}

export default Distribution
