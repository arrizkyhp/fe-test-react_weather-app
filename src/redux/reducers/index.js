import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";

const reducer = combineReducers({ weatherReducer })

export default reducer