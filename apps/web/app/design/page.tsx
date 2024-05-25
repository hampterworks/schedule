"use client"

import React from "react";
import styles from "./page.module.css";
import useScheduleStore from "../../state/schedule";
import DesignDisplay from "@repo/ui/DesignDisplay";
import HeaderController from "@repo/ui/HeaderController";
import DateController from "@repo/ui/DateController";
import SocialsController from "@repo/ui/SocialsController";
import BackgroundController from "@repo/ui/BackgroundController";

const Page: React.FC = ({}) => {
  const {
    templates,
    timeZones,
    headerDesign,
    setMainHeader,
    setMainHeaderFont,
    setHeaderColor,
    setHeaderBackgroundColor,
    setHeaderAlignment,
    setHeaderSize,
    setSubHeaderFont,
    setSubHeaderSize,
    setSubHeaderColor,
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
    setDateDayTextColor,
    creditsTag,
    setCreditsTag
  } = useScheduleStore()

  return <main className={styles.main}>
    <HeaderController
      headerDesign={headerDesign}
      setMainHeader={setMainHeader}
      setMainHeaderFont={setMainHeaderFont}
      setHeaderColor={setHeaderColor}
      setHeaderBackgroundColor={setHeaderBackgroundColor}
      setHeaderAlignment={setHeaderAlignment}
      setHeaderSize={setHeaderSize}
      setSubHeaderFont={setSubHeaderFont}
      setSubHeaderSize={setSubHeaderSize}
      setSubHeaderColor={setSubHeaderColor}
    />
    <DateController
      dateDesign={dateDesign}
      setDateAlignment={setDateAlignment}
      setDateDescriptionColor={setDateDescriptionColor}
      setDateDescriptionTextColor={setDateDescriptionTextColor}
      setDateDayColor={setDateDayColor}
      setDateDayTextColor={setDateDayTextColor}
    />
    <SocialsController
      socials={socials}
      addSocials={addSocials}
      removeSocials={removeSocials}
      socialsDesign={socialsDesign}
      setSocialsAlignment={setSocialsAlignment}
      creditsTag={creditsTag}
      setCreditsTag={setCreditsTag}
    />
    <BackgroundController
      backgroundDesign={backgroundDesign}
      setBackgroundColor={setBackgroundColor}
      setBackgroundSize={setBackgroundSize}
      setBackgroundPosition={setBackgroundPosition}
    />
    <DesignDisplay
      templates={templates}
      timeZones={timeZones}
      headerDesign={headerDesign}
      socials={socials}
      socialsDesign={socialsDesign}
      dateDesign={dateDesign}
      backgroundDesign={backgroundDesign}
      creditsTag={creditsTag}
    />
  </main>
}

export default Page
