"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import {BackgroundDesign, BackgroundPosition, BackgroundSize, ColorFn} from "web/state/schedule";
import ColorPicker from "./ColorPicker";
import PositionSelector from "./PositionSelector";
import SliderSelect from "./SliderSelect";
import styled from "@emotion/styled";

const BackgroundContainer = styled.div`
    display: flex;
    gap: 32px;
`
/**
 * BackgroundControllerProps defines the props for the BackgroundController component.
 * @typedef {Object} BackgroundControllerProps
 * @property {BackgroundDesign} backgroundDesign - The design of the background.
 * @property {ColorFn} setBackgroundColor - A function to set the background color.
 * @property {function} setBackgroundSize - A function to set the background size.
 * @property {function} setBackgroundPosition - A function to set the background position.
 * @property {React.ComponentPropsWithoutRef<'section'>} - Additional props for the underlying section element.
 */
type BackgroundControllerProps = {
  backgroundDesign: BackgroundDesign
  setBackgroundColor: ColorFn
  setBackgroundSize: (backgroundSize: BackgroundSize) => void
  setBackgroundPosition: (backgroundPosition: BackgroundPosition) => void
} & React.ComponentPropsWithoutRef<'section'>

/**
 * BackgroundController component represents a controller for managing the background component.
 *
 * @component
 * @param {Object} backgroundDesign - The background design object containing properties like backgroundColor, backgroundSize, backgroundPosition, etc.
 * @param {function} setBackgroundColor - A function to set the background color.
 * @param {function} setBackgroundSize - A function to set the background size.
 * @param {function} setBackgroundPosition - A function to set the background position.
 * @param {Object} props - Other props to be passed to the component.
 * @returns {JSX.Element} - The rendered BackgroundController component.
 */
const BackgroundController: React.FC<BackgroundControllerProps> = (
  {
    backgroundDesign,
    setBackgroundColor,
    setBackgroundSize,
    setBackgroundPosition,
    ...props
  }) => {
  return <CollapsibleSection title='Background' {...props}>
    <BackgroundContainer>
      <ColorPicker
        title='Background Color'
        colorValue={backgroundDesign.backgroundColor}
        setColor={setBackgroundColor}
      />
      <SliderSelect
        title='Background Size'
        size={backgroundDesign.backgroundSize === 'auto' ? 100 : parseInt(backgroundDesign.backgroundSize.replace('%', ''))}
        min={10}
        max={200}
        step={10}
        fontSizeSetter={(value) => setBackgroundSize(value + '%')}
      />
    </BackgroundContainer>
    <PositionSelector
      backgroundPosition={backgroundDesign.backgroundPosition}
      setBackgroundPosition={setBackgroundPosition}
    />
  </CollapsibleSection>
}

export default BackgroundController
