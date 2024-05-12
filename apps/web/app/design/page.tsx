"use client"


import React from "react";
import useScheduleStore from "../../state/schedule";
import DesignDisplay from "@repo/ui/DesignDisplay";

const Page: React.FC = ({}) => {
  const {
    templates,
    timeZones,
    designTemplate,
    setMainHeader
  } = useScheduleStore()

  return <DesignDisplay
    templates={templates}
    timeZones={timeZones}
    designTemplate={designTemplate}
    setMainHeader={setMainHeader}
  />
}

export default Page
