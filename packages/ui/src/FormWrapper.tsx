"use client"

import dayjs, {Dayjs} from "dayjs";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {useEffect} from "react";
import {TimePicker} from "@mui/x-date-pickers";
import InputElement from "./InputElement";
import {Button} from "@mui/material";

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
      const updatedDayjs = dayjs(`${item.dayjs.format('MM-DD-YY')} ${item.time}`, 'MM-DD-YY HH:mm')
      const epochTime = updatedDayjs.unix()
      const epochDay = dayjs(item.dayjs.format('MM-DD-YY')).unix()

      return {
        ...item,
        dayjs: updatedDayjs,
        ...(isNaN(epochTime)
          ? {discordTime: `<t:${epochDay}:F> (<t:${epochDay}:R>): ${item.description}`}
          : {discordTime: `<t:${epochTime}:F> (<t:${epochTime}:R>) : ${item.description}`})
      }
    })
    onTimeSelect(formattedDate)
  }

  return <form onSubmit={handleSubmit(onSubmit)} {...props}>
    {
      dateRange !== null &&
      <>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
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
                    required={true}
                    type="text"
                    label="Enter description"
                    onSelect={(val) => field.onChange(val)}
                  />
                )}
              />
            </li>
          ))}
        </ul>
        <Button sx={{width: '100%'}} type="submit" variant="contained">Submit</Button>
      </>
    }
  </form>
}

export default FormWrapper
