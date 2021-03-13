import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

//action type
const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";
const REMOVE_USER = "REMOVE_USER";
// const SET_FETCHING_STATUS = "SET_FETCHING_STATUS";

//action creator
const gotMe = (user) => ({
  type: GET_USER,
  user
});
const removeUser = () => ({ type: REMOVE_USER });

const updateUser = (user) => ({
  type: UPDATE_USER,
  user
});

// const setFetchingStatus = (isFetching) => ({
//   type: SET_FETCHING_STATUS,
//   isFetching,
// });

//thunk
export const login = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/api/auth/login", formData);
      console.log("DATAAAAA:", data);
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
      console.log('!!!!!!!!!!store.js',data)
      dispatch(gotMe(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// export const fetchMe = () => {
//   return async (dispatch) => {
//     dispatch(setFetchingStatus(true));
//     try {
//       const { data } = await axios.get("/auth/me");
//       dispatch(gotMe(data));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       dispatch(setFetchingStatus(false));
//     }
//   };
// };
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

export const updatePoints = (studentId, points) => {
  return async (dispatch) => {
    console.log("inside store, updatepoints", studentId, points);
    try {
      //update points in activity, student
      // await axios.put(`/api/activities/${activityId}`);
      const { data } = await axios.put(`/api/students/${studentId}`, {points: points})
      console.log("USIDTHUNK:", data)
      dispatch(gotMe(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {
  user: {
    // isFetching: true,
  },
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
    // case SET_FETCHING_STATUS:
    //   return {
    //     ...state, user: {
    //       ...state.user,
    //       isFetching: action.isFetching
    //     }
    //   }
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
