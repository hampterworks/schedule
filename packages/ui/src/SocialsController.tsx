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

type SocialsControllerProps = {
  socials: Socials[]
  addSocials: (index: number, socials: Socials) => void
  removeSocials: (index: number) => void
  socialsDesign: SocialsDesign
  setSocialsAlignment: AlignmentFn
} & React.ComponentPropsWithoutRef<'section'>

const SocialsController: React.FC<SocialsControllerProps> = ({
                                                               socials,
                                                               addSocials,
                                                               removeSocials,
                                                               socialsDesign,
                                                               setSocialsAlignment,
                                                               ...props
                                                             }) => {
  return <CollapsibleSection title='Socials' {...props}>
    <AlignmentPicker
      alignment={socialsDesign.socialsAlignment}
      setAlignment={setSocialsAlignment}
    />
    <div>
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
    </div>
  </CollapsibleSection>
}

export default SocialsController