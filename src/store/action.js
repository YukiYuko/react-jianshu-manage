import {SET_USER} from './types';
const _initAction = (type, params) => {
  return {
    type,
    params
  }
}

export const set_user = _initAction(SET_USER, {
  nickname: "Yuki",
  phone: 18683370859,
  email: "1060801906@qq.com"
})