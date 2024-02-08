"use client"

import dayjs, {Dayjs} from "dayjs";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {TimePicker} from "@mui/x-date-pickers";
import InputElement from "./InputElement";
import {Button, IconButton} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import DatePickerElement from "./DatePickerElement";
import styled from "@emotion/styled";
import React from "react";

const FormElement = styled.form`
    li {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid #d5d5d5;

        > div:first-of-type {
            flex-basis: 200px;
            white-space: normal;
            overflow-wrap: break-word;
        }

        &:last-of-type {
            border-bottom: none;
        }
    }
`

const EditRowElement = styled.li`
    background: #ececec;
    padding: 8px 16px;
    border-radius: 4px;
`

const updatedDayjs = (date: Dayjs, time: string): Dayjs => dayjs(`${date.format('MM-DD-YY')} ${time}`, 'MM-DD-YY HH:mm')

export type DateItem = {
  date: string
  time: string
  description: string
  dayjs: Dayjs
  discordTime?: string
}

type Inputs = {
  scheduleRow: DateItem[]
}

type FormWrapperProps = {
  dateRange: Dayjs[] | null
  onTimeSelect: (dateItems: DateItem[]) => void
} & React.ComponentPropsWithoutRef<'form'>


const FormWrapper: React.FC<FormWrapperProps> = ({dateRange, onTimeSelect, ...props}) => {
  const [editingRowDisplayData, setEditingRowDisplayData] = useState<string[]>([])
  const [editingRowData, setEditingRowData] = useState<Record<string, Partial<DateItem>>>()
  const {handleSubmit, control, formState: {errors}} = useForm<Inputs>();
  const {fields, append, remove} = useFieldArray({
    control,
    name: "scheduleRow",
  })

  useEffect(() => {
    remove()
    dateRange?.forEach(date => append({date: date.format('dddd, MM-DD-YY'), time: '', description: '', dayjs: date}))
  }, [dateRange, append])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formattedDate = data.scheduleRow.map(item => {
      const updatedDateTime = updatedDayjs(item.dayjs, item.time)
      const epochTime = updatedDateTime.unix()
      const epochDay = dayjs(item.dayjs.format('MM-DD-YY')).unix()

      return {
        ...item,
        dayjs: updatedDateTime,
        ...(isNaN(epochTime)
          ? {discordTime: `<t:${epochDay}:F> (<t:${epochDay}:R>) ${item.description}`}
          : {discordTime: `<t:${epochTime}:F> (<t:${epochTime}:R>) ${item.description}`})
      }
    })
    onTimeSelect(formattedDate)
  }

  return <FormElement onSubmit={handleSubmit(onSubmit)} {...props}>
    {
      dateRange !== null &&
      <>
        <ul>
          {fields.map((item, index) => (
            <React.Fragment key={item.id}>
              <li >
                <div>
                  {item.date}
                </div>
                <Controller
                  name={`scheduleRow.${index}.time`}
                  control={control}
                  defaultValue=""
                  render={({field}) =>
                    <TimePicker
                      label='Starting time'
                      value={field.value ? dayjs(field.value, "HH:mm") : null}
                      onChange={(date) => {
                        field.onChange(date ? date.format("HH:mm") : "")
                      }}
                    />
                  }
                />
                <Controller
                  name={`scheduleRow.${index}.description`}
                  control={control}
                  defaultValue=""
                  render={({field}) => (
                    <InputElement
                      type="text"
                      label="Enter description"
                      onSelect={(val) => field.onChange(val)}
                    />
                  )}
                />
                <div>
                  <IconButton
                    onClick={() => remove(index)}>
                    <RemoveCircleRoundedIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                    setEditingRowDisplayData([...editingRowDisplayData, item.id])
                  }}>
                    <AddCircleRoundedIcon color="primary" />
                  </IconButton>
                </div>
              </li>
              {
                editingRowDisplayData.includes(item.id) &&
                <EditRowElement>
                  <DatePickerElement onSelect={(selected) => {
                    if (selected) {
                      setEditingRowData(prevState => ({
                        ...prevState,
                        [item.id]: {
                          ...(prevState ? prevState[item.id] : {}),
                          date: selected.format('dddd, MM-DD-YY'),
                          dayjs: selected
                        }
                      }))
                    }
                  }}/>
                  <TimePicker
                    label='Starting time'
                    onChange={(date: Dayjs | null) => {
                      if (date) {
                        setEditingRowData(prevState => ({
                          ...prevState,
                          [item.id]: {
                            ...(prevState ? prevState[item.id] : {}),
                            time: date ? date.format("HH:mm") : ""
                          }
                        }))
                      }
                    }}/>
                  <InputElement
                    type="text"
                    label="Enter description"
                    onSelect={(selected) => {
                      if (selected) {
                        setEditingRowData(prevState => ({
                          ...prevState,
                          [item.id]: {
                            ...(prevState ? prevState[item.id] : {}),
                            description: selected
                          }
                        }))
                      }
                    }}
                  />
                  <div>
                    <IconButton onClick={() => setEditingRowDisplayData(editingRowDisplayData.filter(row => row !== item.id))}>
                      <CancelRoundedIcon color="error"
                      />
                    </IconButton>
                    {
                      editingRowData !== undefined &&
                      <IconButton onClick={() => {
                        if (editingRowData[item.id] !== undefined) {
                          const editedDayjs = editingRowData[item.id]?.dayjs ?? dayjs()
                          const date = editingRowData[item.id]?.date ?? dayjs().format('dddd, MM-DD-YY')
                          const time = editingRowData[item.id]?.time ?? ''
                          const description = editingRowData[item.id]?.description ?? ''

                          append({date: date, time: time, description: description, dayjs: editedDayjs})

                          setEditingRowData(() => {
                            let newData = {...editingRowData}
                            delete newData[item.id]
                            return newData
                          })
                          setEditingRowDisplayData(editingRowDisplayData.filter(value => value !== item.id))
                        }
                      }}>
                        <CheckCircleRoundedIcon color="success"/>
                      </IconButton>
                    }

                  </div>
                </EditRowElement>
              }
            </React.Fragment>
          ))}
        </ul>
        <Button sx={{width: '100%'}} type="submit" variant="contained">Submit</Button>
      </>
    }
  </FormElement>
}

export default FormWrapper
