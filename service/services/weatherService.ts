/*
 * @Author: xiaosihan 
 * @Date: 2024-07-29 12:22:45 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2024-08-02 17:16:05
 */

import express from "express";
import ServiceBase from "./ServiceBase";

// 用户相关的服务
class WeatherService extends ServiceBase {

     //小程序绑定手机号并登录校验
    get_weather_validate = this.paramNotEmpty(["phone"]);
    get_weather = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { city } = req.body;
        // const [user, created] = await database.user.findOrCreate({ where: { phone }, defaults: { phone } });
        this.success(res, {
            msg: '查询成功',
            data: {},
        });
    }

}

const userService = new WeatherService();
export default userService;