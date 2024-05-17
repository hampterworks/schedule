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
  dateDesign: DateDesign
  setDateAlignment: AlignmentFn
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
      </CollapsibleSection>
      <CollapsibleSection title='Date'>
        <AlignmentPicker
          alignment={dateDesign.dateAlignment}
          setHeaderAlignment={setDateAlignment}
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
      </CollapsibleSection>
      <PositionSelector
        backgroundPosition={backgroundDesign.backgroundPosition}
        setBackgroundPosition={setBackgroundPosition}
      />
    </ControllersWrapper>
  }

export default HeaderDesigner
