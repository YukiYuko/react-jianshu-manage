import base from './base'; // 导入接口域名列表
import axios from '../axios/ajax'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块  如果是 formdata 模式就需要对参数进行qs格式化

const SYSTEM = "system";
const LABEL = "label";
const BANNER = "banner";

const system = {
  /**
   * @description 创建标签
   * @param type
   * @param params：name 标签名
   */
  label_create(type = LABEL, params) {
    return axios.post(`${base.sq}/${SYSTEM}/${type}/create`, params);
  },
  /**
   *
   */
  label_list(type = LABEL) {
    return axios.post(`${base.sq}/${SYSTEM}/${type}/list`);
  },
  label_del(type = LABEL, params) {
    return axios.post(`${base.sq}/${SYSTEM}/${type}/del`, params);
  },
  /**
   * @description 创建banner
   * @param params
   * @return {Q.Promise<any> | AxiosPromise<any>}
   */
  banner_create(params) {
    return axios.post(`${base.sq}/${SYSTEM}/${BANNER}/create`, params);
  },
  /**
   * @description 获取banner列表
   * @return {Q.Promise<any> | AxiosPromise<any>}
   */
  banner_list() {
    return axios.post(`${base.sq}/${SYSTEM}/${BANNER}/list`);
  },
  banner_del(id) {
    return axios.post(`${base.sq}/${SYSTEM}/${BANNER}/del`, {id});
  },
};

export default system;
