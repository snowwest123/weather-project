import jwt from "jsonwebtoken";
import { promisify } from "util";

// 解析
export const sign = promisify(jwt.sign) as any;

// 验证
export const verify = promisify(jwt.verify) as any;

// 不验证直接解析
// exports.decode = jwt.decode();
export const decode = promisify(jwt.decode) as any

