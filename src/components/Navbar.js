import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store";
import TodayIcon from '@material-ui/icons/Today';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import ContactMailIcon from '@material-ui/icons/ContactMail';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#B8C1EC",
  },
}));

const Navbar = ({ history }) => {
  //check for user state, if user -> student, add their points to navbar
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
        {user.id ? (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {user.isAdmin ? (
              <Tab
                label="Students"
                icon={<GroupIcon />}
                component={Link}
                to="/students" />
            ) : (
              <Tab
                label="Schedule"
                icon={<TodayIcon />}
                component={Link}
                to={`/students/${user.id}/activities`}
              />
            )}
            <Tab label="Rewards" icon={<EmojiEventsIcon />} component={Link} to="/rewards" />
            <Tab
              label="Logout"
              icon={<ExitToAppIcon />}
              onClick={() =>
                dispatch(logout())
              }
            />
          </Tabs>
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" icon={<HomeIcon />} component={Link} to="/login" />
            <Tab label="Signup" icon={<ContactMailIcon />} component={Link} to="/signup" />
          </Tabs>
        )}
    </Paper>
  );
};


export default Navbar;
