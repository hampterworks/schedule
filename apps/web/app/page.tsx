"use client";
import styles from "./page.module.css";
import React from "react";
import useScheduleStore from "../state/schedule";
import {DateTime} from "luxon";
import ResultSection from "@repo/ui/ResultSection";
import DateTimeSection from "../../../packages/ui/src/DateTimeSection";
import Input from "@repo/ui/Input";
import Button from "@repo/ui/Button";
import TimezoneSection from "@repo/ui/TimezoneSection";

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
    </div>
    <TimezoneSection timeZones={timeZones} setTimeZones={setTimeZones}/>
    <DateTimeSection
      templates={templates}
      setTemplate={setTemplate}
      removeTemplate={removeTemplate}
      addTemplateAfter={addTemplateAfter}
    />
    <ResultSection templates={templates} timezones={timeZones}/>
  </main>
}

export default Page
