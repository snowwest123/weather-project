/*
 * @Author: xiaosihan
 * @Date: 2024-08-01 15:30:19
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2024-08-02 20:07:32
 */

import { Sequelize, DataTypes } from 'sequelize';
import utils from "./utils";
// 数据库对象
class Database {

    constructor() {
    }

    // 创建一个数据操作对象
    // 中文文档 https://github.com/demopark/sequelize-docs-Zh-CN/tree/v6
    sequelize = new Sequelize(
        utils.isProd ? 'optimizemodel' : 't-optimizemodel',
        utils.isProd ? 'optimizeModel' : 't-optimizeModel',
        utils.isProd ? 'ipFC8YfdS5K4Etry' : 'NepyywaAKWKdEwf5',
        {
            // 主机地址  
            // host: utils.isProd ? "localhost" : '47.108.147.37',
            host: utils.isProd ? "47.108.147.37" : '47.108.147.37',
            dialect: 'mysql',
            port: 3306,
        });

    //创建一个用户表对象
    user = this.sequelize.define('user', {
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            unique: true,
            autoIncrement: true, // 如果你的数据库支持自动增长
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        wx_openid: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        code: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            unique: false
        },
    }, {
        tableName: "user",
        timestamps: false
    });

}

const database = new Database();

export default database;