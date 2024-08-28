'use client'

import React, {useEffect, useState} from "react";
import styled, {type css} from "styled-components";

const RangeWrapper = styled.div<{ $sx?: ReturnType<typeof css> }>`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 8px;

    font-size: 13px;
    color: ${props => props.theme.textColor};
    
    label {
        margin-bottom: 8px;
    }
    output {
        position: absolute;
        left: 25px;
        top: 90%;
        background: #000;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        transform: translateX(-50%);
    }

    datalist {
        display: flex;
        position: absolute;
        bottom: 5px;
        width: 100%;
        justify-content: space-between;
        height: 5px;
        overflow: hidden;
        
        option {
            padding: 0 2px;
        }
        
        option::before {
            content: '|';
            color: #aeaeae;
        }
    }

    ${props => props.$sx}
`

const RangeElement = styled.input`
    -webkit-appearance: none;
    &::-webkit-slider-runnable-track {
        width: 100%;
        background: #0c69a8;
        height: 6px;
        border-radius: 2px;
    }

    &::-moz-range-track {
        background: #0c69a8;
        height: 6px;
        border-radius: 2px;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background-color: #aeaeae;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        border: 0;
        transform: translateY(-5px);
        cursor: pointer;
    }

    &::-moz-range-thumb {
        background-color: #aeaeae;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        border: 0;
    }

    &::-moz-range-progress {
        background: #053a5f;
        height: 5px;
    }
`

const GenerateTickMarks = (min: number, max: number, marks: number) =>
  Array.from({length: (max - min) / marks + 1}, (_, index) => min + (index * marks))
    .map(index => <option value={index} key={index.toString()}></option>)

/**
 * Represents the props for the RangeSlider component.
 *
 * @typedef {Object} RangeSliderProps
 * @property {string} [name] - The name of the input component.
 * @property {string} [label] - The label text for the RangeSlider.
 * @property {number} [value] - The value for the RangeSlider.
 * @property {number} [min] - The minimum value for the RangeSlider.
 * @property {number} [max] - The maximum value for the RangeSlider.
 * @property {number} [step] - The step value for the RangeSlider.
 * @property {number} [marks] - The number of marks to display on the RangeSlider.
 * @property {(value: string) => void} [onSelected] - The callback function to be called when a value is selected on the RangeSlider.
 * @property {ReturnType<typeof css>} [sx] - The custom styling for the RangeSlider component, returned by the `css` function.
 * @property {React.ComponentPropsWithoutRef<'input'>} [inputProps] - Additional input props to be passed to the underlying input component.
 */
type RangeSliderProps = {
  name?: string
  label?: string
  value?: number
  min?: number
  max?: number
  step?: number
  marks?: number
  onSelected?: (value: string) => void
  sx?: ReturnType<typeof css>
} & React.ComponentPropsWithoutRef<'input'>

/**
 * A slider component that allows selecting a range of values.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the input element.
 * @param {string} props.label - The label displayed above the slider.
 * @*/
const RangeSlider: React.FC<RangeSliderProps> = (
  {
    name,
    label,
    value,
    min,
    max,
    step,
    marks,
    sx,
    onSelected,
    ...props
  }) => {
  const [internalValue, setInternalValue] =
    useState(value ?? (max !== undefined && min !== undefined ? (min + max) / 2 : 50))

  const [isShowing, setIsShowing] = useState(false)

  const updateValueTooltip = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(parseInt(event.target.value))
    setIsShowing(true)
    if (onSelected !== undefined)
      onSelected(event.target.value)
  }
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isShowing) {
      timer = setTimeout(() => {
        setIsShowing(false)
      }, 2000) // hide after 2 seconds
    }
    return () => clearTimeout(timer) // cleanup on unmount or state change
  }, [isShowing])

  return <RangeWrapper $sx={sx}>
    {
      label !== undefined &&
      <label htmlFor={name}>{label}</label>
    }
    <RangeElement
      id={name}
      name={name}
      min={min ?? 0}
      max={max ?? 100}
      type="range"
      list={`${name ?? ''}values`}
      step={step ?? 1}
      value={internalValue}
      onChange={updateValueTooltip}
      {...props}
    />
    {
      isShowing && <output>{internalValue}</output>
    }
    {
      marks !== undefined &&
      <datalist id={`${name ?? ''}values`}>
        {
          GenerateTickMarks(min ?? 0, max ?? 100, marks ?? 25).map(element => element)
        }
      </datalist>
    }
  </RangeWrapper>
}

export default RangeSlider
