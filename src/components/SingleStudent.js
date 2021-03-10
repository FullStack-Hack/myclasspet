import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import ActivityForm from "./ActivityForm";

const SingleStudent = ({ match }) => {
  const [activities, setActivities] = useState([]);

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

  return (
    <div className="single_student">
      <div className="calendar">
        <FullCalendar
          className="calendar"
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridDay"
          events={activities}
          eventContent={renderEventContent}
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
