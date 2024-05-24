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
    flex-direction: column;
    gap: 8px;
    span {
        color: rgba(0, 0, 0, 0.6);
        font-size: 13px;
        white-space: nowrap;
    }
`

const ColorWindow = styled.button<{ $selectedColor: Color }>`
    background: ${props => `rgba(${props.$selectedColor.r}, ${props.$selectedColor.g}, ${props.$selectedColor.b}, ${props.$selectedColor.a})`};
    height: 25px;
    width: 120px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid black;
    
    &:after {
        content: '';
        background: #000000;
        width: 142%;
        height: 142%;
        position: absolute;
        transform: rotate(45deg) translate(55%, -90%);
        border: 2px solid white;
        transition: transform 200ms;
    }

    &:hover {
        &:after {
            transform: rotate(45deg) translate(53%, -85%);
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
      <span>{title}</span>
      <ColorWindow onClick={() => setIsToggled(!isToggled)} $selectedColor={headerTextColor}/>
    </ColorWindowWrapper>
    {
      isToggled &&
      <RgbaColorPicker color={headerTextColor} onChange={setColor}/>
    }
  </ColorPickerWrapper>
}

export default ColorPicker
