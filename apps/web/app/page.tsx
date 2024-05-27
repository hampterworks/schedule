"use client";
import styles from "./page.module.css";
import React from "react";
import useScheduleStore from "../state/schedule";
import DatePickerElement from "@repo/ui/DatePickerElement";
import {DateTime} from "luxon";
import InputElement from "@repo/ui/InputElement";
import TimePickerElement from "@repo/ui/TimePickerElement";
import ButtonWrapper from "@repo/ui/ButtonWrapper";
import AutocompleteElement from "@repo/ui/AutocompleteElement";
import ResultSection from "@repo/ui/ResultSection";
import ButtonElement from "@repo/ui/ButtonElement";
import ToolTip from "@repo/ui/ToolTip";
import DateTimeController from "@repo/ui/DateTimeController";

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
        <h2>Starting date:</h2>
        <DatePickerElement
          onSelect={(date) => {
            if (date !== null)
              setStartingDate(date, templates)
          }}
          value={startingDate}
          fullWidth={true}
        />
      </div>
      <div className={styles.controlItem}>
        <h2>Total days:</h2>
        <InputElement
          label='Total days:'
          type='number'
          value={totalStreams.toString()}
          onInput={event =>
            setTotalStreams(parseInt(event ?? '1'), (typeof startingDate === "string") ? RFX339ToLuxon(startingDate) : startingDate)}
        />
      </div>
      <ButtonElement
        className={styles.resetButton}
        onClick={() => {
          resetTemplate()
        }}
      >Reset</ButtonElement>
    </div>
    <div className={styles.controlItem}>
      <div className={styles.inlineItem}>
        Select timezones: {systemTimeZone}
        <ToolTip message="Your system's timezone is automatically selected." />
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
