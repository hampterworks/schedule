'use client'

import React from "react";
import {Template} from "web/state/schedule";
import ToolTip from "./ToolTip";
import {DateTime} from "luxon";
import ButtonWrapper from "./ButtonWrapper";
import Input from "./components/Input";
import Checkbox from "./components/Checkbox";
import styled, {css} from "styled-components";

const HeaderWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 8px;
`

const DateTimeItem = styled.li`
    display: grid;
    grid-template-columns: minmax(100px, 200px) minmax(65px, 150px) 75px minmax(200px, 1fr) 40px;
    justify-content: center;
    align-items: center;
    gap: 8px;
`

/**
 * @typedef {Object} DateTimeControllerProps
 * @property {Template[]} templates - An array of templates.
 * @property {(index: number, templates: Template) => void} setTemplate - A function to set template at a specific index.
 * @property {(index: number) => void} removeTemplate - A function to remove template at a specific index.
 * @property {(index: number, template: Template) => void} addTemplateAfter - A function to add a template after a specific index.
 * @property {React.ComponentPropsWithoutRef<'section'>} [props] - Additional props for the section component.
 */
type DateTimeControllerProps = {
  templates: Template[]
  setTemplate: (index: number, templates: Template) => void
  removeTemplate: (index: number) => void
  addTemplateAfter: (index: number, template: Template) => void
} & React.ComponentPropsWithoutRef<'section'>

/**
 * DateTimeController component is responsible for displaying and managing date and time templates.
 *
 * @component
 * @category Components
 *
 * @param {object[]} templates - An array of date and time templates.
 * @param {function} setTemplate - A function to modify the template at a given index.
 * @param {function} removeTemplate - A function to remove a template at a given index.
 * @param {function} addTemplateAfter - A function to add a new template after a given index.
 * @param {...object} props - Other props to be passed to the component.
 *
 * @returns {JSX.Element} The rendered DateTimeController component.
 */
const DateTimeController: React.FC<DateTimeControllerProps> = ({templates, setTemplate, removeTemplate, addTemplateAfter, ...props}) => {
  return <section>
    <HeaderWrapper>
      Add Time and Description:
      <ToolTip message="If you wish to select a whole day do not change the default hour"/>
    </HeaderWrapper>
    <ul>
      {
        templates.map((template, index) =>
          <DateTimeItem key={"template-" + index}>
            <Input
              type='date'
              value={typeof template.date !== "string"
                ? template.date.toISODate() ?? ''
                : DateTime.fromISO(template.date).toISODate() ?? ''}
              onInput={date => {
                if (date !== null)
                  setTemplate(index, {...template, date: date as string})
              }}
            />
            <Input
              type='time'
              value={template.time ?? ''}
              onInput={selectedTime => {
                setTemplate(index, {...template, time: (selectedTime as string)})
              }}
              disabled={template.wholeDay ?? false}
            />
            <Checkbox
              label='Whole day'
              name='whole-day'
              isChecked={template.wholeDay ?? false}
              onChecked={isChecked => {
                setTemplate(index, {...template, wholeDay: isChecked})
              }}
              sx={css`
                    color: rgba(0, 0, 0, 0.6);
                    font-size: 13px;
                    white-space: nowrap;
                    margin-top: 6px;
                    flex-direction: column;
                    gap: 2px;
                `}
            />
            <Input
              value={template.description}
              placeholder='description'
              onInput={inputText => {
                setTemplate(index, {...template, description: inputText as string ?? ''})
              }}
            />
            <ButtonWrapper
              removeItemFunction={removeTemplate}
              addItemFunction={addTemplateAfter}
              index={index}
              template={template}
            />
          </DateTimeItem>)
      }
    </ul>
  </section>
}

export default DateTimeController
