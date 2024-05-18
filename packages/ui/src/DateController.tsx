"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import ColorPicker from "./ColorPicker";
import AlignmentPicker from "./AlignmentPicker";
import {AlignmentFn, ColorFn, DateDesign} from "web/state/schedule";

type DateControllerProps = {
  dateDesign: DateDesign
  setDateAlignment: AlignmentFn
  setDateDescriptionColor: ColorFn
  setDateDescriptionTextColor: ColorFn
  setDateDayColor: ColorFn
  setDateDayTextColor: ColorFn
} & React.ComponentPropsWithoutRef<'section'>

const DateController: React.FC<DateControllerProps> = ({
                                                         dateDesign,
                                                         setDateAlignment,
                                                         setDateDescriptionColor,
                                                         setDateDescriptionTextColor,
                                                         setDateDayColor,
                                                         setDateDayTextColor,
                                                         ...props
                                                       }) => {
  return <CollapsibleSection title='Date' {...props}>
    <AlignmentPicker
      alignment={dateDesign.dateAlignment}
      setHeaderAlignment={setDateAlignment}
    />
    <ColorPicker
      title='Description Background Color'
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
  </CollapsibleSection>
}

export default DateController
