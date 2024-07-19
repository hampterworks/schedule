"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import ColorPicker from "./ColorPicker";
import AlignmentPicker from "./AlignmentPicker";
import {AlignmentFn, ColorFn, Font, HeaderDesign} from "web/state/schedule";
import FontSelect from "./FontSelect";
import styled from "@emotion/styled";
import SliderSelect from "./SliderSelect";
import Input from "./components/Input";

const FontContainer = styled.div`
    display: flex;
    gap: 32px;
`
const ControlsContainer = styled.div`
    display: flex;
    gap: 32px;
`

/**
 * Represents the props for the HeaderController component.
 *
 * @typedef {Object} HeaderControllerProps
 * @property {HeaderDesign} headerDesign - The design of the header.
 * @property {function} setMainHeader - A function to set the main header.
 * @property {function} setMainHeaderFont - A function to set the font of the main header.
 * @property {function} setHeaderColor - A function to set the color of the header.
 * @property {function} setHeaderBackgroundColor - A function to set the background color of the header.
 * @property {function} setHeaderAlignment - A function to set the alignment of the header.
 * @property {function} setHeaderSize - A function to set the size of the header.
 * @property {function} setSubHeaderFont - A function to set the font of the sub header.
 * @property {function} setSubHeaderSize - A function to set the size of the sub header.
 * @property {function} setSubHeaderColor - A function to set the color of the sub header.
 * @property {React.ComponentPropsWithoutRef<'section'>} - The props for the <section> element.
 */
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

/**
 * HeaderController is a React functional component that represents a header section with customizable design options.
 *
 * @param {Object} HeaderControllerProps - The properties for the HeaderController component.
 * @param {Object} headerDesign - The design options for the header.
 * @param {function} setMainHeader - The function to set the main header text.
 * @param {function} setMainHeaderFont - The function to set the main header font.
 * @param {function} setHeaderColor - The function to set the header text color.
 * @param {function} setHeaderBackgroundColor - The function to set the header background color.
 * @param {function} setHeaderAlignment - The function to set the header alignment.
 * @param {function} setHeaderSize - The function to set the header font size.
 * @param {function} setSubHeaderFont - The function to set the sub-header font.
 * @param {function} setSubHeaderSize - The function to set the sub-header font size.
 * @param {function} setSubHeaderColor - The function to set the sub-header text color.
 * @param {Object} props - Additional props for the HeaderController component.
 *
 * @returns {JSX.Element} - The rendered HeaderController component.
 */
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
    <Input
      label='Header Text:'
      placeholder='Edit header text'
      value={headerDesign.headerText}
      onInput={inputText =>
        setMainHeader((inputText as string) ?? '')}
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
        colorValue={headerDesign.headerTextColor}
        setColor={setHeaderColor}
      />
      <ColorPicker
        title='Background Color'
        colorValue={headerDesign.headerBackgroundColor}
        setColor={setHeaderBackgroundColor}
      />
      <ColorPicker
        title='Sub-Header Color'
        colorValue={headerDesign.subHeaderTextColor}
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
