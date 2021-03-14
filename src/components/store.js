import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";
import history from '../history'

//action type
const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";
const REMOVE_USER = "REMOVE_USER";

//action creator
const gotMe = (user) => ({
  type: GET_USER,
  user
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
      const {data} = await axios.post('/api/students/add', userBody)
      dispatch(gotMe(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.delete("/auth/logout");
      dispatch(removeUser());
      history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };
};

export const updatePoints = (studentId, points, isAdmin, activityId) => {
  return async (dispatch) => {
    console.log("inside store, updatepoints", studentId, points);
    try {
      if(typeof activityId !== "undefined"){
        await axios.put(`/api/activities/${activityId}`);
      }
      const { data } = await axios.put(`/api/students/${studentId}`, {points: points})
      if(!isAdmin){
        dispatch(gotMe(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };
    case UPDATE_USER:
      return { user: action.user }
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
