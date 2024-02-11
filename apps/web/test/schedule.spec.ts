import {scheduleStore} from "../state/schedule";
import * as fc from 'fast-check';
import {VerbosityLevel} from 'fast-check';

// set each property test to run 50 times
fc.configureGlobal({numRuns: 50, verbose: VerbosityLevel.VeryVerbose})

test('schedule initializes', () => {
  let store = scheduleStore
  expect(store.getState()).toStrictEqual(store.getInitialState());
})

test('setStartingDate', () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      let store = scheduleStore
      store.getState().setStartingDate(date)
      expect(store.getState().startingDate).toStrictEqual(date)
    }))
})

test('setTotalStreams zero or greater', () => {
  fc.assert(
    fc.property(fc.integer({min: 0, max: 500}), (totalStreams) => {
      let store = scheduleStore
      store.getState().setTotalStreams(totalStreams)
      expect(store.getState().totalStreams).toStrictEqual(totalStreams)
      expect(store.getState().templates.length).toStrictEqual(totalStreams)
    }))
})

test('setTotalStreams less than zero', () => {
  fc.assert(
    fc.property(fc.integer({max: -1}), (totalStreams) => {
      let store = scheduleStore
      expect(() => store.getState().setTotalStreams(totalStreams)).toThrow(RangeError)
    }))
})

test('setTemplates', () => {
  fc.assert(
    fc.property(fc.integer({min: 0, max: 500}), (totalStreams) => {
      let store = scheduleStore
      store.getState().setTemplates([...Array(totalStreams).keys()].map(index => ({
        date: new Date(),
        description: index.toString()
      })))
      expect(store.getState().totalStreams).toStrictEqual(totalStreams)
      expect(store.getState().templates.length).toStrictEqual(totalStreams)
    }))
})

test('setTemplate in range', () => {
  fc.assert(
    fc.property(fc.integer({min: 500, max: 600}), fc.integer({
      min: 0,
      max: 500
    }), fc.date(), fc.string(), fc.string(), (range, index, date, time, description) => {
      let store = scheduleStore
      store.getState().setTemplates([...Array(range).keys()].map(() => ({date: new Date()})))
      store.getState().setTemplate(index, {date, time, description})
      expect(store.getState().templates[index]).toStrictEqual({date, time, description})
    }))
})

test('setTemplate out of range (above)', () => {
  fc.assert(
    fc.property(fc.integer({
      min: 0,
      max: 500
    }), fc.integer({min: 501}), fc.date(), fc.string(), fc.string(), (range, index, date, time, description) => {
      let store = scheduleStore
      store.getState().setTemplates([...Array(range).keys()].map(() => ({date: new Date()})))
      expect(() => store.getState().setTemplate(index, {date, time, description})).toThrow(RangeError)
    }))
})

test('setTemplate out of range (below)', () => {
  fc.assert(
    fc.property(fc.integer({max: -1}), fc.date(), fc.string(), fc.string(), (index, date, time, description) => {
      let store = scheduleStore
      expect(() => store.getState().setTemplate(index, {date, time, description})).toThrow(RangeError)
    }))
})

test('removeTemplate in range', () => {
  fc.assert(
    fc.property(fc.integer({min: 500, max: 600}), fc.integer({
      min: 0,
      max: 500
    }), fc.date(), fc.string(), fc.string(), (range, index, date, time, description) => {
      let store = scheduleStore
      store.getState().setTemplates([...Array(range).keys()].map(() => ({date: new Date()})))
      store.getState().setTemplate(index, {date, time, description})
      expect(store.getState().templates[index]).toStrictEqual({date, time, description})
      store.getState().removeTemplate(index)
      expect(store.getState().templates[index]).not.toStrictEqual({date, time, description})
    }))
})

test('removeTemplate out of range (above)', () => {
  fc.assert(
    fc.property(fc.integer({min: 0, max: 500}), fc.integer({min: 501}), (range, index) => {
      let store = scheduleStore
      store.getState().setTemplates([...Array(range).keys()].map(() => ({date: new Date()})))
      expect(() => store.getState().removeTemplate(index)).toThrow(RangeError)
    }))
})

test('removeTemplate out of range (below)', () => {
  fc.assert(
    fc.property(fc.integer({max: -1}), (index) => {
      let store = scheduleStore
      expect(() => store.getState().removeTemplate(index)).toThrow(RangeError)
    }))
})

test('addTemplateAfter in range', () => {
  fc.assert(
    fc.property(fc.integer({min: 500, max: 600}), fc.integer({
      min: 0,
      max: 500
    }), fc.date(), fc.string(), fc.string(), (range, index, date, time, description) => {
      let store = scheduleStore
      store.getState().setTemplates([...Array(range).keys()].map(() => ({date: new Date()})))
      store.getState().addTemplateAfter(index, {date, time, description})
      expect(store.getState().templates[index]).toStrictEqual({date, time, description})
    }))
})

test('addTemplateAfter out of range (above)', () => {
  fc.assert(
    fc.property(fc.integer({
      min: 0,
      max: 500
    }), fc.integer({min: 501}), fc.date(), fc.string(), fc.string(), (range, index, date, time, description) => {
      let store = scheduleStore
      store.getState().setTemplates([...Array(range).keys()].map(() => ({date: new Date()})))
      expect(() => store.getState().addTemplateAfter(index, {date, time, description})).toThrow(RangeError)
    }))
})

test('addTemplateAfter out of range (below)', () => {
  fc.assert(
    fc.property(fc.integer({max: -1}), fc.date(), fc.string(), fc.string(), (index, date, time, description) => {
      let store = scheduleStore
      expect(() => store.getState().addTemplateAfter(index, {date, time, description})).toThrow(RangeError)
    }))
})
