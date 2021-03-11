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
        {eventInfo.event.extendedProps.points ? (
          <i>+{eventInfo.event.extendedProps.points} Points</i>
        ) : (
          "Redeemed"
        )}
      </div>
    );
  };

  const dispatch = useDispatch();

  const handleEventClick = (clickInfo) => {
    const currentTime = new Date().toISOString();

    if (clickInfo.event.extendedProps.points !== 0 && !user.isAdmin) {
      const activity = activities.filter(
        (elem) =>
          elem.title === clickInfo.event.title &&
          elem.start === clickInfo.event.start.toISOString() &&
          elem.end === clickInfo.event.end.toISOString()
      )[0];
      //should work fully once we seperate adding the activity form from the student view
      if (activity.end <= currentTime) {
        clickInfo.event.setExtendedProp("points", 0);
        dispatch(
          updatePoints(
            activity.id,
            user.id,
            clickInfo.event.extendedProps.points
          )
        );
      } else {
        alert("You haven't completed this yet!");
      }
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
      POINTS: {user.points}
    </div>
  );
};

export default SingleStudent;
