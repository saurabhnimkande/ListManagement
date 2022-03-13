import {
  GET_USER_ERROR,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
} from "./actionTypes";

export const getUserData = () => (dispatch) => {
  dispatch(getUserLoading());
  fetch("http://localhost:2525/")
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
