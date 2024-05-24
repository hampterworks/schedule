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

type BackgroundControllerProps = {
  backgroundDesign: BackgroundDesign
  setBackgroundColor: ColorFn
  setBackgroundSize: (backgroundSize: BackgroundSize) => void
  setBackgroundPosition: (backgroundPosition: BackgroundPosition) => void
} & React.ComponentPropsWithoutRef<'section'>

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
        headerTextColor={backgroundDesign.backgroundColor}
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
