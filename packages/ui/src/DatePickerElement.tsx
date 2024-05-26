"use client"

import React from "react";
import {DatePicker} from "@mui/x-date-pickers";
import { DateTime } from "luxon";

/**
 * Converts a given date string to a Luxon DateTime object.
 *
 * @param {string} date - The date string to be converted.
 * @return {DateTime} - The Luxon DateTime object representing the converted date.
 */
const RFX339ToLuxon = (date: string): DateTime => DateTime.fromISO(date)

/**
 * Represents a function type that serves as the onChange event handler for a DatePicker component.
 *
 * @typedef {function(DateTime|null)} DatePickerOnChange
 * @param {DateTime|null} date The selected date value of the DatePicker component, or null if no date is selected.
 */
export type DatePickerOnChange = DateTime | null

/**
 * Represents the properties for the `DatePicker` component.
 *
 * @typedef {Object} DatePickerProps
 * @property {?DateTime | null | string} [value] - The date and time value for the date picker. Default: `null`.
 * @property {?function} [onSelect] - The callback function that is called when a date is selected. Default: `undefined`.
 * @property {boolean} [fullWidth] - Specifies whether the date picker should take up the full width. Default: `false`.
 */
type DatePickerProps = {
  value?: DateTime | null | string
  onSelect?: (selected: DatePickerOnChange) => void
  fullWidth?: boolean
}

/**
 * Represents a date picker element component.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string | Date} props.value - The value of the date picker.
 * @param {function} props.onSelect - The callback function triggered when a date is selected.
 * @param {boolean} props.fullWidth - Indicates if the date picker should take up the full width.
 * @returns {React.Element} - The rendered date picker element.
 */
const DatePickerElement: React.FC<DatePickerProps> = ({ value, onSelect, fullWidth}) => {
  return <DatePicker
    label='Date'
    value={(typeof value === "string") ? RFX339ToLuxon(value) : value}
    onChange={(event: DatePickerOnChange) => {
      if (event !== null && onSelect !== undefined)
        onSelect(event)
    }}
    sx={fullWidth ? {width: '100%'} : undefined}
  />

}

export default DatePickerElement
