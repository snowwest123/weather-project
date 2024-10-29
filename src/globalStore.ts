/*
 * @Author: xiaosihan 
 * @Date: 2021-03-28 02:25:11 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2022-07-15 15:12:35
 */

import elementResizeEvent from "element-resize-event";
import getBrowserInfo from "get-browser-info";
import { observable } from "mobx";

// 浏览器 列表
//browser: ["Safari", "Chrome", "Edge", "IE", "Firefox", "Firefox Focus", "Chromium", "Opera", "Vivaldi", "Yandex", "Arora", "Lunascape", "QupZilla", "Coc Coc", "Kindle", "Iceweasel", "Konqueror", "Iceape", "SeaMonkey", "Epiphany", "360", "360SE", "360EE", "UC", "QQBrowser", "QQ", "Baidu", "Maxthon", "Sogou", "LBBROWSER", "2345Explorer", "TheWorld", "XiaoMi", "Quark", "Qiyu", "Wechat", "Taobao", "Alipay", "Weibo", "Douban", "Suning", "iQiYi"],
// browserInfo = {
// browser: "Chrome"
// browserVersion: "83.0.4103.61"
// device: "PC"
// engine: "Blink"
// language: "zh_CN"
// os: "Windows"
// osVersion: "10.0"
// }

// 全局状态
const globalStore = observable({
    browserInfo: getBrowserInfo(), //浏览器信息
    isIE: getBrowserInfo().browser === "IE",
    isFirefox: getBrowserInfo().browser === "Firefox",
    loadding: false,
    setLoadding(b: boolean) {
        this.loadding = b;
    },
    width: 1920,
    height: 1080,
    widthScale: 1,
    heightScale: 1,
    setSize(width: number, height: number) {
        this.width = width;
        this.widthScale = width / 1920;
        this.height = height;
        this.heightScale = height / 1080;
    }
});

// 在pc上为body设置zoom比例 适应屏幕变窄
const resize = () => {
    globalStore.setSize(window.innerWidth, window.innerHeight);
};
resize();

elementResizeEvent(document.documentElement, resize);

export default globalStore;