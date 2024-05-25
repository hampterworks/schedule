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

type SliderSelectProps = {
  title: string
  size: number
  min: number
  max: number
  step?: number
  fontSizeSetter: (size: number) => void
}

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
