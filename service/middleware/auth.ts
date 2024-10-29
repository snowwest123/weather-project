import { jwtSecret } from "./config.default";
import express from "express";
// const { verify } = require("../util/jwt");
import { verify } from '../util/jwt';

export const authValidate = async (req: any, res: express.Response, next: express.NextFunction) => {
    // 从请求头获取token数据
    let token: any = req.headers.authorization;
    // 验证token是否存在
    token = token ? token.split("Token ")[1] : null;
    // 如果不存在， 发送响应 401 结束响应
    if (!token) {
        return res.status(401).send({
            code: 401,
            message: '没有访问权限,请登录'
        });
    }
    try {
        // 验证token是否有效
        const decodedToken = await verify(token, jwtSecret);
        // console.log('decodedToken:',decodedToken);
        // 将用户信息挂载到请求对象上
        // req.user = await checkUserById(decodedToken.userId);
        next();
    } catch (err) {
        return res.status(401).send({
            code: 401,

            message: '没有访问权限,请登录'
        });
    }
    // 如果有效，将用户信息读取，挂载到req请求对象上，继续往后执行
};