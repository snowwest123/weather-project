import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message as antdMessage } from 'antd'
import globalStore from "@globalStore";

// 请求的基类
export default class Api {
    api: AxiosInstance;
    constructor() {
        // 创建 axios 实例
        this.api = axios.create({
          baseURL: '/api',
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        // 设置请求拦截器
        this.api.interceptors.request.use(
          (config) => {
            globalStore.setLoadding(true);
            // 可以在此处添加 token
            // const token = localStorage.getItem('token');
            // if (token) {
            //   config.headers['Authorization'] = `Bearer ${token}`;
            // }
            return config;
          },
          (error) => {
            globalStore.setLoadding(false);
            return Promise.reject(error)
          }
        );
    
        // 设置响应拦截器
        this.api.interceptors.response.use(
          (response) => {
            const { code, message } = response.data;
            globalStore.setLoadding(false);
            if(code !== 200){
                antdMessage.error(message);
                return Promise.reject(new Error(message));
            }
           return  response?.data?.data?.data;
          }, // 直接返回响应数据
          (error) => {
            globalStore.setLoadding(false);
            if (error.response) {
              // 请求已发出，但服务端返回状态码非 2xx
              console.error('Response Error:', error.response.data.message || 'Server Error');
            } else if (error.request) {
              // 请求已发出，但没有响应
              console.error('No Response:', error.request);
            } else {
              // 其他错误
              console.error('Error:', error.message);
            }
            return Promise.reject(error);
          }
        );
      }
    
      // GET 请求方法
      async _get(url: string, params = {}) {
        try {
          return await this.api.get(url, { params });
        } catch (error) {
            this.handleError(error);
        }
      }
    
      // POST 请求方法
      async _post(url: string, data = {}) {
        try {
          return await this.api.post(url, data);
        } catch (error) {
          this.handleError(error);
        }
      }
    // 错误处理函数
     private handleError(error: any) {
        const message = error.response?.data?.message || 'Server Error';
        if (error.response) {
        console.error('Response Error:', message);
        } else if (error.request) {
        console.error('No Response:', error.request);
        } else {
        console.error('Error:', error.message);
        }

        return Promise.reject(error);
     }

}
