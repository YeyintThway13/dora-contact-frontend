import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_RESET,
  USER_REGISTER_RESET,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNOUT_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNOUT_REQUEST,
} from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNIN_RESET:
      return { userInfo: null };
    default:
      return state;
  }
};

export const userSignoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNOUT_REQUEST:
      return { loading: true };
    case USER_SIGNOUT_SUCCESS:
      return { loading: false, successSignout: true };
    case USER_SIGNOUT_FAIL:
      return {
        loading: false,
        successSignout: false,
        errorSignout: action.payload,
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return { userInfo: null };
    default:
      return state;
  }
};
