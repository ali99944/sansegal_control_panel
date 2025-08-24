import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from './reducers/auth_reducer'

const rootReducer = combineReducers({
  auth: AuthReducer
});

export default rootReducer