"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import {BackgroundDesign, BackgroundPosition, BackgroundSize, ColorFn} from "web/state/schedule";
import {Slider} from "@mui/material";
import ColorPicker from "./ColorPicker";
import PositionSelector from "./PositionSelector";

type BackgroundControllerProps = {
  backgroundDesign: BackgroundDesign
  setBackgroundColor: ColorFn
  setBackgroundSize: (backgroundSize: BackgroundSize) => void
  setBackgroundPosition: (backgroundPosition: BackgroundPosition) => void
} & React.ComponentPropsWithoutRef<'section'>

const BackgroundController: React.FC<BackgroundControllerProps> = ({
                                                                     backgroundDesign,
                                                                     setBackgroundColor,
                                                                     setBackgroundSize,
                                                                     setBackgroundPosition,
                                                                     ...props
                                                                   }) => {
  return <CollapsibleSection title='Background' {...props}>
    <ColorPicker
      title='Background Color'
      headerTextColor={backgroundDesign.backgroundColor}
      setColor={setBackgroundColor}
    />
    <Slider
      value={backgroundDesign.backgroundSize === 'auto' ? 100 : parseInt(backgroundDesign.backgroundSize.replace('%', ''))}
      aria-label="Default"
      valueLabelDisplay="auto"
      step={10}
      marks
      min={10}
      max={200}
      onChange={(_, value) => {
        setBackgroundSize(value + '%')
      }}
    />
    <PositionSelector
      backgroundPosition={backgroundDesign.backgroundPosition}
      setBackgroundPosition={setBackgroundPosition}
    />
  </CollapsibleSection>
}

export default BackgroundController
