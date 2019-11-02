import { combineReducers } from "redux";

import auth from "./auth";
import recentOrder from "./recentOrder";
import product from "./product";
import category from "./category";

const appReducer = combineReducers({
  auth,
  product,
  category,
  recentOrder
});

export default appReducer;