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
  } = useScheduleStore();
  const timeZoneList = Intl.supportedValuesOf('timeZone')

  return <main className='main'>
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
    <AutocompleteElement
      options={timeZoneList}
      value={timeZones}
      onSelect={(event) => {
        setTimeZones(event)
      }}/>
    <ul className={styles.templateWrapper}>
      {
        templates.map((template, index) =>
          <li key={"template-" + index} className={styles.templateListItem}>
            <DatePickerElement
              onSelect={(date) => {
                if (date !== null)
                  setTemplate(index, {...template, date: date})
              }}
              value={template.date}
            />
            <TimePickerElement
              label='Time'
              value={template.time !== undefined
                ? DateTime.fromFormat(template.time, 'HH:mm')
                : DateTime.fromFormat('00:00', 'HH:mm')}
              onSelect={(selectedTime) => {
                setTemplate(index, {...template, time: selectedTime.toFormat('HH:mm')})
              }}
            />
            <InputElement
              label='Description'
              type='text'
              value={template.description}
              onInput={inputText => {
                setTemplate(index, {...template, description: inputText ?? ''})
              }}
            />
            <ButtonWrapper
              removeItemFunction={removeTemplate}
              addItemFunction={addTemplateAfter}
              index={index}
              template={template}
            />
          </li>)
      }
    </ul>
    <ResultSection templates={templates} timezones={timeZones}/>
  </main>
}

export default Page
