import {
  SET_USER
} from "./types";
import { combineReducers } from "redux";
const defaultState = {
  user: {
    nickname: "六花"
  }
};
// 用户相关reducers
const users = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      state.user = {
        ...action.params
      }
      return state;
    default:
      return state;
  }
};
// 合并所有的reducers 导出
const rootReducer = combineReducers({ users });
export default rootReducer;