import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import {
  AllStudents,
  SingleStudent,
  AllActivities,
  AllRewards,
  Login,
} from "../components";
import { useSelector } from "react-redux";

const Routes = () => {
  const {user} = useSelector((state) => state)
  return (
    <div>

    {user.id ?
      <Switch>
      <div>

      <Route exact path="/students" component={AllStudents} />
      <Route exact path="/activities" component={AllActivities} />
      <Route exact path="/rewards" component={AllRewards} />
      <Route
        exact
        path="/students/:studentId/activities"
        component={SingleStudent}
        />
        </div>
    </Switch>
        :
        <div>

        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        </div>
}
        {/* <Route exact path="/home" component={UserPage} /> */}
        </div>
  );
};

export default withRouter(Routes);
