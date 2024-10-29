/*
 * @Author: xiaosihan 
 * @Date: 2024-07-29 12:22:45 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2024-08-02 17:16:05
 */

import express from "express";
import ServiceBase from "./ServiceBase";
import secretParams from '../util/weather';
import { SeniverseV3 } from 'seniverse-api';

// 用户相关的服务
class WeatherService extends ServiceBase {
    // 天气入参校验
    get_weather_validate = this.paramNotEmpty(["city"]);
    get_weather = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { city } = req.query;
        try {
            const seniverseV3 = new SeniverseV3({ ... secretParams,
                query: {
                    unit: 'c', // 单位
                    location: city as string,
                    language: 'zh-Hans', // 结果返回语言
                    timeouts: [3000, 3000] // 重试次数和超时时间
                }
             })
            const weatherRes = await seniverseV3.request(
                '/weather/daily',
                { days: 1, start: 0,  }
              );
            this.success(res, {
                msg: '查询成功',
                data: weatherRes,
            });
        } catch (error) {
            this.error(res, `未查询到当前城市数据，请输入正确城市名`);
        }
 
    }

}

const userService = new WeatherService();
export default userService;