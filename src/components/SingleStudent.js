import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import ActivityForm from "./ActivityForm";

const SingleStudent = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      const { data } = await axios.get(`/api/students/1/activities`);

      setActivities(data);
    };
    console.log("ACTIVITIES", activities);
    getActivities();
  }, []);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridDay"
        events={activities}
      />
      <ActivityForm
        className="form"
        activities={activities}
        setActivities={setActivities}
      />
    </>
  );
};

export default SingleStudent;
