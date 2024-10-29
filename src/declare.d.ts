
// 声明模块
declare module "*.shp";
declare module "*.dbf";
declare module "get-browser-info";
declare module "dat.gui";

declare const _DEV_: boolean;

declare interface Window {
    Root: ReactDOM.Root,
    globalStore: any;
    homeRenderer: any;
    cannonRenderer: any;
}