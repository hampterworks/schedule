"use client"


import React from "react";
import InputElement from "./InputElement";
import {SocialNetworks, Socials} from "web/state/schedule";
import {Button, MenuItem, Select, TextField} from "@mui/material";
import styled from "@emotion/styled";
import ButtonWrapper from "./ButtonWrapper";


const ControllersWrapper = styled.section`
  padding: 16px;
`
const SocialsWrapper = styled.div`
  margin-top: 32px;
`
const SocialsToolbar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
`

type HeaderDesignerProps = {
  mainHeader: string
  socials: Socials[]
  setMainHeader: (newHeader: string) => void
  addSocials: (index: number, socials: Socials) => void,
  removeSocials: (index: number) => void,
} & React.ComponentPropsWithoutRef<'section'>

const HeaderDesigner: React.FC<HeaderDesignerProps> =
  ({
     mainHeader,
     setMainHeader,
     socials,
     addSocials,
     removeSocials,
     ...props
   }) => {

    return <ControllersWrapper {...props}>
      <InputElement
        label='Total days:'
        type='text'
        value={mainHeader}
        onInput={inputText =>
          setMainHeader(inputText ?? '')}
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
    </ControllersWrapper>
  }

export default HeaderDesigner
