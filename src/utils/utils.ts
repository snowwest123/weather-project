/*
 * @Author: xiaosihan
 * @Date: 2021-03-28 02:13:06
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2024-06-07 23:14:05
 */

import shortid from "shortid";
import { isEmpty, isEqual, pick } from "lodash";
import queryString from 'query-string';
import { EventDispatcher, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

// 全局公共方法
class Utils extends EventDispatcher {
    constructor() {
        super();
    }

    isProd = import.meta.env.MODE as string === "production";

    isDev = import.meta.env.MODE as string === "development";

    uuid() {
        // 生成一个短ID  
        const shortId = shortid();
        return shortId;
    }

    // 获取问号后参数
    getQueryString = (key: string) => {
        const parsedHash = queryString.parse(location.search);
        return parsedHash[key];
    }

    // 数字加千分位
    thousand(number: string | number, dot = 0) {
        let strNum = String(Number(Number(number).toFixed(dot))); // 转化成字符串
        while (strNum !== strNum.replace(/(\d)(\d{3})(\.|,|$)/, "$1,$2$3")) {
            strNum = strNum.replace(/(\d)(\d{3})(\.|,|$)/, "$1,$2$3");
        }
        return strNum;
    }

    // 数字转换单位 默认保留2位小数
    numToUnit(num: number, dot = 2) {
        let value = "";
        let unit = "";
        if (Math.abs(num) >= 1000000000000) {
            value = this.thousand(num / 1000000000000, dot);
            unit = "万亿";

        } else if (Math.abs(num) >= 100000000) {
            value = this.thousand(num / 100000000, dot)
            unit = "亿"
        } else if (Math.abs(num) >= 10000) {
            value = this.thousand(num / 10000, dot)
            unit = "万"
        } else {
            value = this.thousand(num, dot)
            unit = ""
        }
        return { value, unit, valueUnit: value + unit };
    }

    // 取随机数在某个范围里
    rand(start: number, end: number) {
        return Math.floor(Math.random() * (end - start + 1) + start);
    }

    // 获取是星期几
    getWeekDay() {
        const d = new Date().getDay();
        const arr = ["天", "一", "二", "三", "四", "五", "六"];
        return arr[d];
    }

    // 获取日期
    getDate(seperator: string = ".") {
        // 获取当前日期
        let date = new Date();

        // 获取当前月份
        let nowMonth = date.getMonth() + 1;

        // 获取当前是几号
        let strDate = date.getDate();


        // 对月份进行处理，1-9月在前面添加一个“0”
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth as any;
        }

        // 对月份进行处理，1-9号在前面添加一个“0”
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate as any;
        }

        // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
        let nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
        return nowDate;
    }

    // 获取时分秒
    getHourMinuteSecond(seperator: string = ":") {
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        // 在 numbers<10 的数字前加上 0
        m = m < 10 ? "0" + m : m as any;
        s = s < 10 ? "0" + s : s as any;
        return h + seperator + m + seperator + s;
    }

    /**
   * 多选文件
   */
    async selectFiles(accept = ".jpg,.jpeg,.png,.tga"): Promise<File[]> {
        return new Promise<File[]>((resolve, reject) => {
            const input = document.createElement("input");
            input.style.display = "none";
            input.type = "file";
            input.multiple = true;
            input.accept = accept;
            input.onchange = (e: any) => {
                const files = e.target.files as unknown as Promise<File[]>;
                resolve(files);
            }
            document.body.append(input);
            input.click();
            setTimeout(() => {
                input.remove();
            }, 100);
        });
    }

    /**
     * 单选文件
     */
    async selectFile(accept = ".jpg,.jpeg,.png,.tga"): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            const input = document.createElement("input");
            input.style.display = "none";
            input.type = "file";
            input.multiple = false;
            input.accept = accept;
            input.onchange = (e: any) => {
                const files = e.target.files as PromiseLike<File>;
                resolve((files as unknown as File[])[0]);
            }
            document.body.append(input);
            input.click();
            setTimeout(() => {
                input.remove();
            }, 100);
        });
    }

    /**
     * 多选文件转blob
     */
    async selectFileToBlobs(accept = ".jpg,.jpeg,.png,.tga"): Promise<string[]> {
        const files = await this.selectFiles(accept) as File[];
        return files.map(file => window.URL.createObjectURL(file));
    }

    /**
     * 单选文件转blob
     */
    async selectFileToBlob(accept = ".jpg,.jpeg,.png,.tga"): Promise<string> {
        const files = await this.selectFile(accept) as File;
        return window.URL.createObjectURL(files);
    }

    /**
     * 比对指定字段是否相同
     */
    isEqualWidth(obj1: {}, obj2: {}, picks: Array<string> = []) {
        if (isEmpty(picks)) {
            return isEqual(obj1, obj2);
        }
        return isEqual(pick(obj1, picks), pick(obj2, picks));
    }

    // 编辑材质
    editorMaterial(material: MeshBasicMaterial | MeshLambertMaterial | MeshPhongMaterial | MeshPhysicalMaterial | MeshStandardMaterial) {

        const config: { [key: string]: any } = {}

        const controlPanel = new GUI({ width: 400 });

        controlPanel.title("材质编辑器");
        controlPanel.show(true);

        //颜色修改
        controlPanel.addColor((material as MeshStandardMaterial), 'color').name('材质颜色').onChange((color) => {
            config["color"] = `#${color.getHexString()}`;
        });

        //金属性
        if (material.hasOwnProperty("metalness")) {
            controlPanel.add((material as MeshStandardMaterial), "metalness", 0, 1, 0.01).name('金属性').onChange((metalness) => {
                config["metalness"] = metalness;
            });
        }
        //粗糙度
        if (material.hasOwnProperty("roughness")) {
            controlPanel.add((material as MeshStandardMaterial), "roughness", 0, 1, 0.01).name('粗糙度').onChange((roughness) => {
                config["roughness"] = roughness;
            });
        }

        function stringifyWithoutQuotes(obj: any) {
            let result = '';
            function stringifyValue(value: any) {
                if (typeof value === 'string') {
                    return `"${value}"`; // 字符串值需要引号  
                } else if (typeof value === 'object' && value !== null) {
                    // 如果值是对象或数组，递归处理（这里简单返回字符串表示）  
                    return '...'; // 或者您可以递归调用 stringifyWithoutQuotesOnKeys(value) 并处理嵌套  
                } else {
                    // 对于其他类型（如数字、布尔值、null），直接返回其字符串表示  
                    return String(value);
                }
            }

            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result += `${key}: ${stringifyValue(obj[key])}, `;
                }
            }
            // 移除末尾的逗号和空格  
            return result.trim().slice(0, -1);
        }

        controlPanel.add({
            click: () => {
                navigator.clipboard.writeText(stringifyWithoutQuotes(config));
                controlPanel.destroy();
            }
        }, 'click').name('确定,并复制配置到剪贴板');

    }

}

const utils = new Utils();

export default utils;