"use client"

import * as React from "react";
import styled from "styled-components";
import Input from "./components/Input";
import {DateTime} from "luxon";
import Button from "./components/Button";
import {Template} from "web/state/schedule";
import ToolTip from "./components/ToolTip";
import Select from "./components/Select";

const ControlSectionWrapper = styled.section`
    display: flex;
    color: ${props => props.theme.textColor};
    flex-direction: column;
`

const ControlItem = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
`
const ControlHeader = styled.div`
    display: flex;
    gap: 16px;
    justify-content: flex-start;
    align-items: center;
    margin: 32px 0 8px 0;
`

type ControlSectionProps = {
  startingDate: DateTime | string
  setStartingDate: (startingDate: DateTime, templates: Template[]) => void
  templates: Template[]
  totalStreams: number
  setTotalStreams: (totalStreams: number, startingDate: DateTime) => void
  resetTemplate: () => void
  timeZones: string[]
  setTimeZones: (timeZones: string[]) => void

} & React.ComponentPropsWithoutRef<'section'>

const ControlSection: React.FC<ControlSectionProps> = ({
                                                         startingDate,
                                                         setStartingDate,
                                                         templates,
                                                         totalStreams,
                                                         setTotalStreams,
                                                         resetTemplate,
                                                         timeZones,
                                                         setTimeZones,
                                                         ...props
                                                       }) => {
  const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timeZoneList = Intl.supportedValuesOf('timeZone').filter(zone => zone !== systemTimeZone)
  return (
    <ControlSectionWrapper {...props}>
      <ControlItem>
        <Input
          label='Starting date:'
          type='date'
          value={typeof startingDate !== 'string'
            ? startingDate.toISODate() ?? ''                          //If the date is type Date convert it to a string
            : DateTime.fromISO(startingDate).toISODate() ?? ''}      //If the date is type string convert it to a Date and then to a string
          onInput={(date) => {
            if (date !== null)
              setStartingDate(DateTime.fromISO(date as string), templates)
          }}
        />
        <Input
          label='Total days:'
          type='number'
          value={totalStreams.toString()}
          onInput={event =>
            setTotalStreams(parseInt(event as string ?? '1'), (typeof startingDate === "string") ? DateTime.fromISO(startingDate) : startingDate)}
        />
        <Button
          label='Reset'
          size='large'
          onClick={() => {
            resetTemplate()
            const dbRequest = window.indexedDB.open('HampterStore', 3)

            dbRequest.onsuccess = (event) => {
              const db = (event.target as IDBOpenDBRequest).result
              const transaction = db.transaction('backgroundImage', 'readwrite')
              const objectStore = transaction.objectStore('backgroundImage')

              const clearRequest = objectStore.clear()

              clearRequest.onerror = (event) => {
                console.error("Error clearing store:", event)
              }

              clearRequest.onsuccess = () => {
                console.info("Store cleared successfully")
              }
            }

            dbRequest.onerror = (event) => {
              console.error("Error opening database:", event)
            }
          }}
        />
      </ControlItem>
      <ControlHeader>
        Select timezones: {systemTimeZone}
        <ToolTip message="Your system's timezone is automatically selected."/>
      </ControlHeader>
      <div>
        <Select
          options={timeZoneList.map(item => ({value: item, title: item}))}
          selectedValue={timeZones.map(item => ({value: item, title: item}))}
          onSelectedValue={(event) => {
            setTimeZones(event.map(item => item.value))
          }}
          searchable
          multiple
        />
      </div>
    </ControlSectionWrapper>
  )
}

export default ControlSection
