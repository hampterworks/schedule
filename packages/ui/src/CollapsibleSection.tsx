"use client"

import * as React from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {useState} from "react";

const CollapsibleSectionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: 4px;
`
const SectionTopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    background: #f8f8f8;
`

const IconWrapper = styled.svg<{ $invert: boolean }>`
    height: 24px;
    transition: transform 200ms ease-in-out;
    ${props => props.$invert && css`transform: rotate(180deg);`}
`
type ChevronDownProps = {
  invert?: boolean
} & React.ComponentPropsWithoutRef<'svg'>

const ChevronDown: React.FC<ChevronDownProps> = ({invert, ...props}) => {
  return <IconWrapper
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    $invert={invert ?? true}
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd"
          d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
          fill="#000000"/>
  </IconWrapper>
}

type CollapsibleSectionProps = {
  title: string
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'section'>

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({title, children, ...props}) => {
  const [isExtended, setIsExtended] = useState(false)

  return <CollapsibleSectionWrapper {...props}>
    <SectionTopBar onClick={() => setIsExtended(!isExtended)}>
      <span>{title}</span>

      <ChevronDown
        invert={isExtended}
      />
    </SectionTopBar>
    {isExtended && children}
  </CollapsibleSectionWrapper>
}

export default CollapsibleSection
