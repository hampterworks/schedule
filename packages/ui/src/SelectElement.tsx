"use client"

import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export type Option = {
  value: string
  label: string
  timeZone: string
}

type SelectElementProps = {
  options: Option[]
  onSelect: (selected: Option[]) => void
}

const SelectElement: React.FC<SelectElementProps> = ({options, onSelect, ...props}) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])

  const handleSelectChange = (event: any) => {

    setSelectedItems(event.target.value as string[])

    const selectedOptions: Option[] = options
      .filter(option => (event.target.value as string[]).includes(option.value))

    onSelect(selectedOptions)
  }

  return <FormControl fullWidth>
    <InputLabel>Timezones</InputLabel>
    <Select
      multiple
      label="Timezones"
      value={selectedItems}
      onChange={handleSelectChange}
    >
      {options.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
    </Select>
  </FormControl>
}

export default SelectElement
