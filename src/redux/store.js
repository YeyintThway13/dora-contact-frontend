import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer.js";

const middleware = [thunk];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("doraContactUserInfo")
      ? JSON.parse(localStorage.getItem("doraContactUserInfo"))
      : null,
  },
  userRegister : {
    userInfo: localStorage.getItem("doraContactUserInfo")
      ? JSON.parse(localStorage.getItem("doraContactUserInfo"))
      : null,
  }
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
