import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePoints } from "./store";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import ActivityForm from "./ActivityForm";

const SingleStudent = ({ match }) => {
  const [activities, setActivities] = useState([]);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    const getActivities = async () => {
      const { data } = await axios.get(
        `/api/students/${match.params.studentId}/activities`
      );

      setActivities(data);
    };

    getActivities();
  }, []);

  const renderEventContent = (eventInfo) => {
    return (
      <div className="eventContent">
        <b>{eventInfo.event.title}</b>
        <br />
        <i>+{eventInfo.event.extendedProps.points} Points</i>
      </div>
    );
  };

  const dispatch = useDispatch();

  const handleEventClick = (clickInfo) => {
    if (clickInfo.event.extendedProps.points !== 0 && !user.isAdmin) {
      //activityId, studentId, points
      const activity = activities.filter(
        (elem) =>
          elem.title === clickInfo.event.title &&
          elem.start === clickInfo.event.start.toISOString() &&
          elem.end === clickInfo.event.end.toISOString()
      )[0];

      dispatch(
        updatePoints(activity.id, user.id, clickInfo.event.extendedProps.points)
      );
    }
  };

  return (
    <div className="single_student">
      <div className="calendar">
        <FullCalendar
          className="calendar"
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridDay"
          events={activities}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
        />
      </div>
      <ActivityForm
        studentId={match.params.studentId}
        activities={activities}
        setActivities={setActivities}
      />
    </div>
  );
};

export default SingleStudent;
