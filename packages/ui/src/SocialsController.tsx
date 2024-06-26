"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import AlignmentPicker from "./AlignmentPicker";
import {AlignmentFn, SocialNetworks, Socials, SocialsDesign} from "web/state/schedule";
import {MenuItem, TextField} from "@mui/material";
import InputElement from "./InputElement";
import ButtonWrapper from "./ButtonWrapper";
import styled from "@emotion/styled";

const SocialsToolbar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
`
const SocialsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

/**
 * Props for the SocialsController component
 *
 * @typedef {Object} SocialsControllerProps
 * @property {Socials[]} socials - The list of socials
 * @property {function} addSocials - Function to add socials at a specific index
 * @property {function} removeSocials - Function to remove socials at a specific index
 * @property {SocialsDesign} socialsDesign - The design settings for the socials
 * @property {function} setSocialsAlignment - Function to set the alignment for the socials
 * @property {string} [creditsTag] - An optional tag for credits
 * @property {function} setCreditsTag - Function to set the credits tag
 * @property {React.ComponentPropsWithoutRef<'section'>} - Additional props for the section element
 */
type SocialsControllerProps = {
  socials: Socials[]
  addSocials: (index: number, socials: Socials) => void
  removeSocials: (index: number) => void
  socialsDesign: SocialsDesign
  setSocialsAlignment: AlignmentFn
  creditsTag?: string
  setCreditsTag: (creditsTag: string) => void
} & React.ComponentPropsWithoutRef<'section'>

/**
 * React functional component for managing socials and credits.
 *
 * @component
 * @param {SocialsControllerProps} props - The props for the SocialsController component.
 * @returns {JSX.Element} - The rendered SocialsController component.
 */
const SocialsController: React.FC<SocialsControllerProps> = (
  {
    socials,
    addSocials,
    removeSocials,
    socialsDesign,
    setSocialsAlignment,
    creditsTag,
    setCreditsTag,
    ...props
  }) => {
  return <CollapsibleSection title='Socials and credits' {...props}>
    <InputElement
      label='Credits'
      type='text'
      value={creditsTag}
      onInput={inputText => {
        setCreditsTag(inputText ?? '')
      }}
    />
    <SocialsContainer>
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
            hideAdd={socials.length === 5}
          />
        </SocialsToolbar>)
      }
    </SocialsContainer>
    <AlignmentPicker
      alignment={socialsDesign.socialsAlignment}
      setAlignment={setSocialsAlignment}
    />
  </CollapsibleSection>
}

export default SocialsController
