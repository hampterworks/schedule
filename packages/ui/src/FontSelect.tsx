'use client'

import React from "react";
import {holtwoodOneSC, merriweather, peralta, roboto, robotoSlab} from "web/fonts/googlefonts"
import {MenuItem, TextField} from "@mui/material";
import {Font} from "web/state/schedule";
import styled from "@emotion/styled";

const FontSelectorWrapper = styled.div`
    display: flex;
    gap: 8px;
    > * {
        flex-basis: 250px;
    }
`

const fonts = {
  roboto: {
    font: roboto,
    key: 'roboto',
    weight: ['100', '400', '700', '900']
  },
  robotoSlab: {
    font: robotoSlab,
    key: 'robotoSlab',
    weight: ['200', '400', '700']
  },
  peralta: {
    font: peralta,
    key: 'peralta',
    weight: ['400']
  },
  merriweather: {
    font: merriweather,
    key: 'merriweather',
    weight: ['400', '700', '900']
  },
  holtwoodOneSC: {
    font: holtwoodOneSC,
    key: 'holtwoodOneSC',
    weight: ['400']
  },
}

type FontSelectorProps = {
  font: Font,
  setFont: (font: Font) => void,
} & React.ComponentPropsWithoutRef<'div'>

const FontSelector: React.FC<FontSelectorProps> = ({font, setFont, ...props}) => {

  return <FontSelectorWrapper {...props}>
    <TextField
      select
      label='Select Font'
      value={font.key}
      onChange={(event,) => {
        setFont(
          {
            key: event.target.value,
            className: event.target.value !== 'none'
              ? fonts[event.target.value as keyof typeof fonts].font.className
              : '',
            weight: '400'
          })
      }}
    >
      <MenuItem value='none'>Default</MenuItem>
      {
        Object.keys(fonts).map(item => {
          return <MenuItem key={fonts[item as keyof typeof fonts].font.className} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </MenuItem>
        })
      }
    </TextField>
    {
      font.key !== 'none' &&
      <TextField
        select
        label='Select Weight'
        value={font.weight}
        onChange={(event,) => {
          setFont({...font,  weight: event.target.value})
        }}
      >
        {
          fonts[font.key as keyof typeof fonts].weight.map(item => {
            return <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          })
        }
      </TextField>
    }
  </FontSelectorWrapper>
}

export default FontSelector
