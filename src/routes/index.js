import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import {
  AllStudents,
  SingleStudent,
  AllActivities,
  AllRewards,
  Login,
} from "../components";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/students" component={AllStudents} />
      <Route exact path="/activities" component={AllActivities} />
      <Route exact path="/rewards" component={AllRewards} />
      <Route exact path="/student1" component={SingleStudent} />
      <Route exact path="/login" component={Login} />
      {/* <Route exact path="/home" component={UserPage} /> */}
    </Switch>
  );
};

export default withRouter(Routes);
