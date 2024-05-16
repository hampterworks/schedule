"use client"


import React from "react";
import useScheduleStore, {Alignment} from "../../state/schedule";
import DesignDisplay from "@repo/ui/DesignDisplay";

const Page: React.FC = ({}) => {
  const {
    templates,
    timeZones,
    headerDesign,
    setMainHeader,
    setHeaderColor,
    setHeaderBackgroundColor,
    setHeaderAlignment,
    dateDesign,
    setDateAlignment,
    socials,
    addSocials,
    socialsDesign,
    setSocialsAlignment,
    removeSocials
  } = useScheduleStore()

  return <DesignDisplay
    templates={templates}
    timeZones={timeZones}
    headerDesign={headerDesign}
    socials={socials}
    addSocials={addSocials}
    removeSocials={removeSocials}
    socialsDesign={socialsDesign}
    setSocialsAlignment={setSocialsAlignment}
    setMainHeader={setMainHeader}
    setHeaderColor={setHeaderColor}
    setHeaderBackgroundColor={setHeaderBackgroundColor}
    setHeaderAlignment={setHeaderAlignment}
    dateDesign={dateDesign}
    setDateAlignment={setDateAlignment}
  />
}

export default Page
