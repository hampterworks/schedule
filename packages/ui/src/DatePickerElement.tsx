"use client"

import {DatePicker} from "@mui/x-date-pickers";

import React from "react";
import dayjs, {Dayjs} from "dayjs";


type DatePickerProps = {
  range?: number
  onSelect?: (selected: Dayjs | null) => void
}

const DatePickerElement: React.FC<DatePickerProps> = ({range, onSelect, ...props}) => {

  return <DatePicker
    label='Date'
    defaultValue={dayjs()}
    onChange={onSelect}
    sx={{width: '100%'}}
  />

}

export default DatePickerElement
