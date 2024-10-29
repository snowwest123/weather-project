import express from 'express';
import util from 'util';


export default function errorHandler() {
    return (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

        res.status(err.code ? err.code : 500).json(err)
    }
}