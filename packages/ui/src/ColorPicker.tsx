"use client"

import * as React from "react";
import styled from "@emotion/styled";
import {RgbaColorPicker} from "react-colorful";
import {Color} from "web/state/schedule";
import {useRef, useState} from "react";
import useClickOutside from "./hooks/useClickOutside";

const ColorPickerWrapper = styled.div`
    width: max-content;
    position: relative;

    .react-colorful {
        position: absolute;
        top: calc(100% + 8px);
        z-index: 2;
    }
`

const ColorWindowWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 8px;
`

const ColorWindow = styled.button<{ $selectedColor: Color }>`
    background: ${props => `rgba(${props.$selectedColor.r}, ${props.$selectedColor.g}, ${props.$selectedColor.b}, ${props.$selectedColor.a})`};
    height: 50px;
    width: 50px;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:after {
        content: '';
        background: #000000;
        width: 142%;
        height: 142%;
        position: absolute;
        transform: rotate(45deg) translate(40%, -20%);
        border: 2px solid white;
        transition: transform 200ms;
    }

    &:hover {
        &:after {
            transform: rotate(45deg) translate(38%, -20%);
        }
    }
`

type ColorPickerProps = {
  title: string
  headerTextColor: Color
  setColor: (color: Color) => void
} & React.ComponentPropsWithoutRef<'div'>

const ColorPicker: React.FC<ColorPickerProps> = ({title, headerTextColor, setColor, ...props}) => {
  const clickRef = useRef<HTMLDivElement>(null)
  const [isToggled, setIsToggled] = useState(false)

  useClickOutside(clickRef, () => {
    if (isToggled)
      setIsToggled(false)
  })

  return <ColorPickerWrapper ref={clickRef} {...props}>
    <ColorWindowWrapper>
      <ColorWindow onClick={() => setIsToggled(!isToggled)} $selectedColor={headerTextColor}/>
      <span>{title}</span>
    </ColorWindowWrapper>
    {
      isToggled &&
      <RgbaColorPicker color={headerTextColor} onChange={setColor}/>
    }
  </ColorPickerWrapper>
}

export default ColorPicker
