/*
* @Author: xiaosihan
* @Date: 2024-07-11 10:22:49
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2024-08-01 15:38:26
*/
import express from "express";
import { ValidationChain, body, validationResult } from "express-validator";
import fs from "fs";
import { get, isEmpty } from "lodash";
import mysql from "mysql2";
import path from "path";
import utils from "../utils";


// 服务基类
export default class ServiceBase {

    constructor() {

    }
    // 创建一个mysql连接池
    static pool = mysql.createPool({
        port: 3306,
        host: utils.isProd ? "localhost" : '',
        database: utils.isProd ? 'test-database' : 'test-database',
        user: utils.isProd ? '' : '',
        password: utils.isProd ? '' : '',
    });
    
    //创建一个判空的中间件
    //创建一个判空的中间件
    paramNotEmpty(params: Array<string>) {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const emptyParam = [];
            for (let p of params) {
                if (isEmpty(req.query[p]) && isEmpty(req.body[p])) {
                    // 记录空参数
                    emptyParam.push(p);
                }
            }
            if (isEmpty(emptyParam)) {
                next();
            } else {
                this.error(res, `${emptyParam.join(',')}不能为空`);
            }
        };
    }

    // 返回成功的状态
    success(res: express.Response, data: any = undefined, message = "成功") {
        res.send({
            status: "success",
            code: 200,
            message,
            data
        });
    }

    //返回失败的状态
    error(res: express.Response, message = "失败") {
        res.send({
            status: "error",
            code: 401,
            message
        });
    }

    // 查询
    query(sqlString: string): any {
        // return sql.query(sqlString, values);
    }
}