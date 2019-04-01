import base from './base'; // 导入接口域名列表
import axios from '../axios/ajax'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块  如果是 formdata 模式就需要对参数进行qs格式化

const admin = {
  // 登录
  login(params) {
    return axios.post(`${base.simple}/authenticate`, params);
  },
  // 获取所有管理员
  getAdminList() {
    return axios.get(`${base.sq}/admin/get`)
  }
  // 其他接口…………
};

export default admin;