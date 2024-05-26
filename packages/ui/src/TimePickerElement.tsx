"use client"
import React from "react";
import {TimePicker} from "@mui/x-date-pickers";1
import {DateTime} from "luxon";

/**
 * Represents the properties for a TimePickerElement component.
 *
 * @typedef {Object} TimePickerElementProps
 * @property {string} [label] - The label to be displayed for the TimePickerElement component.
 * @property {DateTime} value - The selected DateTime value for the TimePickerElement component.
 * @property {function(selected: DateTime): void} [onSelect] - The callback function to be called when a DateTime value is selected.
 */
type TimePickerElementProps = {
  label?: string,
  value: DateTime
  onSelect?: (selected: DateTime) => void
}

/**
 * A customizable time picker element component.
 *
 * @component
 * @param {object} props - The properties passed to the TimePickerElement component.
 * @param {string} props.label - The label to display for the time picker.
 * @param {function} props.onSelect - The callback function to execute when a time is selected.
 * @param {string} props.value - The currently selected time value.
 * @returns {JSX.Element} - The rendered TimePickerElement component.
 */
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
