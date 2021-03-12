import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

//action type
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

//action creator
const gotMe = (user) => ({
  type: GET_USER,
  user,
});
const removeUser = () => ({ type: REMOVE_USER });

//thunk
export const login = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/api/auth/login", formData);
      dispatch(gotMe(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const signUp = (userBody) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/students/", userBody);
      dispatch(gotMe(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.delete("/auth/logout");
      dispatch(removeUser());
    } catch (error) {
      console.error(error);
    }
  };
};

export const updatePoints = (activityId, studentId, points) => {
  return async (dispatch) => {
    try {
      //update points in activity, student
      await axios.put(`/api/activities/${activityId}`);
      await axios.put(`/api/students/${studentId}`, { points });

      dispatch(gotMe(points));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };
    case REMOVE_USER:
      return initialState;

    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
