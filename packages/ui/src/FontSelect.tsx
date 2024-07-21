'use client'

import React from "react";
import {holtwoodOneSC, merriweather, peralta, roboto, robotoSlab} from "web/fonts/googlefonts"
import {Font} from "web/state/schedule";
import Select from "./components/Select";
import styled from "styled-components";

const FontSelectorWrapper = styled.div`
    display: flex;
    gap: 8px;
`

/**
 * Represents a collection of variable fonts.
 *
 * @typedef {Object} Font
 * @property {string} font - The actual font file.
 * @property {string} key - The key or identifier for the font.
 * @property {string[]} weight - The available weights for the font.
 */
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

/**
 * Props for the FontSelector component.
 *
 * @typedef {Object} FontSelectorProps
 * @property {Font} font - The currently selected font.
 * @property {function} setFont - A function to set the selected font.
 * @property {string} [title] - Optional title for the FontSelector component.
 * @property {React.ComponentPropsWithoutRef<'div'>} - Additional props for the wrapping 'div' element.
 */
type FontSelectorProps = {
  font: Font,
  setFont: (font: Font) => void,
  title?: string
} & React.ComponentPropsWithoutRef<'div'>

/**
 * FontSelector component renders a font selector UI with options to select font and weight.
 *
 * @component
 * @param {Object} font - The currently selected font.
 * @param {Function} setFont - A callback function to set the selected font.
 * @param {string} title - The title of the font selector.
 * @param {...Object} props - Additional props to be passed to the FontSelectorWrapper component.
 * @returns {ReactElement} The rendered FontSelector component.
 */
const FontSelector: React.FC<FontSelectorProps> = ({font, setFont, title, ...props}) => {

  return <FontSelectorWrapper {...props}>
    <Select
      label={title}
      selectedValue={{value: font.key, title: font.key}}
      options={
        [
          {
            title: 'Default',
            value: 'Default'
          },
          ...Object.keys(fonts).map(key => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            value: key
          }))
        ]
      }
      onSelectedValue={(event) => {
        const key = event[0]?.value
        if (key !== undefined) {
          setFont(
            {
              key: key,
              className: key !== 'Default'
                ? fonts[key as keyof typeof fonts].font.className
                : '',
              weight: '400'
            })
        }
      }}
    />
    {
      font.key !== 'Default' &&
      <Select
        label='Select Weight'
        key={font.key}
        selectedValue={{value: font.weight, title: font.weight}}
        options={
          fonts[font.key as keyof typeof fonts].weight.map(item => ({
            value: item,
            title: item
          }))
        }
        onSelectedValue={event => {
          setFont({...font,  weight: event[0]?.value ?? '400'})
        }}
      />
    }
  </FontSelectorWrapper>
}

export default FontSelector
