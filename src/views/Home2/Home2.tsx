/*
 * @Author: xiaosihan 
 * @Date: 2022-07-11 07:51:56 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2024-06-07 01:27:03
 */

import hashHistory from "@hashHistory";
import { Button } from "antd";
import { autorun } from "mobx";
import { useEffect } from "react";
import home2Store from "./home2Store";

const Home2 = () => {

    const goto = (path: string) => {
        hashHistory.push(path);
    }

    useEffect(() => autorun(() => {
        const { value } = home2Store;
        console.log(value);
    }), []);

    return <div>
        <p>home2</p>
        <Button onClick={() => home2Store.setValue("2")} >设置store</Button>
        <button onClick={() => goto("/")} >goto home</button>

    </div>
}

export default Home2;