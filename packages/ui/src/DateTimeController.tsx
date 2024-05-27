'use client'

import React from "react";
import {Template} from "web/state/schedule";
import ToolTip from "./ToolTip";
import DatePickerElement from "./DatePickerElement";
import TimePickerElement from "./TimePickerElement";
import {DateTime} from "luxon";
import InputElement from "./InputElement";
import ButtonWrapper from "./ButtonWrapper";
import styled from "@emotion/styled";
import Checkbox from "./Checkbox";

const HeaderWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 8px;
`

const DateTimeItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`

const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4px 0;
    > div {
        color: rgba(0, 0, 0, 0.6);
        font-size: 13px;
        white-space: nowrap;
        margin-top: 6px;
    }
`

type DateTimeControllerProps = {
  templates: Template[]
  setTemplate: (index: number, templates: Template) => void
  removeTemplate: (index: number) => void
  addTemplateAfter: (index: number, template: Template) => void
} & React.ComponentPropsWithoutRef<'section'>

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
            <DatePickerElement
              onSelect={(date) => {
                if (date !== null)
                  setTemplate(index, {...template, date: date})
              }}
              value={template.date}
            />
            <TimePickerElement
              label='Time'
              value={template.time !== undefined
                ? DateTime.fromFormat(template.time, 'HH:mm')
                : DateTime.fromFormat('00:00', 'HH:mm')}
              onSelect={(selectedTime) => {
                setTemplate(index, {...template, time: selectedTime.toFormat('HH:mm')})
              }}
              disabled={template.wholeDay ?? false}
            />
            <CheckboxContainer>
              <Checkbox
                title='Whole day'
                name='name'
                isChecked={template.wholeDay ?? false}
                onChecked={isChecked => {
                  setTemplate(index, {...template, wholeDay: isChecked})
                }}
              />
            </CheckboxContainer>
            <InputElement
              label='Description'
              type='text'
              value={template.description}
              onInput={inputText => {
                setTemplate(index, {...template, description: inputText ?? ''})
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
