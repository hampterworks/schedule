"use client"
import styles from "./page.module.scss";
import DatePickerElement from "../../../packages/ui/src/DatePickerElement";
import SelectElement, {Option} from "@repo/ui/SelectElement";
import dayjs, {Dayjs} from 'dayjs';
import Button from '@mui/material/Button';
import {useState} from "react";
import InputElement from "@repo/ui/InputElement";
import FormWrapper, {DateItem} from "@repo/ui/FormWrapper";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import ResultSection from "@repo/ui/ResultSection";

const timeZones: Option[] = [
  {
    label: 'London, United Kingdom (GMT+0)',
    value: 'Europe/London'
  },
  {
    label: 'Amsterdam, The Kingdom of the Netherlands (GMT+1, CET)',
    value: 'Europe/Amsterdam'
  },
  {
    label: 'Helsinki, Finland (GMT+2, EET)',
    value: 'Europe/Helsinki',
  },
  {
    label: 'Nairobi, Kenya (GMT+3, EAT)',
    value: 'Africa/Nairobi',
  },
  {
    label: 'Dubai, United Arab Emirates (GMT+4)',
    value: 'Asia/Dubai'
  },
  {
    label: 'Tashkent, Uzbekistan (GMT+5)',
    value: 'Asia/Tashkent',
  },
  {
    label: 'Almaty, Kazakhstan (GMT+6)',
    value: 'Asia/Almaty'
  },
  {
    label: 'Bangkok, Thailand (GMT+7, ICT)',
    value: 'Asia/Bangkok'
  },
  {
    label: 'Singapore, Republic of Singapore (GMT+8, SST)',
    value: 'Asia/Singapore'
  },
  {
    label: 'Tokyo, Japan (GMT+9, JST)',
    value: 'Asia/Tokyo'
  },
  {
    label: 'Brisbane, Australia (GMT+10, AEST)',
    value: 'Australia/Brisbane'
  },
  {
    label: 'Solomon Islands (GMT+11)',
    value: 'Pacific/Guadalcanal'
  },
  {
    label: 'Marshall Islands (GMT+12)',
    value: 'Pacific/Majuro'
  },
  {
    label: 'American Samoa (GMT-11)',
    value: 'Pacific/Pago_Pago'
  },
  {
    label: 'Honolulu, Hawaii, USA (GMT-10, HAST)',
    value: 'Pacific/Honolulu'
  },
  {
    label: 'Anchorage, Alaska, USA (GMT-9, AKST)',
    value: 'America/Anchorage'
  },
  {
    label: 'Los Angeles, California, USA (Pacific Standard Time, GMT-8, PST)',
    value: 'America/Los_Angeles'
  },
  {
    label: 'Denver, Colorado, USA (Mountain Standard Time, GMT-7, MST)',
    value: 'America/Denver'
  },
  {
    label: 'Chicago, USA (Central Standard Time, GMT-6, CST)',
    value: 'America/Chicago'
  },
  {
    label: 'New York, USA (Eastern Standard Time, GMT-5, EST)',
    value: 'America/New_York'
  },
  {
    label: 'La Paz, Bolivia (GMT-4)',
    value: 'America/La_Paz'
  },
  {
    label: 'Sao Paulo, Brazil (GMT-3)',
    value: 'America/Sao_Paulo'
  },
  {
    label: 'South Georgia and the South Sandwich Islands (GMT-2)',
    value: 'Atlantic/South_Georgia'
  },
  {
    label: 'Praia, Cape Verde (GMT-1)',
    value: 'Atlantic/Cape_Verde'
  }
]

export default function Page(): JSX.Element {
  const [startingDate, setStartingDate] = useState<Dayjs | null>(null)
  const [range, setRange] = useState<number>(1)
  const [timezones, setTimezones] = useState<Option[]>()
  const [dateRange, setDateRange] = useState<Dayjs[] | null>(null)
  const [discordTime, setDiscordTime] = useState<string>()
  const [resultTime, setResultTime] = useState<{ date: string, timeZones?: string }[]>()

  const systemTime = dayjs()
  const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const onDateSelect = (selected: Dayjs | null) => {
    setStartingDate(selected)
  }

  const onTimezoneSelect = (selected: Option[]) => {
    setTimezones(selected)
  }

  const onRangeSelect = (selected: string | null) => {
    setRange(parseInt(selected === null ? '1' : selected))
  }

  const onTimeSelection = (dateItems: DateItem[]) => {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const discordString = dateItems
      .map(item => item.discordTime)
      .join('\n')

    if (timezones !== undefined) {
      const timesWithTimezones = dateItems
        .map(time => {
            const dayTime = time.dayjs.format('dddd, MM-DD-YY hh:mm A')
            if (dayTime === 'Invalid Date') {
              return {
                date: time.date
              }
            }
            return {
              date: time.dayjs.format('dddd, MM-DD hh:mm A'),
              timeZones: timezones.map(zone => zone.label + ' ' + time.dayjs.tz(zone.value).format('dddd, MM-DD-YY hh:mm A')).join('\n')
            }
          }
        )

      setResultTime(timesWithTimezones)
    }
    setDiscordTime(discordString)
  }

  const onButtonClick = () => {
    if (startingDate === null)
      setStartingDate(dayjs())

    const datesArray =
      Array.from({length: range},
        (_, index) =>
          startingDate !== null
            ? startingDate.add(index, 'day')
            : systemTime.add(index, 'day')
      )
    setDateRange(_ => [...datesArray])
  }

  return (
    <main className={styles.main}>
      <header>
        <h1>goom schedule generator</h1>
        <div className={styles.header}>
          <div>
            <h2>Select a starting date</h2>
            <DatePickerElement onSelect={onDateSelect}/>
          </div>
          <div>
            <h2>For how many days?</h2>
            <InputElement defaultValue={'1'} label='Days' type='number' onSelect={onRangeSelect}/>
          </div>
        </div>
        <div>
          <h2>For what time zones?</h2>
          <SelectElement options={timeZones} onSelect={onTimezoneSelect}/>
        </div>
      </header>
      <section className={styles.section}>
        <p>
          {`Give me a schedule starting on: ${startingDate !== null ? startingDate.format('dddd, MM-DD') : systemTime.format('dddd, MM-DD')}
        (${systemTimezone}) for ${range} days for the following time zones: ${timezones !== undefined ? timezones.map(item => ` ${item.label}`) : systemTimezone}`}
        </p>
        <Button
          variant="contained"
          onClick={onButtonClick}
          sx={{width: '100%'}}
        >
          { dateRange === null ? 'CREATE SCHEDULE' : 'UPDATE SCHEDULE'}
        </Button>
      </section>
      <FormWrapper onTimeSelect={onTimeSelection} dateRange={dateRange} className={styles.form}/>
      {
        discordTime !== undefined &&
        <section className={styles.resultsWrapper}>
          {
            resultTime !== undefined &&
            <div>
              <h2>Schedule time zones</h2>
              {
                resultTime.map((time, index) =>
                  <ResultSection key={time.date} header={`${time.date} - ${systemTimezone}`} text={time.timeZones !== undefined ? time.timeZones : 'No hour given'}/>
                )
              }
            </div>
          }
          <ResultSection header='Discord schedule format' text={discordTime}/>
        </section>
      }
    </main>
  )
}
