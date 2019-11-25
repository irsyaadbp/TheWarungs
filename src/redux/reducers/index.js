import { combineReducers } from "redux";

import auth from "./auth";
import order from "./order";
import product from "./product";
import category from "./category";

const appReducer = combineReducers({
  auth,
  product,
  category,
  order
});

export default appReducer;