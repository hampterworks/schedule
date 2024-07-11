"use client";
import styles from "./page.module.css";
import React from "react";
import useScheduleStore from "../state/schedule";
import DatePickerElement from "@repo/ui/DatePickerElement";
import {DateTime} from "luxon";
import InputElement from "@repo/ui/InputElement";
import AutocompleteElement from "@repo/ui/AutocompleteElement";
import ResultSection from "@repo/ui/ResultSection";
import ButtonElement from "@repo/ui/ButtonElement";
import ToolTip from "@repo/ui/ToolTip";
import DateTimeController from "@repo/ui/DateTimeController";
import Input from "@repo/ui/Input";
import Button from "@repo/ui/Button";

const RFX339ToLuxon = (date: string): DateTime => DateTime.fromISO(date)

const Page: React.FC = () => {
  const {
    resetTemplate,
    templates,
    totalStreams,
    timeZones,
    setTimeZones,
    startingDate,
    setTotalStreams,
    setTemplate,
    setStartingDate,
    removeTemplate,
    addTemplateAfter
  } = useScheduleStore()

  const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timeZoneList = Intl.supportedValuesOf('timeZone').filter(zone => zone !== systemTimeZone)

  return <main className={styles.main}>
    <div className={styles.controlWrapper}>
      <div className={styles.controlItem}>
        <Input
          label='Starting date:'
          type='date'
          value={typeof startingDate !== 'string'
            ? startingDate.toISODate() ?? ''                      //If the date is type Date convert it to a string
            : RFX339ToLuxon(startingDate).toISODate() ?? ''}      //If the date is type string convert it to a Date and then to a string
          onInput={(date) => {
            if (date !== null)
              setStartingDate(DateTime.fromISO(date as string), templates)
          }}
        />
      </div>
      <div className={styles.controlItem}>
        <Input
          label='Total days:'
          type='number'
          value={totalStreams.toString()}
          onInput={event =>
            setTotalStreams(parseInt(event as string ?? '1'), (typeof startingDate === "string") ? RFX339ToLuxon(startingDate) : startingDate)}
        />
      </div>
      <Button
        label='Reset'
        size='large'
        onClick={() => {
          resetTemplate()
        }}
      />
    </div>
    <div className={styles.controlItem}>
      <div className={styles.inlineItem}>
        Select timezones: {systemTimeZone}
        <ToolTip message="Your system's timezone is automatically selected."/>
      </div>
      <AutocompleteElement
        options={timeZoneList}
        value={timeZones}
        onSelect={(event) => {
          setTimeZones(event)
        }}/>
    </div>
    <DateTimeController
      templates={templates}
      setTemplate={setTemplate}
      removeTemplate={removeTemplate}
      addTemplateAfter={addTemplateAfter}
    />
    <ResultSection templates={templates} timezones={timeZones}/>
  </main>
}

export default Page
