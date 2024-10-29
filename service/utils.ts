/*
 * @Author: xiaosihan 
 * @Date: 2024-08-01 15:32:26 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2024-08-02 19:40:25
 */
import shortid from "shortid";

class Utils {

    constructor() { }

    isDev = (process.env.NODE_ENV?.trim() === "development");
    isProd = (process.env.NODE_ENV === undefined);

    uuid() {
        // 生成一个短ID  
        const shortId = shortid();
        return shortId;
    }

    // 获取文件名的后缀
    getSuffix(filename: string) {
        const match = filename.match(/\.([^\.]+)$/);
        return match ? match[1].toLowerCase() : '';
    }

}
const utils = new Utils();
export default utils;