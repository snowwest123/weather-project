/*
 * @Author: xiaosihan 
 * @Date: 2022-05-08 14:25:26 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2024-08-01 16:03:35
 */

import cors from "cors";
import dayjs from "dayjs";
import express from "express";
import morgan from 'morgan';
import errorHandler from './middleware/error-handler';
import router from './router';
import utils from "./utils";

const app = express();

// app.use(cookieParser());
app.use(morgan('dev')); // 打印请求日志
app.use(express.json({ limit: '1024mb' }));
app.use(express.urlencoded({ limit: '1024mb', extended: true }));
app.use(cors()); // 设置跨域

app.use(`/api`, router);

// 在所有的中间件之后挂载错误处理中间件
app.use(errorHandler())

// 通常会在所有的中间件之后配置处理404内容
// 请求进来从上到下依次匹配
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send('很抱歉，没有找到请求地址');
})

let env = "开发环境";
let port = 9001; // 端口
if (utils.isProd) {
    env = "正式环境";
    port = 9000;
}

app.listen(port, () => console.log(env, "服务启动", port, dayjs().format("YYYY-MM-DD HH:mm:ss")));