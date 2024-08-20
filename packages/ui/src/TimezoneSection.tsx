"use client"

import * as React from "react";
import styled, {css} from "styled-components";
import ToolTip from "./components/ToolTip";
import Select from "./components/Select";

const SectionWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
`
const TimezoneHeader = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 8px;
`

type TimezoneSectionProps = {
  timeZones: string[]
  setTimeZones: (timeZones: string[]) => void
} & React.ComponentPropsWithoutRef<'section'>


const TimezoneSection: React.FC<TimezoneSectionProps> = ({ timeZones, setTimeZones, ...props}) => {
  const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timeZoneList = Intl.supportedValuesOf('timeZone').filter(zone => zone !== systemTimeZone)

  return (
    <SectionWrapper {...props}>
      <TimezoneHeader>
        Select timezones: {systemTimeZone}
        <ToolTip message="Your system's timezone is automatically selected."/>
      </TimezoneHeader>
      <Select
        options={timeZoneList.map(item => ({value: item, title: item}))}
        selectedValue={timeZones.map(item => ({value: item, title: item}))}
        onSelectedValue={(event) => {
          setTimeZones(event.map(item => item.value))
        }}
        searchable
        multiple
      />
    </SectionWrapper>
  )
}

export default TimezoneSection
