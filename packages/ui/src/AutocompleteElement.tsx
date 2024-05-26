"use client"

import React from "react";
import {Autocomplete, Chip, TextField} from "@mui/material";

/**
 * Represents the properties of the AutocompleteElement component.
 * @typedef {Object} AutocompleteElementProps
 * @property {string[]} value - The currently selected values.
 * @property {string[]} options - The available options for autocompletion.
 * @property {(selected: string[]) => void} onSelect - The callback function to be executed when an option is selected.
 */
type AutocompleteElementProps = {
  value: string[]
  options: string[]
  onSelect: (selected: string[]) => void
}

/**
 * Represents an Autocomplete element component.
 *
 * @component
 * @param {AutocompleteElementProps} props - The properties for the Autocomplete element.
 * @returns {React.FC<AutocompleteElementProps>} - The Autocomplete element.
 */
const AutocompleteElement: React.FC<AutocompleteElementProps> = ({value, onSelect, options}) => {
  return <Autocomplete
    multiple
    options={options}
    value={value}
    renderTags={(tagValue, getTagProps) => {
      return tagValue.map((option, index) => (
        <Chip {...getTagProps({index})} key={option} label={option}/>
      ))
    }}
    renderInput={(params) =>
      <TextField {...params} label="Timezones"/>}
    onChange={(event, value) => {
      onSelect(value)
    }}
  />
}

export default AutocompleteElement
