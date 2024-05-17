"use client"

import React from "react";
import InputElement from "./InputElement";
import {
  Alignment,
  AlignmentFn, BackgroundDesign, BackgroundPosition, BackgroundSize,
  Color,
  ColorFn,
  DateDesign,
  HeaderDesign,
  SocialNetworks,
  Socials, SocialsDesign
} from "web/state/schedule";
import {MenuItem, Slider, TextField} from "@mui/material";
import styled from "@emotion/styled";
import ButtonWrapper from "./ButtonWrapper";
import ColorPicker from "./ColorPicker";
import AlignmentPicker from "./AlignmentPicker";
import CollapsibleSection from "./CollapsibleSection";
import PositionSelector from "./PositionSelector";


const ControllersWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
`
const SocialsWrapper = styled.div`

`
const SocialsToolbar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
`

type HeaderDesignerProps = {
  headerDesign: HeaderDesign
  socials: Socials[]
  setMainHeader: (newHeader: string) => void
  setHeaderColor: ColorFn
  setHeaderBackgroundColor: ColorFn
  setHeaderAlignment: AlignmentFn
  setHeaderSize: (size: number) => void
  setSubHeaderSize: (size: number) => void
  dateDesign: DateDesign
  setDateAlignment: AlignmentFn
  setDateDescriptionColor: ColorFn
  setDateDescriptionTextColor: ColorFn
  setDateDayColor: ColorFn
  setDateDayTextColor: ColorFn
  addSocials: (index: number, socials: Socials) => void
  removeSocials: (index: number) => void
  socialsDesign: SocialsDesign
  setSocialsAlignment: AlignmentFn
  backgroundDesign: BackgroundDesign
  setBackgroundColor: ColorFn
  setBackgroundSize: (backgroundSize: BackgroundSize) => void
  setBackgroundPosition: (backgroundPosition: BackgroundPosition) => void
} & React.ComponentPropsWithoutRef<'section'>

const HeaderDesigner: React.FC<HeaderDesignerProps> =
  ({
     headerDesign,
     setMainHeader,
     setHeaderColor,
     setHeaderBackgroundColor,
     setHeaderAlignment,
     setHeaderSize,
     setSubHeaderSize,
     dateDesign,
     setDateAlignment,
     socials,
     addSocials,
     removeSocials,
     socialsDesign,
     setSocialsAlignment,
     backgroundDesign,
     setBackgroundColor,
     setBackgroundSize,
     setBackgroundPosition,
     setDateDescriptionColor,
     setDateDescriptionTextColor,
     setDateDayColor,
     setDateDayTextColor,
     ...props
   }) => {

    return <ControllersWrapper {...props}>
      <CollapsibleSection title='Header'>
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
      <CollapsibleSection title='Date'>
        <AlignmentPicker
          alignment={dateDesign.dateAlignment}
          setHeaderAlignment={setDateAlignment}
        />
        <ColorPicker
          title='Description Background Color'
          headerTextColor={dateDesign.dateDescriptionColor}
          setColor={setDateDescriptionColor}
        />
        <ColorPicker
          title='Description Text Color'
          headerTextColor={dateDesign.dateDescriptionTextColor}
          setColor={setDateDescriptionTextColor}
        />
        <ColorPicker
          title='Day Background Color'
          headerTextColor={dateDesign.dateDayColor}
          setColor={setDateDayColor}
        />
        <ColorPicker
          title='Day Text Color'
          headerTextColor={dateDesign.dateDayTextColor}
          setColor={setDateDayTextColor}
        />
      </CollapsibleSection>
      <CollapsibleSection title='Socials'>
        <AlignmentPicker
          alignment={socialsDesign.socialsAlignment}
          setHeaderAlignment={setSocialsAlignment}
        />
        <SocialsWrapper>
          {
            socials.map((item, index) => <SocialsToolbar key={item.network + index}>
              <TextField
                select
                label='Select Network'
                value={socials[index]?.network}
                onChange={(event) => {
                  addSocials((index), {...socials[index], network: event.target.value as SocialNetworks})
                }}
                style={{flexBasis: '200px'}}
              >
                <MenuItem value='none'>None</MenuItem>
                <MenuItem value='twitch'>Twitch</MenuItem>
                <MenuItem value='youtube'>Youtube</MenuItem>
                <MenuItem value='twitter'>Twitter</MenuItem>
              </TextField>
              <InputElement
                label='Tag'
                type='text'
                value={item.tag}
                onInput={inputText => {
                  const network = socials[index]?.network ?? 'none'
                  addSocials(index, {network, tag: inputText ?? ''})
                }}
              />
              <ButtonWrapper
                addItemFunction={() => {
                  addSocials((socials.length + 1), {network: 'none'})
                }}
                removeItemFunction={removeSocials}
                index={index}
                template={item}
                hideRemove={socials.length === 1}
                hideAdd={socials.length === 4}
              />
            </SocialsToolbar>)
          }
        </SocialsWrapper>
      </CollapsibleSection>
      <CollapsibleSection title='Background'>
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
    </ControllersWrapper>
  }

export default HeaderDesigner
