"use client";
import {create, StateCreator, StoreApi, useStore} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {DateTime} from "luxon";
import type {} from '@redux-devtools/extension'
import {createStore} from "zustand/vanilla";

export type Template = {
  date: DateTime | string,
  time?: string
  description?: string
}
export type SocialNetworks = 'twitch' | 'twitter' | 'youtube'

export type Socials = {
  network: SocialNetworks | 'none'
  tag?: string
}

export type ScheduleState = {
  startingDate: DateTime | string,
  totalStreams: number,
  timeZones: string[],
  templates: Template[],
  mainHeader: string
  socials: Socials[]
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
  addSocials: (index: number, socials: Socials) => void,
  removeSocials: (index: number) => void,
}

let initialState: ScheduleState = {
  startingDate: DateTime.local(),
  totalStreams: 1,
  timeZones: [],
  templates: [{date: DateTime.local()}],
  mainHeader: 'Edit header',
  socials: [{network: 'none'}]
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
    setMainHeader: (mainHeader: string) => set((state) => ({mainHeader})),
    addSocials: (index: number, socials: Socials) => set((state) => {

      return {
        socials: [...state.socials.slice(0, index), socials, ...state.socials.slice(index + 1)]
      }
    }),
    removeSocials: index => set((state) => {
      return {
        socials: [...state.socials.slice(0, index), ...state.socials.slice(index + 1, state.socials.length )]
      }
    })
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
