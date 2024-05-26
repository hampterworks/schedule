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

/**
 * Type representing the properties for the DateController component.
 *
 * @typedef {Object} DateControllerProps
 * @property {DateDesign} dateDesign - The design configuration for the date.
 * @property {AlignmentFn} setDateAlignment - The function to set the alignment of the date.
 * @property {ColorFn} setDateDescriptionColor - The function to set the color of the date description.
 * @property {ColorFn} setDateDescriptionTextColor - The function to set the text color of the date description.
 * @property {ColorFn} setDateDayColor - The function to set the color of the date day.
 * @property {ColorFn} setDateDayTextColor - The function to set the text color of the date day.
 * @property {React.ComponentPropsWithoutRef<'section'>} - The remaining props for the DateController component.
 */
type DateControllerProps = {
  dateDesign: DateDesign
  setDateAlignment: AlignmentFn
  setDateDescriptionColor: ColorFn
  setDateDescriptionTextColor: ColorFn
  setDateDayColor: ColorFn
  setDateDayTextColor: ColorFn
} & React.ComponentPropsWithoutRef<'section'>

/**
 * DateController component.
 *
 * @component
 * @subcategory Controllers
 *
 * @param {object} props - React props object.
 * @param {object} dateDesign - Date design object.
 * @param {function} setDateAlignment - Function to set date alignment.
 * @param {function} setDateDescriptionColor - Function to set date description color.
 * @param {function} setDateDescriptionTextColor - Function to set date description text color.
 * @param {function} setDateDayColor - Function to set date day background color.
 * @param {function} setDateDayTextColor - Function to set date day text color.
 *
 * @returns {JSX.Element} DateController component.
 */
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
        colorValue={dateDesign.dateDescriptionColor}
        setColor={setDateDescriptionColor}
      />
      <ColorPicker
        title='Description Text Color'
        colorValue={dateDesign.dateDescriptionTextColor}
        setColor={setDateDescriptionTextColor}
      />
      <ColorPicker
        title='Day Background Color'
        colorValue={dateDesign.dateDayColor}
        setColor={setDateDayColor}
      />
      <ColorPicker
        title='Day Text Color'
        colorValue={dateDesign.dateDayTextColor}
        setColor={setDateDayTextColor}
      />
    </DateContainer>
  </CollapsibleSection>
}

export default DateController
