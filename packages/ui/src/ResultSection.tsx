"use client"

import React, {useState} from "react";
import {Template} from "web/state/schedule";
import {DateTime} from "luxon";
import styled from "@emotion/styled";
import {Snackbar} from "@mui/material";
import ButtonElement from "./ButtonElement";

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

type ResultSectionProps = {
  templates: Template[]
  timezones: string[]
}

const ResultSection: React.FC<ResultSectionProps> = ({templates, timezones}) => {
  const [copyNotice, setCopyNotice] = useState<string | null>(null)

  const templateWithTimezone = templates.map(template => {
    const date = (typeof template.date === 'string') ? DateTime.fromISO(template.date) : template.date
    const time = template.time !== undefined ? template.time.split(':') : undefined

    if (time !== undefined) {
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
      discordTime: `<t:${Math.floor(date.toSeconds())}:F> (<t:${Math.floor(date.toSeconds())}:R>) ${template.description ?? ''}`
    }
  })

  return <ResultWrapper>
    <h2>Discord time format</h2>
    <DiscordDisplay>
      {
        templateWithTimezone.map((item, index) =>
          <li key={item.discordTime + index}>{item.discordTime}</li>)
      }
      <ButtonElement onClick={() => {
        navigator.clipboard.writeText(`${templateWithTimezone.map(item => item.discordTime).join('\n')}`)
          .then(() => setCopyNotice("Text copied successful!"))
          .catch(error => setCopyNotice("Failed to copy text!"))
      }}>Copy</ButtonElement>
    </DiscordDisplay>
    <HeaderWrapper>
      <h2>Generic time format</h2>
      <ButtonElement onClick={() => {
        navigator.clipboard.writeText(templateWithTimezone
          .map(item =>
            `${item.date}\n${item.description ?? 'No description'}\n${item.timezones?.join('\n')}`)
          .join('\n')
          .replace('undefined', ''))
          .then(() => setCopyNotice("Text copied successful!"))
          .catch(error => setCopyNotice("Failed to copy text!"))
      }}>Copy All</ButtonElement>
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
            <ButtonElement onClick={() => {
              navigator.clipboard.writeText(`${template.date}\n${template.description}\n${template.timezones?.join('\n')}`)
                .then(() => setCopyNotice("Text copied successful!"))
                .catch(error => setCopyNotice("Failed to copy text!"))
            }}>Copy</ButtonElement>
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
