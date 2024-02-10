"use client";
import {create, StateCreator} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import type {} from '@redux-devtools/extension'

export type TimeZone = {
  label: string,
  value: string,
  timeZone: string
}

export type Template = {
  date: Date,
  time?: string
  description?: string
}

export type ScheduleState = {
  startingDate: Date,
  totalStreams: number,
  timeZones: TimeZone[],
  templates: Template[],
}

export type ScheduleStateReducers = {
  setStartingDate: (startingDate: Date) => void,
  setTotalStreams: (totalStreams: number) => void,
  setTimeZones: (timeZones: TimeZone[]) => void,
  setTemplates: (templates: Template[]) => void,
  setTemplate: (index: number, templates: Template) => void,
  removeTemplate: (index: number) => void,
  addTemplateAfter: (index: number) => void
}

let initialState: ScheduleState = {
  startingDate: new Date(),
  totalStreams: 1,
  timeZones: [],
  templates: [{date: new Date()}],
}

let reducers: StateCreator<ScheduleStateReducers & ScheduleState, [["zustand/devtools", never]], [], ScheduleStateReducers> =
  (set, get) => ({
    setStartingDate: (startingDate: Date) => set((state) => ({startingDate})),
    setTotalStreams: (totalStreams: number) => set((state) => ({
      totalStreams,
      templates: [...Array(totalStreams).keys()].map(index => state.templates[index] ?? {date: new Date()})
    })),
    setTimeZones: (timeZones: TimeZone[]) => set((state) => ({timeZones})),
    setTemplates: (templates: Template[]) => set((state) => ({templates})),
    setTemplate: (index: number, template: Template) => set((state) => ({
      templates: [...state.templates.slice(0, index), template, ...state.templates.slice(index + 1, state.templates.length)]
    })),
    removeTemplate: (index: number) => set((state) => ({
      totalStreams: state.totalStreams - 1,
      templates: [...state.templates.slice(0, index), ...state.templates.slice(index + 1, state.templates.length)]
    })),
    addTemplateAfter: (index: number) => set((state) => ({
      totalStreams: state.totalStreams + 1,
      templates: [...state.templates.slice(0, index), {date: state.templates[index]?.date ?? new Date()}, ...state.templates.slice(index, state.templates.length)]
    }))
  })


const useScheduleStore = create<ScheduleState & ScheduleStateReducers>()(
  devtools(
    persist(
    (...initializers) => ({
      ...initialState,
      ...reducers(...initializers)
    }),
    {
      name: 'schedule-storage'
    },
  ),
  ),
)

export default useScheduleStore
