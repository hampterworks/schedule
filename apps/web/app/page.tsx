"use client";
import React from "react";
import useScheduleStore from "../state/schedule";

let formatDateRFC3339 = (date: Date | string) => (date instanceof Date ? date : new Date(date))?.toISOString().split("T")[0]

const Page: React.FC = () => {
  const {
    templates,
    totalStreams,
    timeZones,
    startingDate,
    setTotalStreams,
    setTemplate,
    setStartingDate,
    removeTemplate,
    addTemplateAfter
  } = useScheduleStore();

  return (
    <div>
      <div>
        <p>Starting date:</p>
        <input type="date" value={formatDateRFC3339(startingDate)}
               onChange={event => setStartingDate(new Date(event.target.value))}/>
      </div>
      <div>
        <p>Total days:</p>
        <input type="number" value={totalStreams} onChange={event => setTotalStreams(parseInt(event.target.value))}/>
      </div>
      <p>timeZones: {JSON.stringify(timeZones)}</p>
      <div>
        {
          templates.map((template, index) =>
            <div key={"template-" + index}>
              <input
                type="date" value={formatDateRFC3339(template.date)}
                onChange={event =>
                  setTemplate(index, {...template, date: new Date(event.target.value)})}/>
              <input
                type="time" value={template.time}
                onChange={event =>
                  setTemplate(index, {...template, time: event.target.value})}/>
              <input
                type="text" value={template.description}
                onChange={event =>
                  setTemplate(index, {...template, description: event.target.value})}/>
              <button onClick={() => removeTemplate(index)}>Remove</button>
              <button onClick={() => addTemplateAfter(index, {date: template.date})}>Add below</button>
            </div>)
        }
        <pre>
          {JSON.stringify({
            templates,
            totalStreams,
            timeZones,
            startingDate
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default Page
