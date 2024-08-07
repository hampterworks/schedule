"use client"

import React from "react";
import styles from "./page.module.css";
import useScheduleStore from "../../state/schedule";
import DesignDisplay from "@repo/ui/DesignDisplay";
import HeaderSection from "../../../../packages/ui/src/HeaderSection";
import DateSection from "../../../../packages/ui/src/DateSection";
import SocialsSection from "../../../../packages/ui/src/SocialsSection";
import BackgroundSection from "../../../../packages/ui/src/BackgroundSection";

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
    <div className={styles.warning}>
      This section is designed to work best in higher resolution / window sizes
    </div>
    <HeaderSection
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
    <DateSection
      dateDesign={dateDesign}
      setDateAlignment={setDateAlignment}
      setDateDescriptionColor={setDateDescriptionColor}
      setDateDescriptionTextColor={setDateDescriptionTextColor}
      setDateDayColor={setDateDayColor}
      setDateDayTextColor={setDateDayTextColor}
    />
    <SocialsSection
      socials={socials}
      addSocials={addSocials}
      removeSocials={removeSocials}
      socialsDesign={socialsDesign}
      setSocialsAlignment={setSocialsAlignment}
      creditsTag={creditsTag}
      setCreditsTag={setCreditsTag}
    />
    <BackgroundSection
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
