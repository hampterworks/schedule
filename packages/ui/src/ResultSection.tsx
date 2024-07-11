"use client"

import React, {useState} from "react";
import {Template} from "web/state/schedule";
import {DateTime} from "luxon";
import {Snackbar} from "@mui/material";
import Button from "./components/Button";
import styled, {css} from "styled-components";

const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    ul {
        width: 100%;
    }
    li {
        display: flex;
        flex-direction: column;
        gap: 16px;
        
    }
`

const DateDisplay = styled.ul`
    li {
        margin-bottom: 32px;
        background: #f8f8f8;;
        padding: 16px;
        border-radius: 4px;
    }
`

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
`

const DiscordDisplay = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #f8f8f8;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 4px;
`

/**
 * Represents the properties for the ResultSection component.
 * @typedef {Object} ResultSectionProps
 * @property {Template[]} templates - An array of templates.
 * @property {string[]} timezones - An array of timezones.
 */
type ResultSectionProps = {
  templates: Template[]
  timezones: string[]
}

/**
 * ResultSection component renders a section with templates and their corresponding time formats.
 * It provides options to copy the time formats to clipboard.
 *
 * @param {Object} templates - An array of template objects.
 * @param {Object[]} timezones - An array of timezone objects.
 *
 * @returns {JSX.Element} - Returns the JSX element for the ResultSection component.
 */
const ResultSection: React.FC<ResultSectionProps> = ({templates, timezones}) => {
  const [copyNotice, setCopyNotice] = useState<string | null>(null)

  const templateWithTimezone = templates.map(template => {
    const date = (typeof template.date === 'string') ? DateTime.fromISO(template.date) : template.date
    const time = template.time !== undefined ? template.time.split(':') : undefined

    if (time !== undefined && template.wholeDay !== true) {
      const updatedDate = date.set({hour: parseInt(time[0] ?? '12'), minute: parseInt(time[1] ?? '00')})
      const discordTime = `<t:${Math.floor(updatedDate.toSeconds())}:F> (<t:${Math.floor(updatedDate.toSeconds())}:R>) ${template.description ?? ''}`

      const calculatedTimezones = timezones.map(timezone =>
        updatedDate.setZone(timezone).toFormat('EEEE, MM/d/yyyy hh:mm a z').replace('_', ' '))

      return {
        date: updatedDate.toFormat('EEEE, MM/d/yyyy hh:mm a z'),
        description: template.description,
        timezones: calculatedTimezones,
        discordTime: discordTime
      }
    }

    date.set({hour: parseInt('12'), minute: parseInt('00')})

    return {
      date: date.toFormat('EEEE, MM/d/yyyy'),
      description: template.description,
      discordTime: `<t:${Math.floor(date.toSeconds())}:D> (<t:${Math.floor(date.toSeconds())}:R>) ${template.description ?? ''}`
    }
  })

  return <ResultWrapper>
    <h2>Discord time format</h2>
    <DiscordDisplay>
      {
        templateWithTimezone.map((item, index) =>
          <li key={item.discordTime + index}>{item.discordTime}</li>)
      }
      <Button
        label='Copy'
        onClick={() => {
          navigator.clipboard.writeText(`${templateWithTimezone.map(item => item.discordTime).join('\n')}`)
            .then(() => setCopyNotice("Text copied successful!"))
            .catch(error => setCopyNotice("Failed to copy text!"))
        }}
        sx={css({width: '100%'})}
      />
    </DiscordDisplay>
    <HeaderWrapper>
      <h2>Generic time format</h2>
      <Button
        label='Copy All'
        onClick={() => {
          navigator.clipboard.writeText(templateWithTimezone
            .map(item =>
              `${item.date}\n${item.description ?? 'No description'}\n${item.timezones !== undefined ? item.timezones.join('\n') : ''}`)
            .join('\n')
            .replace('undefined', ''))
            .then(() => setCopyNotice("Text copied successful!"))
            .catch(error => setCopyNotice("Failed to copy text!"))
        }}
      />
    </HeaderWrapper>
    <DateDisplay>
      {
        templateWithTimezone.map((template, index) =>
          <li key={template.date + index}>
            <div>{template.date}</div>
            <div>{template.description ?? 'No description'}</div>
            <ul>
              {template.timezones?.map(timezone => <li key={timezone}>- {timezone}</li>)}
            </ul>
            <Button
              label='Copy'
              onClick={() => {
                navigator.clipboard.writeText(`${template.date}\n${template.description}\n${template.timezones?.join('\n')}`)
                  .then(() => setCopyNotice("Text copied successful!"))
                  .catch(error => setCopyNotice("Failed to copy text!"))
              }}
              sx={css({width: '100%'})}
            />
          </li>
        )
      }
    </DateDisplay>
    {
      copyNotice !== null &&
      <Snackbar
        open={true}
        autoHideDuration={2000}
        onClose={() => setCopyNotice(null)}
        message={copyNotice}
      />
    }
  </ResultWrapper>
}

export default ResultSection
