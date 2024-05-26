"use client"

import React from "react";
import {Slider} from "@mui/material";
import styled from "@emotion/styled";

const SliderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 13px;
    min-width: 200px;
    max-width: 250px;
    
    > div {
        white-space: nowrap;
    }
`

/**
 * Represents the properties of the SliderSelect component.
 * @typedef {Object} SliderSelectProps
 * @property {string} title - The title of the SliderSelect component.
 * @property {number} size - The size of the SliderSelect component.
 * @property {number} min - The minimum value of the SliderSelect component.
 * @property {number} max - The maximum value of the SliderSelect component.
 * @property {number} [step] - The step value for the SliderSelect component. (optional)
 * @property {function} fontSizeSetter - A function that takes a size (number) as input and sets the font size of the component.
 */
type SliderSelectProps = {
  title: string
  size: number
  min: number
  max: number
  step?: number
  fontSizeSetter: (size: number) => void
}

/**
 * A component representing a slider select.
 *
 * @component
 * @param {Object} props - The properties for the SliderSelect component.
 * @param {string} props.title - The title for the slider.
 * @param {number} props.size - The initial value for the slider.
 * @param {number} props.min - The minimum value that the slider can have.
 * @param {number} props.max - The maximum value that the slider can have.
 * @param {number} props.step - The step value for the slider.
 * @param {function} props.fontSizeSetter - The function to be called when the slider value changes.
 * @returns {JSX.Element} The JSX element representing the SliderSelect.
 */
const SliderSelect: React.FC<SliderSelectProps> = (
  {
    title,
    size,
    min,
    max,
    step,
    fontSizeSetter,
  }) => {
  return <SliderWrapper>
    <div>{title}</div>
    <Slider
      value={size}
      valueLabelDisplay="auto"
      step={step ?? 1}
      marks
      min={min}
      max={max}
      onChange={(_, value) =>
        fontSizeSetter(!Array.isArray(value) ? value : 22)}
    />
  </SliderWrapper>
}

export default SliderSelect
