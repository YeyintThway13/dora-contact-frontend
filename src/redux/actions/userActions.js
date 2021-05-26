import axios from "axios";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNOUT_REQUEST,
  USER_SIGNOUT_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_RESET,
  USER_REGISTER_RESET,
} from "../constants/userConstants";

export const login = (name, password) => async (dispatch, getState) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/users/login",
      {
        name,
        password,
      }
    );
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("doraContactUserInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const register =
  (name, password, password2) => async (dispatch, getState) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/users/register",
        {
          name,
          password,
          password2,
        }
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("doraContactUserInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const signout = () => async (dispatch, getState) => {
  dispatch({ type: USER_SIGNOUT_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/users/signout",
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    localStorage.removeItem("doraContactUserInfo");
    dispatch({ type: USER_SIGNOUT_SUCCESS });
    dispatch({ type: USER_SIGNIN_RESET });
    dispatch({ type: USER_REGISTER_RESET });
  } catch (err) {
    dispatch({
      type: USER_SIGNOUT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
