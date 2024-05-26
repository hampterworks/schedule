"use client"

import React from "react";
import {TextField} from "@mui/material";

/**
 * Represents the type of input for an HTML input element.
 *
 * @typedef {'text'
 *          | 'number'
 *          | 'password'
 *          | 'email'
 *          | 'search'
 *          | 'url'
 *          | 'tel'
 *          | 'date'
 *          | 'datetime-local'
 *          | 'month'
 *          | 'week'
 *          | 'time'
 *          | 'color'
 *          | 'file'} InputType
 */
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

/**
 * Represents the properties for an input element.
 * @typedef {Object} InputElementProps
 * @property {string} [label] - The label for the input element.
 * @property {InputType} type - The type of the input element.
 * @property {string} [value] - The value of the input element.
 * @property {boolean} [required] - Specifies whether the input element is required or not.
 * @property {function} [onInput] - The event handler function for the input event.
 * @property {boolean} [disabled] - Specifies whether the input element is disabled or not.
 */
type InputElementProps = {
  label?: string
  type: InputType
  value?: string
  required?: boolean
  onInput?: (selected: string | null) => void
  disabled?: boolean
}

/**
 * InputElement is a React functional component that represents an input element,
 * such as a text field, in a form.
 *
 * @param {Object} props - The properties of the InputElement component.
 * @param {string} props.type - The type of input element, e.g., "text", "number", "email".
 * @param {string} [props.label] - The label for the input element.
 * @param {Function} [props.onInput] - Function to be called when the input value changes.
 * @param {string} [props.value] - The current value of the input element.
 * @param {boolean} [props.required] - Determines whether the input is required or not.
 * @param {boolean} [props.disabled] - Determines whether the input is disabled or not.
 *
 * @returns {JSX.Element} - Returns a TextField component with the specified properties.
 */
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
