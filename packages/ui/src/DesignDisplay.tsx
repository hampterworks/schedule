"use client"

import React, {useRef, useState} from "react";
import {
  Alignment,
  BackgroundDesign,
  BackgroundPosition,
  BackgroundSize,
  Color,
  DateDesign,
  HeaderDesign,
  SocialNetworks,
  Socials,
  SocialsDesign,
  Template
} from "web/state/schedule";
import {DateTime} from "luxon";
import styled from "@emotion/styled";
import html2canvas from 'html2canvas';
import ButtonElement from "./ButtonElement";
import {css} from "@emotion/react";

const DesignResults = styled.div<{
  background: string,
  $backgroundColor: Color,
  $backgroundSize: BackgroundSize,
  $backgroundPosition: BackgroundPosition
}>`
    padding: 16px 0;
    display: grid;
    grid-template-columns: 16px repeat(2, 1fr) 16px;
    row-gap: 16px;
    line-height: 22px;
    background: ${props => `rgba(
        ${props.$backgroundColor.r}, 
        ${props.$backgroundColor.g},
        ${props.$backgroundColor.b}, 
        ${props.$backgroundColor.a})`};

    ${props => props.background.length > 0 && `background-image: url(${props.background})`};

    background-size: ${props => props.$backgroundSize};
    background-repeat: no-repeat;
    background-origin: border-box;
    background-position: ${props => props.$backgroundPosition};
`

/**
 * Returns CSS properties for grid alignment based on the provided alignment value.
 *
 * @param {string} alignment - The alignment value. Possible values are 'left', 'center' and 'right'.
 * @returns {string} - The CSS properties for grid alignment.
 */
const alignmentGridPosition = (alignment: Alignment) => {
  switch (alignment) {
    case "left":
      return css`grid-column: 2;`
    case "center":
      return css`
          grid-column: 2/3;
          margin-left: 50%;
          text-align: center;
          width: 100%;
      `
    case "right":
      return css`grid-column: 3;`
    default:
      return css`grid-column: 3;`
  }
}

const DesignHeader = styled.div<{
  $headerWeight: number,
  $headerTextColor: Color,
  $headerBackgroundColor: Color,
  $alignment: Alignment,
  $headerSize: string,
  $subHeaderWeight: number,
  $subHeaderSize: string,
  $subHeaderTextColor: Color
}>`
    ${props => alignmentGridPosition(props.$alignment)}
    grid-row: 1;
    min-height: 1em;
    background: ${props => `rgba(
        ${props.$headerBackgroundColor.r}, 
        ${props.$headerBackgroundColor.g},
        ${props.$headerBackgroundColor.b}, 
        ${props.$headerBackgroundColor.a})`};
    padding: 16px 8px;
    border-radius: 4px;
    font-size: ${props => props.$subHeaderSize};
    white-space: nowrap;

    h1 {
        font-weight: ${props => props.$headerWeight};
        display: block;
        min-height: 1em;
        font-size: ${props => props.$headerSize};
        color: ${props => `rgba(
        ${props.$headerTextColor.r}, 
        ${props.$headerTextColor.g},
        ${props.$headerTextColor.b}, 
        ${props.$headerTextColor.a})`};
    }

    div {
        font-weight: ${props => props.$subHeaderWeight};
        color: ${props => `rgba(
        ${props.$subHeaderTextColor.r}, 
        ${props.$subHeaderTextColor.g},
        ${props.$subHeaderTextColor.b}, 
        ${props.$subHeaderTextColor.a})`};
    }
`

const DateWrapper = styled.ul<{ $alignment: Alignment }>`
    ${props => alignmentGridPosition(props.$alignment)}
    grid-row: 2;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const DateItem = styled.li<{ $backgroundColor: Color, $textColor: Color }>`
    width: 100%;
    display: flex;
    gap: 16px;
    border-radius: 4px;
    min-height: 65px;
    color: ${props => `rgba(
        ${props.$textColor.r}, 
        ${props.$textColor.g},
        ${props.$textColor.b}, 
        ${props.$textColor.a})`};
    background: ${props => `rgba(
        ${props.$backgroundColor.r}, 
        ${props.$backgroundColor.g},
        ${props.$backgroundColor.b}, 
        ${props.$backgroundColor.a})`};
`
const DayName = styled.div<{ $backgroundColor: Color, $textColor: Color }>`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-basis: 200px;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background: ${props => props.$backgroundColor};
    border-radius: 4px 0 0 4px;
    color: ${props => `rgba(
        ${props.$textColor.r}, 
        ${props.$textColor.g},
        ${props.$textColor.b}, 
        ${props.$textColor.a})`};
    background: ${props => `rgba(
        ${props.$backgroundColor.r}, 
        ${props.$backgroundColor.g},
        ${props.$backgroundColor.b}, 
        ${props.$backgroundColor.a})`};

    span:last-of-type {
        font-size: 18px;
    }
`
const DayDetailsWrapper = styled.div`
    min-height: 85px;
    width: 100%;
    display: flex;
    padding: 16px;
    gap: 8px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const DayDescription = styled.div`
    font-size: 18px;
    font-weight: bold;
`
const TimesWrapper = styled.div`
    justify-self: flex-end;
`

const tag = css`
    gap: 8px;
    padding: 16px;
    background: white;
    border-radius: 4px;
    width: fit-content;
`

const SocialsWrapper = styled.ul<{ $alignment: Alignment }>`
    ${props => alignmentGridPosition(props.$alignment)}
    display: flex;
    gap: 16px;
    grid-row: 3;
    justify-content: center;

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        ${tag};
    }
`

const CreditsTag = styled.div<{ $alignment: Alignment }>`
    ${tag};
    ${props => {
        switch (props.$alignment) {
            case "center":
            case "left":
            default:
                return css`
                    grid-column: 3;
                    justify-self: flex-end;
                `
            case "right":
                return css`
                    grid-column: 2;
                    justify-self: flex-start;
                `
        }
    }}

    grid-row: 3;
`

const FileUpload = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    cursor: pointer;

    padding: 8px;
    border-radius: 2px;
    border: 1px solid gray;

    &:hover {
        background: rgba(0, 0, 0, 0.08);
    }

    input[type="file"] {
        display: none;
    }
`

const UploadContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
`

/**
 * Format a time string with optional minutes.
 *
 * @param {string} [time] - The time string to format.
 * @returns {string} The formatted time string.
 */
const formatTimeWithOptionalMinutes = (time?: string): string => {
  if (time !== undefined) {
    const splitTime = time.split(':')
    const updatedTime = DateTime.local().set({
      hour: parseInt(splitTime[0] ?? '12'),
      minute: parseInt(splitTime[1] ?? '00')
    })
    if (updatedTime.minute === 0) {
      return updatedTime.toFormat('h a')
    } else {
      return updatedTime.toFormat('h:mm a')
    }
  }
  return ''
}

/**
 * Formats the given time in multiple time zones.
 *
 * @param {DateTime} date - The date and time to format.
 * @param {string} time - The time to format in `HH:mm` format.
 * @param {string[]} timeZones - The time zones to format the time in.
 * @returns {string[]} - An array of formatted time strings for each time zone.
 */
const formatTimeZones = (date: DateTime, time: string, timeZones: string[]): string[] => {
  const calculatedTimezones = timeZones.map(timezone => {

    const splitTime = time.split(':')

    const updatedDate = date.set({
      hour: parseInt(splitTime[0] ?? '12'),
      minute: parseInt(splitTime[1] ?? '00')
    })

    const dateOffset = updatedDate.setZone(timezone)

    const timeString = formatTimeWithOptionalMinutes(dateOffset.toFormat('HH:mm'))

    const gmtOffset = dateOffset.offset / 60

    if (date.day < dateOffset.day) {
      return `${timeString} (+1 day) GMT${gmtOffset > 0 ? '+' : ''}${gmtOffset !== 0 ? gmtOffset : ''}`
    } else if (date.day > dateOffset.day) {
      return `${timeString} (-1 day) GMT${gmtOffset > 0 ? '+' : ''}${gmtOffset !== 0 ? gmtOffset : ''}`
    }

    return `${timeString} GMT${gmtOffset > 0 ? '+' : ''}${gmtOffset !== 0 ? gmtOffset : ''}`
  })

  return calculatedTimezones
}

/**
 * Retrieves the week duration string based on the provided templates.
 *
 * @param {Template[]} templates - The array of templates representing the week. Each template must have a 'date' property.
 * @returns {string} The week duration string in the format "Week of {firstDay} - {lastDay}".
 */
const getWeekDurationString = (templates: Template[]): string => {
  const firstDay = (typeof templates[0]?.date === 'string')
    ? DateTime.fromISO(templates[0].date).toFormat('d/L')
    : templates[0]?.date.toFormat('d/L')

  const lastDay = (typeof templates[templates.length - 1]?.date === 'string')
    ? DateTime.fromISO(templates[templates.length - 1]?.date as string).toFormat('d/L')
    : (templates[templates.length - 1]?.date as DateTime).toFormat('d/L')

  return `Week of ${firstDay} - ${lastDay}`
}

/**
 * Returns the icon for a given social network.
 * @param {SocialNetworks} network - The social network for which to get the icon.
 * @returns {React.ReactNode} - The icon as a React Node.
 */
const getSocialNetworkIcon = (network: SocialNetworks): React.ReactNode => {
  switch (network) {
    case 'twitch':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-twitch"
                  viewBox="0 0 16 16">
        <path
          d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z"/>
        <path d="M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z"/>
      </svg>
    case "twitter":
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-twitter"
                  viewBox="0 0 16 16">
        <path
          d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"/>
      </svg>
    case "youtube":
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-youtube"
                  viewBox="0 0 16 16">
        <path
          d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
      </svg>
    default:
      <></>
  }
}

/**
 * Represents the properties for configuring the design display.
 * @typedef {Object} DesignDisplayProps
 * @property {Template[]} templates - The array of templates.
 * @property {string[]} timeZones - The array of time zones.
 * @property {HeaderDesign} headerDesign - The header design.
 * @property {DateDesign} dateDesign - The date design.
 * @property {Socials[]} socials - The array of socials.
 * @property {SocialsDesign} socialsDesign - The socials design.
 * @property {BackgroundDesign} backgroundDesign - The background design.
 * @property {string} [creditsTag] - Optional credits tag.
 */
type DesignDisplayProps = {
  templates: Template[]
  timeZones: string[]
  headerDesign: HeaderDesign
  dateDesign: DateDesign
  socials: Socials[]
  socialsDesign: SocialsDesign
  backgroundDesign: BackgroundDesign
  creditsTag?: string
}

/**
 * The DesignDisplay component is responsible for rendering the design elements of a template.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Array} props.timeZones - The list of available time zones
 * @param {Array} props.templates - The list of templates to render
 * @param {Object} props.headerDesign - The design configuration for the header section
 * @param {Object} props.dateDesign - The design configuration for the date section
 * @param {Array} props.socials - The list of socials to render
 * @param {Object} props.socialsDesign - The design configuration for the socials section
 * @param {Object} props.backgroundDesign - The design configuration for the background
 * @param {string} props.creditsTag - The credits tag to display
 * @returns {ReactNode} The rendered DesignDisplay component
 */
const DesignDisplay: React.FC<DesignDisplayProps> = (
  {
    timeZones,
    templates,
    headerDesign,
    dateDesign,
    socials,
    socialsDesign,
    backgroundDesign,
    creditsTag
  }) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [backgroundImage, setBackgroundImage] = useState('')
  const [screenshotDataUrl, setScreenshotDataUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const localTimeZone = DateTime.local().offset / 60

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result !== null)
          setBackgroundImage(reader.result.toString())
      }
      reader.readAsDataURL(file)
    }
  }

  const takeScreenshot = () => {
    setIsUploading(true)
    if (divRef.current) {
      html2canvas(divRef.current)
        .then(canvas => {
          setIsUploading(false)
          setScreenshotDataUrl(canvas.toDataURL('image/png'))
        })
    }
  }
  return <section>
    <UploadContainer>
      <FileUpload>
        Upload background
        <input
          type='file'
          accept='image/*'
          onChange={handleUpload}
        />
      </FileUpload>
      <ButtonElement onClick={takeScreenshot} disabled={isUploading}>Take screenshot</ButtonElement>
      {
        screenshotDataUrl && <a href={screenshotDataUrl} download="screenshot.png">
          <ButtonElement>Download screenshot</ButtonElement>
        </a>
      }
    </UploadContainer>
    <DesignResults
      background={backgroundImage}
      $backgroundPosition={backgroundDesign.backgroundPosition}
      $backgroundColor={backgroundDesign.backgroundColor}
      $backgroundSize={backgroundDesign.backgroundSize}
      ref={divRef}
    >
      <DesignHeader
        $headerWeight={parseInt(headerDesign.headerFont.weight)}
        $alignment={headerDesign.headerAlignment}
        $headerTextColor={headerDesign.headerTextColor}
        $headerBackgroundColor={headerDesign.headerBackgroundColor}
        $headerSize={headerDesign.headerTextSize + 'px'}
        $subHeaderWeight={parseInt(headerDesign.subHeaderFont.weight)}
        $subHeaderSize={headerDesign.subHeaderTextSize + 'px'}
        $subHeaderTextColor={headerDesign.subHeaderTextColor}
      >
        <h1 className={headerDesign.headerFont.className}>{headerDesign.headerText}</h1>
        <div className={headerDesign.subHeaderFont.className}>{getWeekDurationString(templates)}</div>
      </DesignHeader>
      <DateWrapper $alignment={dateDesign.dateAlignment}>
        {
          templates.map((template, index) => {
            const date = (typeof template.date === 'string')
              ? DateTime.fromISO(template.date)
              : template.date

            const day = date.toFormat('ccc')
            const dayDate = date.toFormat('d/L')
            const time = formatTimeWithOptionalMinutes(template.time)

            const timeZoneList = template.time !== undefined
              ? formatTimeZones(date, template.time, timeZones)
              : []

            const localTime = time
              ? `${time} GMT${localTimeZone >= 0 ? '+' : ''}${localTimeZone}`
              : undefined

            return <DateItem
              key={day + index}
              $textColor={dateDesign.dateDescriptionTextColor}
              $backgroundColor={dateDesign.dateDescriptionColor}
            >
              <DayName
                $textColor={dateDesign.dateDayTextColor}
                $backgroundColor={dateDesign.dateDayColor}
              >
                <span>{day}</span>
                <span>{dayDate}</span>
              </DayName>
              <DayDetailsWrapper>
                <DayDescription>{template.description}</DayDescription>
                {
                  localTime !== undefined &&
                  <TimesWrapper>{`${localTime} ${timeZoneList.length !== 0 ? '/ ' : ''}${timeZoneList.join(" / ")}`}</TimesWrapper>
                }
              </DayDetailsWrapper>
            </DateItem>
          })
        }
      </DateWrapper>
      <SocialsWrapper $alignment={socialsDesign.socialsAlignment}>
        {
          socials.map((item, index) => {
            if (item.network !== 'none' && item.tag !== undefined) {
              return <li key={item.network + index}>
                {getSocialNetworkIcon(item.network)}
                <span>{item.tag}</span>
              </li>
            }
          })
        }
      </SocialsWrapper>
      {
        creditsTag !== undefined && creditsTag.length > 0 &&
        <CreditsTag $alignment={socialsDesign.socialsAlignment}>{creditsTag}</CreditsTag>
      }
    </DesignResults>
  </section>
}

export default DesignDisplay

