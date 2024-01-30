import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import { Card } from "primereact/card";
import moment from "moment";

export default function CustomWeekView({ date, localizer, max = localizer.endOf(new Date(), "day"), min = localizer.startOf(new Date(), "day"), scrollToTime = localizer.startOf(new Date(), "day"), ...props }) {
  const currRange = useMemo(() => CustomWeekView.range(date, { localizer }), [date, localizer]);

console.log(JSON.stringify(props))

const [start, ...rest] = CustomWeekView.range(date, { localizer });

 

  return (
    // <TimeGrid
    //   date={date}
    //   eventOffset={15}
    //   localizer={localizer}
    //   max={max}
    //   min={min}
    //   range={currRange}
    //   scrollToTime={scrollToTime}
    //   {...props}
    // />

    <div className="flex flex-row flex-wrap">
      {props.events.map((event: any, index: any) => {
        return (
          <Card key={index} className="w-[30%] m-3"> 
            <p>{new moment(event.start).format("dddd")}</p>
            {/* <p>{new moment(start).format("dddd")}</p> */}
            <p>{event.title}</p>
            <a href={event?.resource}> 
             <img height={150} width={100} src="https://i.pinimg.com/736x/4d/e1/bf/4de1bf3181fe25a379002081324f8309.jpg"></img></a>
          </Card>
        );
      })}
    </div>
  );
}

CustomWeekView.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
};

CustomWeekView.range = (date, { localizer }) => {
  const start = date;
  const end = localizer.add(start, 5, "day");

  let current = start;
  const range = [];

  while (localizer.lte(current, end, "day")) {
    range.push(current);
    current = localizer.add(current, 1, "day");
  }

  return range;
};

CustomWeekView.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -6, "day");

    case Navigate.NEXT:
      return localizer.add(date, 6, "day");

    default:
      return date;
  }
};

CustomWeekView.title = (date, { localizer }) => {
  const [start, ...rest] = CustomWeekView.range(date, { localizer });
  return localizer.format({ start, end: rest.pop() }, "dayRangeHeaderFormat");
};
