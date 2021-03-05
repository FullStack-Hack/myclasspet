import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";

const SingleStudent = () => {
  const [activities, setActivities] = useState([]);

  //GET activities from selected student
  //presumably we would pass the studentId down from the 'AllStudents' view
  useEffect(() => {
    //need another function for async/await within useEffect
    const getActivities = async () => {
      //make sure server port and front end port are the same?
      const { data } = await axios.get(`/api/students/1/activities`);
      setActivities(data);
    };
    getActivities();
  }, []);
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridDay"
      events={activities}
    />
  );
};

export default SingleStudent;
