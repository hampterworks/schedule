"use client"

import {TextField} from "@mui/material";
import React from "react";

type InputType = 'text'
  | 'number'
  | 'password'
  | 'email'
  | 'search'
  | 'url'
  | 'tel'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'time'
  | 'color'
  | 'file'

type InputElementProps = {
  label: string
  type: InputType
  value?: string
  defaultValue?: string
  required?: boolean
  onSelect: (selected: string | null) => void
}

const InputElement: React.FC<InputElementProps> = ({type, label, onSelect, defaultValue, required, ...props}) => {

  return <TextField
    required={required !== undefined && required}
    label={label}
    type={type}
    defaultValue={defaultValue}
    sx={{width: '100%'}}
    inputProps={{
      min: 1,
    }}
    onChange={(event) => {
      onSelect(event.target.value)
    }}
    variant="outlined"/>
}

export default InputElement
