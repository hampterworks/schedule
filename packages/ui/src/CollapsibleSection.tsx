"use client"

import * as React from "react";
import {useState} from "react";
import styled, {css} from "styled-components";
import ChevronDown from "./icons/ChevronDown";

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
    background: ${props => props.theme.secondaryBackground};
    color: ${props => props.theme.textColor};
`

/**
 * Props for the CollapsibleSection component.
 * @typedef {Object} CollapsibleSectionProps
 * @property {string} title - The title of the collapsible section.
 * @property {React.ReactNode} children - The content of the collapsible section.
 * @property {React.ComponentPropsWithoutRef<'section'>} [otherProps] - Additional properties for the section element.
 */
type CollapsibleSectionProps = {
  title: string
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'section'>

/**
 * A collapsible section component in React.
 *
 * @component
 * @example
 * <CollapsibleSection
 *    title="Section Title"
 *    children={
 *      <div>
 *        Content goes here
 *      </div>
 *    }
 *    {...props}
 * />
 *
 * @param {object} props - The props that are passed to the component.
 * @param {string} props.title - The title of the collapsible section.
 * @param {ReactNode} props.children - The content to be displayed when the section is extended.
 *
 * @returns {ReactNode} - The rendered React component.
 */
const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({title, children, ...props}) => {
  const [isExtended, setIsExtended] = useState(false)

  const childStyles = isExtended ? {} : { display: 'none' }

  return (
    <CollapsibleSectionWrapper {...props}>
      <SectionTopBar onClick={() => setIsExtended(!isExtended)}>
        <span>{title}</span>
        <ChevronDown invert={isExtended} />
      </SectionTopBar>

      <CollapsibleSectionWrapper style={childStyles}>{children}</CollapsibleSectionWrapper>
    </CollapsibleSectionWrapper>
  )
}

export default CollapsibleSection
