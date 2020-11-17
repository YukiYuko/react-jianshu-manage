import base from './base'; // 导入接口域名列表
import axios from '../axios/ajax'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块  如果是 formdata 模式就需要对参数进行qs格式化

const user = {
  // 登录
  login(params) {
    return axios.post(`${base.sq}/user/login`, params);
  },
  // 获取所有用户
  getAdminList() {
    return axios.get(`${base.sq}/user/list`)
  }
  // 其他接口…………
};

export default user;
