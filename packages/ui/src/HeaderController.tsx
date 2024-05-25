"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import InputElement from "./InputElement";
import ColorPicker from "./ColorPicker";
import AlignmentPicker from "./AlignmentPicker";
import {Slider} from "@mui/material";
import {AlignmentFn, ColorFn, Font, HeaderDesign} from "web/state/schedule";
import FontSelect from "./FontSelect";
import styled from "@emotion/styled";
import SliderSelect from "./SliderSelect";

const FontContainer = styled.div`
    display: flex;
    width: max-content;
    gap: 32px;
`
const ControlsContainer = styled.div`
    display: flex;
    gap: 32px;
`

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

const HeaderController: React.FC<HeaderControllerProps> = (
  {
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
      label='Header Text:'
      type='text'
      value={headerDesign.headerText}
      onInput={inputText =>
        setMainHeader(inputText ?? '')}
    />
    <FontContainer>
      <FontSelect
        font={headerDesign.headerFont}
        setFont={setMainHeaderFont}
        title='Header Font'
      />
      <FontSelect
        font={headerDesign.subHeaderFont}
        setFont={setSubHeaderFont}
        title='Sub-header Font'
      />
    </FontContainer>
    <ControlsContainer>
      <AlignmentPicker
        alignment={headerDesign.headerAlignment}
        setAlignment={setHeaderAlignment}
      />
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
      <ColorPicker
        title='Sub-Header Color'
        headerTextColor={headerDesign.subHeaderTextColor}
        setColor={setSubHeaderColor}
      />
      <SliderSelect
        title='Header Font Size'
        size={headerDesign.headerTextSize}
        min={10}
        max={55}
        fontSizeSetter={setHeaderSize}
      />
      <SliderSelect
        title='Sub-header Font Size'
        size={headerDesign.subHeaderTextSize}
        min={10}
        max={55}
        fontSizeSetter={setSubHeaderSize}
      />
    </ControlsContainer>
  </CollapsibleSection>
}

export default HeaderController
