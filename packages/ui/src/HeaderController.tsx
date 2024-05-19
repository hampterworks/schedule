"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import InputElement from "./InputElement";
import ColorPicker from "./ColorPicker";
import AlignmentPicker from "./AlignmentPicker";
import {Slider} from "@mui/material";
import {AlignmentFn, ColorFn, Font, HeaderDesign} from "web/state/schedule";
import FontSelect from "./FontSelect";

type HeaderControllerProps = {
  headerDesign: HeaderDesign
  setMainHeader: (newHeader: string) => void
  setMainHeaderFont: (font: Font) => void
  setHeaderColor: ColorFn
  setHeaderBackgroundColor: ColorFn
  setHeaderAlignment: AlignmentFn
  setHeaderSize: (size: number) => void
  setSubHeaderFont: (font: Font) => void
  setSubHeaderSize: (size: number) => void
  setSubHeaderColor: ColorFn
} & React.ComponentPropsWithoutRef<'section'>

const HeaderController: React.FC<HeaderControllerProps> = ({
                                                             headerDesign,
                                                             setMainHeader,
                                                             setMainHeaderFont,
                                                             setHeaderColor,
                                                             setHeaderBackgroundColor,
                                                             setHeaderAlignment,
                                                             setHeaderSize,
                                                             setSubHeaderFont,
                                                             setSubHeaderSize,
                                                             setSubHeaderColor,
                                                             ...props
                                                           }) => {
  return <CollapsibleSection title='Header' {...props}>
    <InputElement
      label='Total days:'
      type='text'
      value={headerDesign.headerText}
      onInput={inputText =>
        setMainHeader(inputText ?? '')}
    />
    <FontSelect font={headerDesign.headerFont} setFont={setMainHeaderFont}/>
    <ColorPicker
      title='Header Text Color'
      headerTextColor={headerDesign.headerTextColor}
      setColor={setHeaderColor}
    />
    <ColorPicker
      title='Background Color'
      headerTextColor={headerDesign.headerBackgroundColor}
      setColor={setHeaderBackgroundColor}
    />
    <FontSelect font={headerDesign.subHeaderFont} setFont={setSubHeaderFont}/>
    <ColorPicker
      title='Sub-Header Color'
      headerTextColor={headerDesign.subHeaderTextColor}
      setColor={setSubHeaderColor}
    />
    <AlignmentPicker
      alignment={headerDesign.headerAlignment}
      setAlignment={setHeaderAlignment}
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
