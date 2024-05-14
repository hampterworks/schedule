"use client"


import React from "react";
import useScheduleStore from "../../state/schedule";
import DesignDisplay from "@repo/ui/DesignDisplay";

const Page: React.FC = ({}) => {
  const {
    templates,
    timeZones,
    mainHeader,
    setMainHeader,
    socials,
    addSocials,
    removeSocials
  } = useScheduleStore()

  return <DesignDisplay
    templates={templates}
    timeZones={timeZones}
    mainHeader={mainHeader}
    socials={socials}
    addSocials={addSocials}
    removeSocials={removeSocials}
    setMainHeader={setMainHeader}
  />
}

export default Page
