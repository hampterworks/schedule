"use client"

import React, {useEffect, useState} from "react";
import Check from "./icons/Check";
import styled from "@emotion/styled";

const CheckboxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    label, svg {
        cursor: pointer;
    }
    &:hover {
        svg path:last-of-type {
            display: block;
        }
    }
    
    span {
        display: block;
        margin-left: -14px;
        margin-top: -4px;
    }
`

type CheckboxProps = {
  title: string
  name: string
  isChecked?: boolean
  onChecked?: (checked: boolean) => void
  required?: boolean
} & React.ComponentPropsWithRef<'input'>

const Checkbox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (props, ref) => {
  const [selected, setSelected] = useState<boolean>(false)

  const {
    title,
    name,
    isChecked,
    onChecked,
    required,
    ...restProps
  } = props

  useEffect(() => {
    if (isChecked !== undefined)
      setSelected(isChecked)
  }, [isChecked])

  return <CheckboxWrapper>
    <Check isToggled={selected} onClick={() => {
      setSelected(!selected)
      if (onChecked !== undefined)
        onChecked(!selected)
    }}/>
    <label htmlFor={name}>{title}</label>

    <input
      ref={ref}
      name={name}
      id={name}
      type="checkbox"
      checked={selected}
      required={required}
      onChange={() => {
        setSelected(!selected)
        if (onChecked !== undefined)
          onChecked(!selected)
      }}
      {...restProps}
    />
  </CheckboxWrapper>
}

export default React.forwardRef(Checkbox)
