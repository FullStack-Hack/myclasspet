import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const ActivityForm = ({ activities, setActivities }) => {
  const [activity, handleSubmit] = useForm();

  const onSubmit = async (data) => {
    console.log("DATA", data);
    console.log("activity", activity);
    // await axios.post(`/api/student/1/activities`, data)
    // setActivities([...activities, data])
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="title" ref={activity} placeholder="Title" />
      <input
        name="start-date"
        type="date"
        ref={activity}
        placeholder="Start Date"
      />
      <input
        name="start-time"
        type="time"
        ref={activity}
        placeholder="Start Time"
      />
      <input
        name="end-date"
        type="date"
        ref={activity}
        placeholder="End Date"
      />
      <input
        name="end-time"
        type="time"
        ref={activity}
        placeholder="End Time"
      />

      <button type="submit">Add Activity</button>
    </form>
  );
};

export default ActivityForm;
