"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import ColorPicker from "./ColorPicker";
import AlignmentPicker from "./AlignmentPicker";
import {AlignmentFn, ColorFn, DateDesign} from "web/state/schedule";
import styled from "@emotion/styled";

const DateContainer = styled.div`
    display: flex;
    gap: 32px;
`

type DateControllerProps = {
  dateDesign: DateDesign
  setDateAlignment: AlignmentFn
  setDateDescriptionColor: ColorFn
  setDateDescriptionTextColor: ColorFn
  setDateDayColor: ColorFn
  setDateDayTextColor: ColorFn
} & React.ComponentPropsWithoutRef<'section'>

const DateController: React.FC<DateControllerProps> = (
  {
    dateDesign,
    setDateAlignment,
    setDateDescriptionColor,
    setDateDescriptionTextColor,
    setDateDayColor,
    setDateDayTextColor,
    ...props
  }) => {
  return <CollapsibleSection title='Date' {...props}>
    <DateContainer>
      <AlignmentPicker
        alignment={dateDesign.dateAlignment}
        setAlignment={setDateAlignment}
      />
      <ColorPicker
        title='Description Color'
        headerTextColor={dateDesign.dateDescriptionColor}
        setColor={setDateDescriptionColor}
      />
      <ColorPicker
        title='Description Text Color'
        headerTextColor={dateDesign.dateDescriptionTextColor}
        setColor={setDateDescriptionTextColor}
      />
      <ColorPicker
        title='Day Background Color'
        headerTextColor={dateDesign.dateDayColor}
        setColor={setDateDayColor}
      />
      <ColorPicker
        title='Day Text Color'
        headerTextColor={dateDesign.dateDayTextColor}
        setColor={setDateDayTextColor}
      />
    </DateContainer>
  </CollapsibleSection>
}

export default DateController
