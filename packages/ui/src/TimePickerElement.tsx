"use client"
import {TimePicker} from "@mui/x-date-pickers";1
import React from "react";
import {DateTime} from "luxon";

type TimePickerElementProps = {
  label?: string,
  value: DateTime
  onSelect?: (selected: DateTime) => void
}

const TimePickerElement: React.FC<TimePickerElementProps> = ({label, onSelect, value}) => {

  return <TimePicker
    label={label}
    value={value}
    onChange={(event) => {
      if (onSelect !== undefined && event !== null)
        onSelect(event)
    }}
  />

}

export default TimePickerElement
