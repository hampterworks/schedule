"use client"

import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import AlignmentPicker from "./AlignmentPicker";
import {AlignmentFn, SocialNetworks, Socials, SocialsDesign} from "web/state/schedule";
import ButtonWrapper from "./ButtonWrapper";
import styled from "@emotion/styled";
import Input from "./components/Input";
import Select from "./components/Select";

const SocialsToolbar = styled.div`
    width: 100%;
    display: flex;
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
    <Input
      label='Credits Tag'
      value={creditsTag}
      onInput={inputText => {
        setCreditsTag((inputText as string) ?? '')
      }}
    />
    <SocialsContainer>
      {
        socials.map((item, index) => <SocialsToolbar key={item.network + index}>
          <Select
            label='Select Network'
            selectedValue={{value: socials[index]?.network ?? 'none', title: socials[index]?.network ?? 'None'}}
            options={
              [
                {
                  title: 'None',
                  value: 'none'
                },
                {
                  title: 'Twitch',
                  value: 'twitch'
                },
                {
                  title: 'Youtube',
                  value: 'youtube'
                },
                {
                  title: 'Twitter',
                  value: 'twitter'
                }
              ]
            }
            onSelectedValue={(event) => {
              addSocials((index), {...socials[index], network: event[0]?.value as SocialNetworks})
            }}
          />
          <Input
            label='Social Tag'
            value={item.tag}
            onInput={inputText => {
              const network = socials[index]?.network ?? 'None'
              addSocials(index, {network, tag: (inputText as string) ?? ''})
            }}
          />
          <ButtonWrapper
            addItemFunction={() => {
              addSocials((socials.length + 1), {network: 'None'})
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
