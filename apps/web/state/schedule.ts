"use client";
import {StateCreator, StoreApi, useStore} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {DateTime} from "luxon";
import {createStore} from "zustand/vanilla";

export type Template = {
  date: DateTime | string,
  time?: string
  description?: string
  wholeDay?: boolean
}

export type Color = {
  r: number
  g: number
  b: number
  a: number
}

export type Alignment = 'left' | 'center' | 'right'
export type Distribution = 'list' | 'column'

export type AlignmentFn = (alignment: Alignment) => void
export type DistributionFn = (distribution: Distribution) => void
export type ColorFn = (color: Color) => void

export type Font = {
  key: string
  weight: string
  className: string
}

export type HeaderDesign = {
  headerText: string
  headerFont: Font
  headerTextColor: Color
  headerBackgroundColor: Color
  headerAlignment: Alignment
  headerTextSize: number
  subHeaderFont: Font
  subHeaderTextSize: number
  subHeaderTextColor: Color
}

export type DateDesign = {
  dateAlignment: Alignment
  dateDistribution: Distribution
  dateDayColor: Color
  dateDayTextColor: Color
  dateDescriptionColor: Color
  dateDescriptionTextColor: Color
  dateDescriptionTextSize: number
  dateDescriptionSpacing: number
  daySpacing: number
  dateTimesTextSize: number
  dayNameTextSize: number
  dayNumberTextSize: number
  datePadding: number
}

export type BackgroundSize = 'auto' | 'cover' | 'contain' | string
export type BackgroundPosition = 'top' | 'left' | 'right' | 'bottom' | 'center' | string

export type BackgroundDesign = {
  backgroundColor: Color
  backgroundSize: BackgroundSize
  backgroundPosition: BackgroundPosition
}

export type SocialNetworks = 'twitch' | 'twitter' | 'youtube'

export type Socials = {
  network: SocialNetworks | 'None'
  tag?: string
}

export type SocialsDesign = {
  socialsAlignment: Alignment
}

export type ScheduleState = {
  startingDate: DateTime | string,
  totalStreams: number,
  timeZones: string[],
  templates: Template[],
  headerDesign: HeaderDesign
  dateDesign: DateDesign
  socials: Socials[]
  socialsDesign: SocialsDesign
  backgroundDesign: BackgroundDesign
  creditsTag?: string
}

export type ScheduleStateReducers = {
  resetTemplate: () => void,
  setStartingDate: (startingDate: DateTime, templates: Template[]) => void,
  setTotalStreams: (totalStreams: number, startingDate: DateTime) => void,
  setTimeZones: (timeZones: string[]) => void,
  setTemplates: (templates: Template[]) => void,
  setTemplate: (index: number, templates: Template) => void,
  removeTemplate: (index: number) => void,
  addTemplateAfter: (index: number, template: Template) => void,
}

export type DesignStateReducers = {
  setMainHeader: (mainHeader: string) => void,
  setMainHeaderFont: (font: Font) => void,
  addSocials: (index: number, socials: Socials) => void,
  removeSocials: (index: number) => void,
  setSocialsAlignment: AlignmentFn,
  setHeaderColor: ColorFn,
  setHeaderBackgroundColor: ColorFn,
  setHeaderAlignment: AlignmentFn,
  setHeaderSize: (size: number) => void,
  setSubHeaderFont: (font: Font) => void,
  setSubHeaderSize: (size: number) => void,
  setSubHeaderColor: ColorFn,
  setDateAlignment: AlignmentFn,
  setDistributionAlignment: DistributionFn,
  setDateDescriptionColor: ColorFn,
  setDateDescriptionTextColor: ColorFn,
  setDateDayColor: ColorFn,
  setDateDayTextColor: ColorFn,
  setDateDescriptionTextSize: (size: number) => void,
  setDateTimesTextSize: (size: number) => void,
  setDayNameTextSize: (size: number) => void,
  setDayNumberTextSize: (size: number) => void,
  setDateDescriptionSpacing: (size: number) => void,
  setDaySpacing: (size: number) => void,
  setDatePadding: (size: number) => void,
  setBackgroundColor: ColorFn,
  setBackgroundSize: (backgroundSize: BackgroundSize) => void,
  setBackgroundPosition: (backgroundPosition: BackgroundPosition) => void,
  setCreditsTag: (creditsTag: string) => void
}

let initialState: ScheduleState = {
  startingDate: DateTime.local(),
  totalStreams: 1,
  timeZones: [],
  templates: [{date: DateTime.local()}],
  headerDesign: {
    headerText: 'Edit header',
    headerFont: {
      className: '',
      key: 'Default',
      weight: '400'
    },
    headerTextColor: { r: 0, g: 0, b: 0, a: 1 },
    headerBackgroundColor: { r: 0, g: 0, b: 0, a: 0 },
    headerAlignment: 'right',
    headerTextSize: 24,
    subHeaderFont: {
      className: '',
      key: 'Default',
      weight: '400'
    },
    subHeaderTextSize: 16,
    subHeaderTextColor: { r: 0, g: 0, b: 0, a: 1 },
  },
  dateDesign: {
    dateAlignment: 'right',
    dateDistribution: 'list',
    dateDescriptionColor: { r: 255, g: 255, b: 255, a: 1 },
    dateDayColor: { r: 130, g: 167, b: 236, a: 1 },
    dateDayTextColor: { r: 0, g: 0, b: 0, a: 1 },
    dateDescriptionTextColor: { r: 0, g: 0, b: 0, a: 1 },
    dateDescriptionTextSize: 18,
    dateTimesTextSize: 18,
    dayNameTextSize: 24,
    dayNumberTextSize: 16,
    dateDescriptionSpacing: 1,
    daySpacing: 1,
    datePadding: 18
  },
  socials: [{network: 'None',}],
  socialsDesign: {
    socialsAlignment: 'right'
  },
  creditsTag: '',
  backgroundDesign: {
    backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
    backgroundSize: 'auto',
    backgroundPosition: 'center'
  }
}

let reducers: StateCreator<ScheduleStateReducers & DesignStateReducers & ScheduleState, [["zustand/devtools", never]], [], ScheduleStateReducers & DesignStateReducers> =
  (set, get) => ({
    resetTemplate: () => set((state) => ({...initialState})),
    setStartingDate: (startingDate: DateTime, templates: Template[]) => set((state) => {
      return {
        startingDate,
        ...(templates.length > 0 && {
          templates: templates.map((value, index) => ({
            ...value,
            date: startingDate.plus({days: index}),
          }))
        })
      }
    }),
    setTotalStreams: (totalStreams: number, startingDate: DateTime) => set((state) => {
      if (totalStreams < 0)
        throw new RangeError("Can't set total number of streams to less than 0!")
      const streams = [...Array(totalStreams).keys()].map(index => state.templates[index] ?? {date: startingDate.plus({days: index})})
      return {
        totalStreams,
        templates: streams
      }
    }),
    setTimeZones: (timeZones: string[]) => set((state) => ({timeZones: timeZones})),
    setTemplates: (templates: Template[]) => set((state) => {
      return {
        totalStreams: templates.length,
        templates
      }
    }),
    setTemplate: (index: number, template: Template) => set((state) => {
      if (index > state.templates.length || index < 0)
        throw new RangeError("Template is out of range!")

      return {
        templates: [...state.templates.slice(0, index), template, ...state.templates.slice(index + 1, state.templates.length)]
      }
    }),
    removeTemplate: (index: number) => set((state) => {
      if (index > state.templates.length || index < 0)
        throw new RangeError("Template is out of range!")

      return {
        totalStreams: state.totalStreams - 1,
        templates: [...state.templates.slice(0, index), ...state.templates.slice(index + 1, state.templates.length)]
      }
    }),
    addTemplateAfter: (index: number, template: Template) => set((state) => {
      if (index > state.templates.length || index < 0)
        throw new RangeError("Template is out of range!")
      return {
        totalStreams: state.totalStreams + 1,
        templates: [...state.templates.slice(0, index + 1), {date: template.date}, ...state.templates.slice(index + 1, state.templates.length)]
      }
    }),
    setMainHeader: (mainHeader: string) => set((state) =>
      ({
        headerDesign: {
          ...state.headerDesign,
          headerText: mainHeader
        }
      })),
    setMainHeaderFont: (font: Font) => set((state) =>
      ({
        headerDesign: {
          ...state.headerDesign,
          headerFont: font
        }
      })),
    setHeaderSize: (size: number) => set((state) =>
      ({
        headerDesign: {
          ...state.headerDesign,
          headerTextSize: size
        }
      })),
    setDateDescriptionSpacing: (size: number) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          dateDescriptionSpacing: size
        }
      })),
    setDaySpacing: (size: number) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          daySpacing: size
        }
      })),
    setDatePadding: (size: number) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          datePadding: size
        }
      })),
    setDateDescriptionTextSize: (size: number) => set((state) =>
  ({
    dateDesign: {
      ...state.dateDesign,
      dateDescriptionTextSize: size
    }
  })),
    setDayNumberTextSize: (size: number) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          dayNumberTextSize: size
        }
      })),
    setDateTimesTextSize: (size: number) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          dateTimesTextSize: size
        }
      })),
    setDayNameTextSize: (size: number) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          dayNameTextSize: size
        }
      })),
    setSubHeaderFont: (font: Font) => set((state) =>
      ({
        headerDesign: {
          ...state.headerDesign,
          subHeaderFont: font
        }
      })),
    setSubHeaderSize: (size: number) => set((state) =>
      ({
        headerDesign: {
          ...state.headerDesign,
          subHeaderTextSize: size
        }
      })),
    setSubHeaderColor: (color: Color) => set((state) =>
      ({
        headerDesign: {
          ...state.headerDesign,
          subHeaderTextColor: color
        }
      })),
    addSocials: (index: number, socials: Socials) => set((state) => {

      return {
        socials: [...state.socials.slice(0, index), socials, ...state.socials.slice(index + 1)]
      }
    }),
    removeSocials: (index: number) => set((state) => {
      return {
        socials: [...state.socials.slice(0, index), ...state.socials.slice(index + 1, state.socials.length )]
      }
    }),
    setHeaderColor: (color: Color) => set((state) =>
      ({
        headerDesign: {
          ...state.headerDesign,
          headerTextColor: color
        }
      })),
    setHeaderBackgroundColor: (color: Color) => set((state) =>
      ({
        headerDesign: {
          ...state.headerDesign,
          headerBackgroundColor: color
        }
      })),
    setHeaderAlignment: (alignment: Alignment) => set((state) =>
      ({
        headerDesign: {
          ...state.headerDesign,
          headerAlignment: alignment
        }
      })),
    setDateAlignment: (alignment: Alignment) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          dateAlignment: alignment
        }
      })),
    setDistributionAlignment: (distribution: Distribution) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          dateDistribution: distribution
        }
      })),
    setDateDayColor: (color: Color) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          dateDayColor: color
        }
      })),
    setDateDayTextColor: (color: Color) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          dateDayTextColor: color
        }
      })),
    setDateDescriptionColor: (color: Color) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          dateDescriptionColor: color
        }
      })),
    setDateDescriptionTextColor: (color: Color) => set((state) =>
      ({
        dateDesign: {
          ...state.dateDesign,
          dateDescriptionTextColor: color
        }
      })),
    setSocialsAlignment: (alignment: Alignment) => set((state) =>
      ({
        socialsDesign: {
          ...state.socialsDesign,
          socialsAlignment: alignment
        }
      })),
    setBackgroundColor: (color: Color) => set((state) =>
      ({
        backgroundDesign: {
          ...state.backgroundDesign,
          backgroundColor: color
        }
      })),
    setBackgroundSize: (backgroundSize: BackgroundSize) => set((state) =>
      ({
        backgroundDesign: {
          ...state.backgroundDesign,
          backgroundSize: backgroundSize
        }
      })),
    setBackgroundPosition: (backgroundPosition: BackgroundPosition) => set((state) =>
      ({
        backgroundDesign: {
          ...state.backgroundDesign,
          backgroundPosition: backgroundPosition
        }
      })),
    setCreditsTag: (creditsTag: string) => set((state) =>
      ({
        creditsTag: creditsTag
      })),
  })

export const scheduleStore = createStore<ScheduleState & ScheduleStateReducers & DesignStateReducers>()(
  devtools(
    persist(
      (...initializers) => ({
        ...initialState,
        ...reducers(...initializers)
      }),
      {
        name: 'schedule-storage'
      })))

type ExtractState<S> = S extends { getState: () => infer X } ? X : never

const createBoundedUseStore = ((store) => (selector) => useStore(store)) as <
  S extends StoreApi<unknown>,
>(
  store: S,
) => {
  (): ExtractState<S>
  <T>(selector: (state: ExtractState<S>) => T): T
}

const useScheduleStore = createBoundedUseStore(scheduleStore)

export default useScheduleStore
