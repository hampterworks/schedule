"use client"


import React from "react";
import useScheduleStore, {Alignment, ColorFn} from "../../state/schedule";
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
    setHeaderSize,
    setSubHeaderSize,
    dateDesign,
    setDateAlignment,
    socials,
    addSocials,
    socialsDesign,
    setSocialsAlignment,
    removeSocials,
    backgroundDesign,
    setBackgroundColor,
    setBackgroundSize,
    setBackgroundPosition,
    setDateDescriptionColor,
    setDateDescriptionTextColor,
    setDateDayColor,
    setDateDayTextColor
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
    setHeaderSize={setHeaderSize}
    setSubHeaderSize={setSubHeaderSize}
    dateDesign={dateDesign}
    setDateAlignment={setDateAlignment}
    backgroundDesign={backgroundDesign}
    setBackgroundColor={setBackgroundColor}
    setBackgroundSize={setBackgroundSize}
    setBackgroundPosition={setBackgroundPosition}
    setDateDescriptionColor={setDateDescriptionColor}
    setDateDescriptionTextColor={setDateDescriptionTextColor}
    setDateDayColor={setDateDayColor}
    setDateDayTextColor={setDateDayTextColor}
  />
}

export default Page
