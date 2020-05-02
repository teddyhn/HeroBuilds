import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import filterReducer from "./filterReducer";

export default combineReducers({
  modal: modalReducer,
  filter: filterReducer
});