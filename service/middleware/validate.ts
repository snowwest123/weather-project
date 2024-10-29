import { validationResult } from "express-validator";
import type { ValidationChain } from "express-validator";
import express from "express";


// parallel processing 并行处理
// 暴露一个函数，函数接收验证规则，返回一个函数
const validate = (validations: Array<ValidationChain>) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        next({
            message: errors.array()[0].msg,
            code: 500
        })

    };
};

export default validate;