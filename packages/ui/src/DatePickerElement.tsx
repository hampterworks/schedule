"use client"

import {DatePicker} from "@mui/x-date-pickers";
import { DateTime } from "luxon";

import React from "react";

const RFX339ToLuxon = (date: string): DateTime => DateTime.fromISO(date)

export type DatePickerOnChange = DateTime | null

type DatePickerProps = {
  value?: DateTime | null | string
  onSelect?: (selected: DatePickerOnChange) => void
  fullWidth?: boolean
}

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
