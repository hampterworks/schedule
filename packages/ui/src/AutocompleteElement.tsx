"use client"

import React from "react";
import {Autocomplete, Chip, TextField} from "@mui/material";

type AutocompleteElementProps = {
  value: string[]
  options: string[]
  onSelect: (selected: string[]) => void
}

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
