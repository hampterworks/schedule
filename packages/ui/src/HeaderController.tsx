"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import InputElement from "./InputElement";
import ColorPicker from "./ColorPicker";
import AlignmentPicker from "./AlignmentPicker";
import {Slider} from "@mui/material";
import {AlignmentFn, ColorFn, HeaderDesign} from "web/state/schedule";

type HeaderControllerProps = {
  headerDesign: HeaderDesign
  setMainHeader: (newHeader: string) => void
  setHeaderColor: ColorFn
  setHeaderBackgroundColor: ColorFn
  setHeaderAlignment: AlignmentFn
  setHeaderSize: (size: number) => void
  setSubHeaderSize: (size: number) => void
} & React.ComponentPropsWithoutRef<'section'>

const HeaderController: React.FC<HeaderControllerProps> = ({
                                                             headerDesign,
                                                             setMainHeader,
                                                             setHeaderColor,
                                                             setHeaderBackgroundColor,
                                                             setHeaderAlignment,
                                                             setHeaderSize,
                                                             setSubHeaderSize, ...props
                                                           }) => {
  return <CollapsibleSection title='Header' {...props}>
    <InputElement
      label='Total days:'
      type='text'
      value={headerDesign.headerText}
      onInput={inputText =>
        setMainHeader(inputText ?? '')}
    />
    <ColorPicker
      title='Text Color'
      headerTextColor={headerDesign.headerTextColor}
      setColor={setHeaderColor}
    />
    <ColorPicker
      title='Background Color'
      headerTextColor={headerDesign.headerBackgroundColor}
      setColor={setHeaderBackgroundColor}
    />
    <AlignmentPicker
      alignment={headerDesign.headerAlignment}
      setHeaderAlignment={setHeaderAlignment}
    />
    <Slider
      value={headerDesign.headerTextSize}
      aria-label="Default"
      valueLabelDisplay="auto"
      step={1}
      marks
      min={10}
      max={55}
      onChange={(_, value) => {
        setHeaderSize(!Array.isArray(value) ? value : 22)
      }}
    />
    <Slider
      value={headerDesign.subHeaderTextSize}
      aria-label="Default"
      valueLabelDisplay="auto"
      step={1}
      marks
      min={10}
      max={55}
      onChange={(_, value) => {
        setSubHeaderSize(!Array.isArray(value) ? value : 16)
      }}
    />
  </CollapsibleSection>
}

export default HeaderController
