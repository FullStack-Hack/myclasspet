import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePoints } from "./store";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import ActivityForm from "./ActivityForm";
import GradeIcon from '@material-ui/icons/Grade';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  points: {
    marginTop: "2%",
    backgroundColor: "#B8C1EC",
    color: "#FFFFFF"
  }
}));

const SingleStudent = ({ match }) => {

  const classes = useStyles();

  const [activities, setActivities] = useState([]);

  const { user } = useSelector((state) => state);
  const [points, setPoints] = useState(user.points);

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

    if (clickInfo.event.extendedProps.points !== 0 && user.isAdmin) {
      const activity = activities.filter(
        (elem) => elem.id == clickInfo.event.id
      )[0];

      if (activity.end <= currentTime) {
        setPoints(points + clickInfo.event.extendedProps.points);

        dispatch(
          updatePoints(
            match.params.studentId,
            clickInfo.event.extendedProps.points,
            user.isAdmin,
            activity.id
          )
        );
        clickInfo.event.setExtendedProp("points", 0);
      } else {
        alert("This task isn't completed yet.");
      }
    }
  };

  return (
    <div>
      {!user.isAdmin && (
        <Button className={classes.points} startIcon={<GradeIcon style={{ color: "#FFD500" }}></GradeIcon>}>
          My Points: {user.points}
        </Button>
      )}
      <div className="single_student">
        <div class="form_points">
          {user.isAdmin && (
            <ActivityForm
              studentId={match.params.studentId}
              activities={activities}
              setActivities={setActivities}
            />
          )}
        </div>
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridDay"
            events={activities}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
