import {
  GET_USER_ERROR,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  SET_USER,
} from "./actionTypes";

export const getUserData = () => (dispatch) => {
  dispatch(getUserLoading());
  fetch("https://listdatabase.herokuapp.com/user")
    .then((e) => e.json())
    .then((e) => dispatch(getUserSuccess(e)))
    .catch((err) => dispatch(getUserError(err)));
};

export const getUserLoading = () => ({
  type: GET_USER_LOADING,
});

export const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});

export const getUserError = (err) => ({
  type: GET_USER_ERROR,
  payload: err,
});

export const setUser = (data) => ({
  type: SET_USER,
  payload: data,
});
