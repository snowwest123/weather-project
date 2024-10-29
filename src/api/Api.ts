/*
 * @Author: xiaosihan 
 * @Date: 2023-04-18 15:18:19 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2023-04-18 21:02:38
 */

import utils from "@utils";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


// 请求的基类
export default class Api {

    constructor() {

    }

    //访问域名
    baseURL = "";

    //开发模式访问的域名
    devBaseURL = "/api";

    //超时时间
    timeout = 60000;

    // 带凭据
    withCredentials = false;

    // 创建 请求实例
    _createInstance() {
        return axios.create({
            baseURL: utils.isDev ? this.devBaseURL : this.baseURL,
            timeout: this.timeout,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // withCredentials: true
        });
    }

    // 请求拦截器
    _requestInterceptors(config: AxiosRequestConfig): AxiosRequestConfig {
        return config;
    }

    // 响应拦截器
    _responseInterceptors(res: AxiosResponse): AxiosResponse {
        return res;
    }

    // get请求
    _get(url: string, params?: {}) {
        return axios.create({
            baseURL: utils.isDev ? this.devBaseURL : this.baseURL,
            timeout: this.timeout,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: this.withCredentials,
        }).get(url, { params });
    }

    // post 请求
    _post(url: string, data = {}) {
        return axios.create({
            baseURL: utils.isDev ? this.devBaseURL : this.baseURL,
            timeout: this.timeout,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: this.withCredentials,
        }).post(url, data);
    }

    // 上传
    _upload(url: string, file: any) {

        return axios.create({
            baseURL: utils.isDev ? this.devBaseURL : this.baseURL,
            timeout: this.timeout,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: this.withCredentials,
        }).post(url, file);
    }

}
