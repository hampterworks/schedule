"use client"

import {TextField} from "@mui/material";
import React from "react";

type InputType =
  'text'
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
  label?: string
  type: InputType
  value?: string
  required?: boolean
  onInput?: (selected: string | null) => void
  disabled?: boolean
}

const InputElement: React.FC<InputElementProps> =
  ({
     type,
     label,
     onInput,
     value,
     required,
     disabled
   }) => {

    return <TextField
      label={label ?? ''}
      required={required !== undefined && required}
      type={type}
      value={value ?? ''}
      sx={{width: '100%'}}
      inputProps={{
        min: 1,
      }}
      onChange={(event) => {
        if (onInput !== undefined)
          onInput(event.target.value)
      }}
      variant="outlined"
      disabled={disabled ?? false}
    />
  }

export default InputElement
