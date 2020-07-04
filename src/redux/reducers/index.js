import { combineReducers } from "redux";
import userReducers from "./userReducers";
import uiReducers from "./uiReducers";
import dataReducers from "./dataReducers";

export default combineReducers({
  user: userReducers,
  UI: uiReducers,
  data: dataReducers,
});
