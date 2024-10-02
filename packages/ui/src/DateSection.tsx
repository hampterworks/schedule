"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import {AlignmentFn, ColorFn, DateDesign, DistributionFn} from "web/state/schedule";
import styled from "styled-components";
import AlignmentPicker from "./components/AlignmentPicker";
import ColorPicker from "./components/ColorPicker";
import DistributionPicker from "./components/DistributionPicker";
import RangeSlider from "./components/RangeSlider";

const DateContainer = styled.div`
    display: flex;
    gap: 32px;
`
const ControlsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;

    > div {
        display: flex;
        gap: 16px;
    }
`

/**
 * Props for the DateController component.
 * @typedef {Object} DateControllerProps
 * @property {DateDesign} dateDesign - The design configuration for the date.
 * @property {AlignmentFn} setDateAlignment - A function to set the alignment of the date.
 * @property {DistributionFn} setDistributionAlignment - A function to set the distribution alignment of the date.
 * @property {ColorFn} setDateDescriptionColor - A function to set the color of the date description.
 * @property {ColorFn} setDateDescriptionTextColor - A function to set the color of the date description text.
 * @property {ColorFn} setDateDayColor - A function to set the color of the date day.
 * @property {ColorFn} setDateDayTextColor - A function to set the color of the date day text.
 * @property {Function} setDateDescriptionTextSize - A function to set the size of the date description text.
 * @property {Function} setDateTimesTextSize - A function to set the size of the date times text.
 * @property {Function} setDayNameTextSize - A function to set the size of the day name text.
 * @property {Function} setDayNumberTextSize - A function to set the size of the day number text.
 * @property {React.ComponentPropsWithoutRef<'section'>} [additionalProps] - Additional props for the underlying section element.
 */
type DateControllerProps = {
  dateDesign: DateDesign
  setDateAlignment: AlignmentFn
  setDistributionAlignment: DistributionFn
  setDateDescriptionColor: ColorFn
  setDateDescriptionTextColor: ColorFn
  setDateDayColor: ColorFn
  setDateDayTextColor: ColorFn
  setDateDescriptionTextSize: (size: number) => void
  setDateTimesTextSize: (size: number) => void
  setDayNameTextSize: (size: number) => void
  setDayNumberTextSize: (size: number) => void
  setDateDescriptionSpacing: (size: number) => void,
  setDaySpacing: (size: number) => void,
  setDatePadding: (size: number) => void,
} & React.ComponentPropsWithoutRef<'section'>

/**
 * DateSection component is used to display and control the design settings for a date section.
 *
 * @component
 * @param {Object} props - The props for the DateSection component
 * @param {Object} props.dateDesign - The design settings for the date section
 * @param {Function} props.setDateAlignment - The function to set the date alignment
 * @param {Function} props.setDistributionAlignment - The function to set the distribution alignment
 * @param {Function} props.setDateDescriptionColor - The function to set the description color
 * @param {Function} props.setDateDescriptionTextColor - The function to set the description text color
 * @param {Function} props.setDateDayColor - The function to set the day background color
 * @param {Function} props.setDateDayTextColor - The function to set the day text color
 * @param {Function} props.setDayNumberTextSize - The function to set the day number font size
 * @param {Function} props.setDateDescriptionTextSize - The function to set the description font size
 * @param {Function} props.setDateTimesTextSize - The function to set the time font size
 * @param {Function} props.setDayNameTextSize - The function to set the day name font size
 * @returns {React.FC} - The DateSection component
 */
const DateSection: React.FC<DateControllerProps> = (
  {
    dateDesign,
    setDateAlignment,
    setDistributionAlignment,
    setDateDescriptionColor,
    setDateDescriptionTextColor,
    setDateDayColor,
    setDateDayTextColor,
    setDayNumberTextSize,
    setDateDescriptionTextSize,
    setDateTimesTextSize,
    setDayNameTextSize,
    setDaySpacing,
    setDatePadding,
    setDateDescriptionSpacing,
    ...props
  }) => {

  return <CollapsibleSection title='Date' {...props}>
    <DateContainer>
      <DistributionPicker
        setDistributionAlignment={setDistributionAlignment}
        dateDistribution={dateDesign.dateDistribution}
      />
      <AlignmentPicker
        alignment={dateDesign.dateAlignment}
        setAlignment={setDateAlignment}
      />
      <ControlsWrapper>
        <div>
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
        </div>
        <div>
          <RangeSlider
            label='Day Name Font Size'
            value={dateDesign.dayNameTextSize}
            min={10}
            max={55}
            onSelected={event => {
              setDayNameTextSize(parseInt(event))
            }}
          />
          <RangeSlider
            label='Day Number Font Size'
            value={dateDesign.dayNumberTextSize}
            min={10}
            max={55}
            onSelected={event => {
              setDayNumberTextSize(parseInt(event))
            }}
          />
          <RangeSlider
            label='Discription Font Size'
            value={dateDesign.dateDescriptionTextSize}
            min={10}
            max={55}
            onSelected={event => {
              setDateDescriptionTextSize(parseInt(event))
            }}
          />
          <RangeSlider
            label='Time Font Size'
            value={dateDesign.dateTimesTextSize}
            min={10}
            max={55}
            onSelected={event => {
              setDateTimesTextSize(parseInt(event))
            }}
          />
        </div>
      </ControlsWrapper>
      <RangeSlider
        label='Padding'
        value={dateDesign.datePadding}
        min={10}
        max={100}
        onSelected={event => {
          setDatePadding(parseInt(event))
        }}
      />
      <RangeSlider
        label='Description Spacing'
        value={dateDesign.dateDescriptionSpacing}
        min={1}
        max={100}
        onSelected={event => {
          setDateDescriptionSpacing(parseInt(event))
        }}
      />
      {
        dateDesign.dateDistribution === 'list' &&
        <RangeSlider
          label='Day Spasing'
          value={dateDesign.daySpacing}
          min={1}
          max={100}
          onSelected={event => {
            setDaySpacing(parseInt(event))
          }}
        />
      }

    </DateContainer>
  </CollapsibleSection>
}

export default DateSection
