"use client"
import React from "react";
import {TimePicker} from "@mui/x-date-pickers";
import {DateTime} from "luxon";

/**
 * Represents the properties for the TimePickerElement component.
 * @typedef {Object} TimePickerElementProps
 * @property {string} [label] - The label to display for the TimePickerElement.
 * @property {DateTime} value - The selected DateTime value for the TimePickerElement.
 * @property {function} [onSelect] - The function to call when a DateTime value is selected in the TimePickerElement.
 * @property {boolean} [disabled] - Determines if the TimePickerElement is disabled or not.
 */
type TimePickerElementProps = {
  label?: string,
  value: DateTime
  onSelect?: (selected: DateTime) => void
  disabled?: boolean
}

/**
 * Represents a time picker element.
 * @component
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the time picker element.
 * @param {function} props.onSelect - The function to be called when a time is selected.
 * @param {string} props.value - The value of the time picker element.
 * @param {boolean} props.disabled - Indicates whether the time picker element is disabled.
 *
 * @returns {ReactElement} The rendered TimePickerElement component.
 */
const TimePickerElement: React.FC<TimePickerElementProps> = (
  {
    label,
    onSelect,
    value,
    disabled
  }) => {
  return <TimePicker
    label={label}
    value={value}
    disabled={disabled ?? false}
    onChange={(event) => {
      if (onSelect !== undefined && event !== null)
        onSelect(event)
    }}
  />

}

export default TimePickerElement
