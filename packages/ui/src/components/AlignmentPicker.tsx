'use client'

import * as React from "react";
import {useEffect, useState} from "react";
import {Alignment} from "web/state/schedule";
import styled from "styled-components";

const AlignmentWrapper = styled.div`
    display: flex;
    gap: 4px;
`

const TitleContainer = styled.div`
    margin: 0 0 4px 4px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 13px;
    white-space: nowrap;
`

const AlignmentButton = styled.button<{ $isSelected: boolean }>`
    cursor: pointer;
    padding: 4px;
    border-radius: 2px;
    background: ${props => props.$isSelected && '#dedede'};

    &:hover {
        background: #dedede;
    }
`

const IconWrapper = styled.svg`
    height: 24px;
`
const AlignLeftIcon: React.FC = () => {
  return <IconWrapper
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.375 7.875C7.375 6.94039 7.375 6.47308 7.57596 6.125C7.70761 5.89697 7.89697 5.70762 8.125 5.57596C8.47308 5.375 8.94038 5.375 9.875 5.375L18.875 5.375C19.8096 5.375 20.2769 5.375 20.625 5.57596C20.853 5.70761 21.0424 5.89697 21.174 6.125C21.375 6.47308 21.375 6.94038 21.375 7.875C21.375 8.80962 21.375 9.27692 21.174 9.625C21.0424 9.85303 20.853 10.0424 20.625 10.174C20.2769 10.375 19.8096 10.375 18.875 10.375L9.875 10.375C8.94038 10.375 8.47308 10.375 8.125 10.174C7.89697 10.0424 7.70761 9.85303 7.57596 9.625C7.375 9.27692 7.375 8.80962 7.375 7.875Z"
      fill="#1C274C"/>
    <path
      d="M7.375 16.875C7.375 15.9404 7.375 15.4731 7.57596 15.125C7.70761 14.897 7.89697 14.7076 8.125 14.576C8.47308 14.375 8.94038 14.375 9.875 14.375H15.875C16.8096 14.375 17.2769 14.375 17.625 14.576C17.853 14.7076 18.0424 14.897 18.174 15.125C18.375 15.4731 18.375 15.9404 18.375 16.875C18.375 17.8096 18.375 18.2769 18.174 18.625C18.0424 18.853 17.853 19.0424 17.625 19.174C17.2769 19.375 16.8096 19.375 15.875 19.375H9.875C8.94038 19.375 8.47308 19.375 8.125 19.174C7.89697 19.0424 7.70761 18.853 7.57596 18.625C7.375 18.2769 7.375 17.8096 7.375 16.875Z"
      fill="#1C274C"/>
    <path opacity="0.5" fillRule="evenodd" clipRule="evenodd"
          d="M3.375 23.125C3.78921 23.125 4.125 22.7892 4.125 22.375L4.125 2.375C4.125 1.96079 3.78921 1.625 3.375 1.625C2.96079 1.625 2.625 1.96079 2.625 2.375L2.625 22.375C2.625 22.7892 2.96079 23.125 3.375 23.125Z"
          fill="#1C274C"/>
  </IconWrapper>
}

const AlignCenterIcon: React.FC = () => {
  return <IconWrapper
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" clipRule="evenodd"
          d="M14.5 14H9.5C8.56538 14 8.09808 14 7.75 14.201C7.52197 14.3326 7.33261 14.522 7.20096 14.75C7 15.0981 7 15.5654 7 16.5C7 17.4346 7 17.9019 7.20096 18.25C7.33261 18.478 7.52197 18.6674 7.75 18.799C8.09808 19 8.56538 19 9.5 19H14.5C15.4346 19 15.9019 19 16.25 18.799C16.478 18.6674 16.6674 18.478 16.799 18.25C17 17.9019 17 17.4346 17 16.5C17 15.5654 17 15.0981 16.799 14.75C16.6674 14.522 16.478 14.3326 16.25 14.201C15.9019 14 15.4346 14 14.5 14Z"
          fill="#1C274C"/>
    <path
      d="M19 7.5C19 6.56539 19 6.09808 18.799 5.75C18.6674 5.52197 18.478 5.33262 18.25 5.20096C17.9019 5 17.4346 5 16.5 5L7.5 5C6.56538 5 6.09808 5 5.75 5.20096C5.52197 5.33261 5.33261 5.52197 5.20096 5.75C5 6.09808 5 6.56538 5 7.5C5 8.43462 5 8.90192 5.20096 9.25C5.33261 9.47803 5.52197 9.66739 5.75 9.79904C6.09808 10 6.56538 10 7.5 10L16.5 10C17.4346 10 17.9019 10 18.25 9.79904C18.478 9.66739 18.6674 9.47803 18.799 9.25C19 8.90192 19 8.43462 19 7.5Z"
      fill="#1C274C"/>
    <g opacity="0.5">
      <path
        d="M12.75 5L12.75 2C12.75 1.58579 12.4142 1.25 12 1.25C11.5858 1.25 11.25 1.58579 11.25 2L11.25 5H12.75Z"
        fill="#1C274C"/>
      <path d="M11.25 10L11.25 14H12.75L12.75 10L11.25 10Z" fill="#1C274C"/>
      <path
        d="M11.25 19L11.25 22C11.25 22.4142 11.5858 22.75 12 22.75C12.4142 22.75 12.75 22.4142 12.75 22L12.75 19H11.25Z"
        fill="#1C274C"/>
    </g>
  </IconWrapper>
}

const AlignRightIcon: React.FC = () => {
  return <IconWrapper
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.625 7.875C16.625 6.94039 16.625 6.47308 16.424 6.125C16.2924 5.89697 16.103 5.70762 15.875 5.57596C15.5269 5.375 15.0596 5.375 14.125 5.375L5.125 5.375C4.19038 5.375 3.72308 5.375 3.375 5.57596C3.14697 5.70761 2.95761 5.89697 2.82596 6.125C2.625 6.47308 2.625 6.94038 2.625 7.875C2.625 8.80962 2.625 9.27692 2.82596 9.625C2.95761 9.85303 3.14697 10.0424 3.375 10.174C3.72308 10.375 4.19038 10.375 5.125 10.375L14.125 10.375C15.0596 10.375 15.5269 10.375 15.875 10.174C16.103 10.0424 16.2924 9.85303 16.424 9.625C16.625 9.27692 16.625 8.80962 16.625 7.875Z"
      fill="#1C274C"/>
    <path
      d="M16.625 16.875C16.625 15.9404 16.625 15.4731 16.424 15.125C16.2924 14.897 16.103 14.7076 15.875 14.576C15.5269 14.375 15.0596 14.375 14.125 14.375H8.125C7.19038 14.375 6.72308 14.375 6.375 14.576C6.14697 14.7076 5.95761 14.897 5.82596 15.125C5.625 15.4731 5.625 15.9404 5.625 16.875C5.625 17.8096 5.625 18.2769 5.82596 18.625C5.95761 18.853 6.14697 19.0424 6.375 19.174C6.72308 19.375 7.19038 19.375 8.125 19.375H14.125C15.0596 19.375 15.5269 19.375 15.875 19.174C16.103 19.0424 16.2924 18.853 16.424 18.625C16.625 18.2769 16.625 17.8096 16.625 16.875Z"
      fill="#1C274C"/>
    <path opacity="0.5" fillRule="evenodd" clipRule="evenodd"
          d="M20.625 23.125C20.2108 23.125 19.875 22.7892 19.875 22.375L19.875 2.375C19.875 1.96079 20.2108 1.625 20.625 1.625C21.0392 1.625 21.375 1.96079 21.375 2.375L21.375 22.375C21.375 22.7892 21.0392 23.125 20.625 23.125Z"
          fill="#1C274C"/>

  </IconWrapper>
}

/**
 * Props for the AlignmentPicker component
 * @typedef {Object} AlignmentPickerProps
 * @property {Alignment} alignment - The current alignment value
 * @property {function} setAlignment - Callback function to set the alignment
 * @property {React.ComponentPropsWithoutRef<'div'>} - Additional props for the wrapping div
 */
type AlignmentPickerProps = {
  alignment: Alignment
  setAlignment: (alignment: Alignment) => void
} & React.ComponentPropsWithoutRef<'div'>

/**
 * React functional component used to select alignment.
 * @param {Object} alignment - The current alignment value.
 * @param {Function} setAlignment - The function to set the alignment value.
 * @param {Object} props - Additional props for the component.
 * @returns {JSX.Element} The rendered alignment picker component.
 */
const AlignmentPicker: React.FC<AlignmentPickerProps> = ({alignment, setAlignment, ...props}) => {
  const [selectedAlignment, setSelectedAlignment] = useState(alignment)

  useEffect(() => {
    setAlignment(selectedAlignment)
  }, [selectedAlignment])

  return <div {...props}>
    <TitleContainer>Select Alignment</TitleContainer>
    <AlignmentWrapper>
      <AlignmentButton
        onClick={() => setSelectedAlignment('left')}
        $isSelected={selectedAlignment === 'left'}
      >
        <AlignLeftIcon/>
      </AlignmentButton>
      <AlignmentButton
        onClick={() => setSelectedAlignment('center')}
        $isSelected={selectedAlignment === 'center'}
      >
        <AlignCenterIcon/>
      </AlignmentButton>
      <AlignmentButton
        onClick={() => setSelectedAlignment('right')}
        $isSelected={selectedAlignment === 'right'}
      >
        <AlignRightIcon/>
      </AlignmentButton>
    </AlignmentWrapper>
  </div>
}
export default AlignmentPicker
