import { combineReducers } from "redux";
import {
  userRegisterReducer,
  userSigninReducer,
  userSignoutReducer,
} from "./reducers/userReducers";

export default combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userSignout: userSignoutReducer,
});
