import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

const SingleStudent = () => {
  const [activities, setActivities] = useState([]);

  //GET activities from selected student
  //presumably we would pass the studentId down from the 'AllStudents' view
  useEffect(() => {
    //need another function for async/await within useEffect
    //can just call the function when using Redux
    const getActivities = async () => {
      //make sure server port and front end port are the same?
      const { data } = await axios.get(`/api/students/1/activities`);
      setActivities(data);
    };
    getActivities();
  }, []);
  console.log("ACTIVITIES", activities);
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridDay"
      events={activities}
    />
  );
};

export default SingleStudent;
