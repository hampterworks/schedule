"use client";
import {create, StateCreator, StoreApi, useStore} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import {createStore} from "zustand/vanilla";

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
  addTemplateAfter: (index: number, template: Template) => void
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
    setTotalStreams: (totalStreams: number) => set((state) => {
      if (totalStreams < 0)
        throw new RangeError("Can't set total number of streams to less than 0!")
      return {
        totalStreams,
        templates: [...Array(totalStreams).keys()].map(index => state.templates[index] ?? {date: new Date()})
      }
    }),
    setTimeZones: (timeZones: TimeZone[]) => set((state) => ({timeZones})),
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
        templates: [...state.templates.slice(0, index), template, ...state.templates.slice(index, state.templates.length)]
      }
    })
  })

export const scheduleStore = createStore<ScheduleState & ScheduleStateReducers>()(
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
