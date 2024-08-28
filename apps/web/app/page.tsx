"use client";
import styles from "./page.module.css";
import React from "react";
import useScheduleStore from "../state/schedule";
import ResultSection from "@repo/ui/ResultSection";
import DateTimeSection from "../../../packages/ui/src/DateTimeSection";
import ControlSection from "@repo/ui/ControlSection";

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
    <ControlSection
      startingDate={startingDate}
      setStartingDate={setStartingDate}
      templates={templates}
      resetTemplate={resetTemplate}
      totalStreams={totalStreams}
      setTotalStreams={setTotalStreams}
      timeZones={timeZones}
      setTimeZones={setTimeZones}
    />

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
