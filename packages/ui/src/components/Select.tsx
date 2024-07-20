"use client"

import styled, {css} from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import Input from "./Input";
import ChevronDown from "../icons/ChevronDown";
import useClickOutside from "../hooks/useClickOutside";
import Button from "./Button";
import Close from "../icons/Close";
import RequiredLabel from "./RequiredLabel";

/**
 * A wrapper component for whole element.
 */
const SelectWrapper = styled.div<{ $sx?: ReturnType<typeof css> }>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
        display: block;
    }

    > select {
        position: absolute;
        top: 75%;
        appearance: none;
        font-size: 0;
        option {
            height: 0;
        }
    }

    ${props => props.$sx}
`
/**
 * A wrapper component for input and dropdown elements.
 */
const InputWrapper = styled.div`
    display: flex;
    position: relative;
`

const MultiSelectWrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

/**
 * Represents a styled dropdown element.
 */
const DropDown = styled.ul`
    color: black;
    width: 100%;
    max-height: 350px;
    overflow-y: auto;
    border-radius: 4px;
    border: 1px solid gray;
    z-index: 9001;
    position: absolute;
    top: 50px;
`

/**
 * Represents a styled list item that can be selected.
 * @property {boolean} $isSelected - Determines whether the list item is selected with keyboard input.
 */
const ListItem = styled.li<{ $isSelected: boolean }>`
    cursor: pointer;
    background: white;

    &:not(:last-of-type) {
        border-bottom: 1px solid black;
    }
    
    div {
        display: flex;
        gap: 8px;
        padding: 8px;
    }

    &:hover {
        background: #d9d9d9;
    }

    &:first-of-type {
        border-radius: 4px 4px 0 0;
    }

    &:last-of-type {
        border-radius: 0 0 4px 4px;
    }

    ${prop => prop.$isSelected && css`
        background: #d9d9d9;
    `}
`
/**
 * Represents an item that can be selected in a dropdown menu.
 * @typedef {Object} SelectItem
 * @property {string} value - The value associated with the item.
 * @property {string} title - The title or display text of the item.
 */
type SelectItem = {
  value: string
  title: string
}

/**
 * Represents the properties for the Select component.
 * @typedef {Object} SelectProps
 * @property {SelectItem[]} options - The list of options for the Select component.
 * @property {string} [label] - The label for the Select component.
 * @property {string} [name] - The name attribute for the Select component.
 * @property {boolean} [required] - Specifies if the Select component is required.
 * @property {SelectItem | SelectItem[]} [selectedValue] - The selected value(s) for the Select component.
 * @property {boolean} [multiple] - Specifies if the Select component allows multiple selections.
 * @property {boolean} [searchable] - Specifies if the Select component is searchable.
 * @property {function} [onSelectedValue] - Event handler for when the selected value(s) change.
 * @property {ReturnType<css>} [sx] - The styling configuration for the Select component.
 */
type SelectProps = {
  options: SelectItem[]
  label?: string
  name?: string
  required?: boolean
  selectedValue?: SelectItem | SelectItem[]
  multiple?: boolean
  searchable?: boolean
  onSelectedValue?: (value: SelectItem[]) => void
  sx?: ReturnType<typeof css>
} & React.ComponentPropsWithRef<'select'>

/**
 * Represents a custom Select component in React.
 *
 * @param {Object} props - The props for the Select component.
 * @param {string} props.id - The id of the Select component.
 * @param {string} props.label - The label of the Select component.
 * @param {Array<SelectItem>} props.options - The options for the Select component.
 * @param {string} props.name - The name of the Select component.
 * @param {boolean} props.required - Indicates if the Select component is required.
 * @param {SelectItem | SelectItem[]} props.selectedValue - The selected value(s) of the Select component.
 * @param {boolean} props.multiple - Indicates if the Select component allows multiple selections.
 * @param {boolean} props.searchable - Indicates if the Select component has a search functionality.
 * @param {CSSProperties} props.sx - The custom styles for the Select component.
 * @param {function} props.onSelectedValue - The callback function invoked when the selected value(s) change.
 * @param {any} restProps - The additional props for the Select component.
 * @returns {React.ReactNode} The JSX code for the Select component.
 */
const Select: React.ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (props, ref) => {
  const {
    id,
    label,
    options,
    name,
    required,
    selectedValue,
    multiple,
    searchable,
    sx,
    onSelectedValue,
    ...restProps
  } = props

  // Ref for detecting a click outside the element and closing it
  const clickRef = useRef<HTMLDivElement>(null)

  // State for a selected item
  const [selected, setSelected] =
    useState<SelectItem[]>(
      selectedValue !== undefined
        ? Array.isArray(selectedValue)
          ? selectedValue
          : [selectedValue]
        : [])

  // State for toggling the dropdown menu
  const [menuToggle, setMenuToggle] = useState(false)

  // State for displaying the invalid state of the native select element on the custom select element
  const [isInvalid, setIsInvalid] = useState(false)

  // State for holding the autocomplete search term
  const [searchTerm, setSearchTerm] = useState<string>('')

  // State for filtered search results
  const [filteredOptions, setFilteredOptions] = useState<SelectItem[]>(options)

  // Updates the value selected by the custom element in the native element
  useEffect(() => {
    const selectElement = document.getElementsByTagName('select')
    if (selected.length > 0) {
      if (selectElement[0] && selected[0]) {
        for (let element of selectElement[0].options) {
          const selectedIndex = selected.findIndex(item => item.value === element.value)
          selectedIndex >= 0
            ? element.selected = true
            : element.selected = false
        }
      }
      setIsInvalid(false)
    }
    // reset the selection if nothing is selected
    if (selected.length === 0 && selectElement[0]) {
      selectElement[0].selectedIndex = -1
    }
    if (onSelectedValue !== undefined) {
      onSelectedValue(selected)
    }
  }, [selected])

  useEffect(() => {
    setFilteredOptions(options.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase() ?? '')))
  }, [searchTerm])

  // Hook for detecting a click outside the element and closing the dropdown
  useClickOutside(clickRef, () => {
    if (menuToggle)
      setMenuToggle(false)
  })

  // keyboard controls for navigating the custom element
  const handleMenuKeyboardInput = (event: React.KeyboardEvent) => {
    const key = event.key
    let selectedIndex = options.findIndex(option => option.value === selected[0]?.value)

    if (key === 'ArrowDown') {
      event.preventDefault()

      if (selectedIndex < options.length - 1)
        selectedIndex++

      const newSelected = options[selectedIndex]

      if (newSelected)
        setSelected([newSelected])

    } else if (key === 'ArrowUp') {
      event.preventDefault()

      if (selectedIndex > 0)
        selectedIndex--

      const newSelected = options[selectedIndex]

      if (newSelected)
        setSelected([newSelected])

    } else if (key === 'Enter' || key === 'Space') {
      setMenuToggle(!menuToggle)
    }
  }

  return <SelectWrapper ref={clickRef} $sx={sx}>
    <select
      style={{height: 0}} // Setting height here to prevent layout shifts
      value={multiple
        ? selected.map(item => item.value)
        : selected[0]?.value
      }
      required={required}
      name={name ?? ''}
      id={name ?? ''}
      ref={ref}
      multiple={multiple ?? false}
      {...restProps}
      onInvalid={() => {
        setIsInvalid(true)
      }}
      onMouseDown={event => event.preventDefault()}
      onKeyDown={event => {
        if (event.code === 'Space' || event.key === 'ArrowDown' || event.key === 'Enter') {
          event.preventDefault()
          setMenuToggle(true)
        }
      }}
      /**
      * Empty onChange to prevent the element from being rendered as readonly,
      * not using defaultValue as to not switch from a controlled to uncontrolled component
      */
      onChange={() => {
      }}
    >
      {
        options.map((option, index) =>
          <option
            value={option.value}
            key={option.value + index}
          >
            {option.title}
          </option>)
      }
    </select>
    <label htmlFor={id}>{label}</label>
    {
      ((multiple !== undefined && multiple) || searchable) && selected.length > 0 &&
      <MultiSelectWrapper>
        {
          selected.map(option =>
            <li key={option.value}>
              <Button
                label={option.title}
                icon={<Close/>}
                iconDirection="right"
                onClick={() => setSelected(selected.filter(item => item.value !== option.value))}
                sx={
                  css`
                      height: 24px;
                      font-size: 14px
                  `}
              />
            </li>)
        }
      </MultiSelectWrapper>
    }
    <InputWrapper>
      <Input
        readOnly={!searchable}
        value={!searchable ? selected.map(selected => selected.title).join(', ') ?? '' : searchTerm}
        iconRight={
          <ChevronDown
            toggleUnder={setMenuToggle}
            invert={menuToggle}/>
        }
        isInvalid={isInvalid}
        onChange={event => {
          if (searchable === true) {
            setSearchTerm(event.target.value)
            if (searchTerm.length > 0 && !menuToggle) {
              setMenuToggle(true)
            }
          }
        }}
        onClick={() => setMenuToggle(!menuToggle)}
        sx={css`cursor: pointer`}
      />
      {
        menuToggle && filteredOptions.length > 0 &&
        <DropDown
          role="listbox"
          tabIndex={0}
          onKeyDown={handleMenuKeyboardInput}
          aria-labelledby="dropdown-label"
        >
          {
            filteredOptions.map((option, index) =>
              <ListItem
                $isSelected={selected.findIndex(item => item.value === option.value) >= 0}
                id={`option-${option.value + index}`}
                role="option"
                aria-selected={option.value === selected[0]?.value}
                onClick={_ => {
                  if (!multiple) {
                    setSelected([option])
                  } else {
                    const selectedIndex = selected.findIndex(item => item.value === option.value)

                    selectedIndex >= 0
                      ? setSelected(selected.filter(item => item.value !== option.value))
                      : setSelected([...selected, option])
                  }
                  setMenuToggle(false)
                }}
                key={option.value + index}
              >
                <div>{option.title}</div>
              </ListItem>
            )
          }
        </DropDown>
      }
    </InputWrapper>
    {
      required && <RequiredLabel/>
    }
  </SelectWrapper>
}

export default React.forwardRef(Select)
