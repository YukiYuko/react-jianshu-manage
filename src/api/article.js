/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '../axios/ajax'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const article = {
  /*
  @description: 发布文章
  @params: title 标题
  @params: content 内容
  @params: description 描述
  @params: label 标签
   */
  create (params) {
    return axios.post(`${base.sq}/article/create`, params);
  },
  /**
   * @description: 文章列表
   * @params
   */
  list (params) {
    return axios.post(`${base.sq}/article/list`, params);
  },
  /**
   * @description 删除文章
   * @param id
   * @return {Q.Promise<any> | AxiosPromise<any>}
   */
  del(id) {
    return axios.post(`${base.sq}/article/del`, {id});
  }
  // 其他接口…………
};

export default article;
