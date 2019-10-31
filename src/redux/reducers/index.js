import { combineReducers } from "redux";

import category from "./category";
import auth from "./auth";

const appReducer = combineReducers({
  category,
  auth
});

export default appReducer;