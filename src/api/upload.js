import base from './base'; // 导入接口域名列表
import axios from '../axios/ajax'; // 导入http中创建的axios实例


const upload = {
  // 登录
  singleUpload(params) {
    return axios.post(`${base.sq}/upload`, params)
  }
};

export default upload;
