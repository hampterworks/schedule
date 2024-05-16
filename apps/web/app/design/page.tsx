"use client"


import React from "react";
import useScheduleStore from "../../state/schedule";
import DesignDisplay from "@repo/ui/DesignDisplay";

const Page: React.FC = ({}) => {
  const {
    templates,
    timeZones,
    headerDesign,
    setMainHeader,
    setHeaderColor,
    socials,
    addSocials,
    removeSocials
  } = useScheduleStore()

  return <DesignDisplay
    templates={templates}
    timeZones={timeZones}
    headerDesign={headerDesign}
    socials={socials}
    addSocials={addSocials}
    removeSocials={removeSocials}
    setMainHeader={setMainHeader}
    setHeaderColor={setHeaderColor}
  />
}

export default Page
