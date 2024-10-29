/*
 * @Author: xiaosihan 
 * @Date: 2024-07-22 16:40:29 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2024-07-22 17:18:22
 */

import { body } from "express-validator";
import validate from "./validate";

// 参数不能为空中间件
export default function paramNotEmpty(params: Array<string>) {
    return validate(
        params.map(p => {
            return body(p).notEmpty().withMessage(`${p}不能为空`)
        })
    );
}