/*
 * @Author: xiaosihan 
 * @Date: 2023-03-05 16:01:27 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2023-03-20 11:26:56
 */



import hashHistory from "@hashHistory";
import { useEffect, useRef, useState } from "react";
import FunctionGraph from "./component/FunctionGraph/FunctionGraph";
import styles from "./ui.module.less";

interface Iprops {

}

// ui 页面
export default function Ui(props: Iprops) {

    const dom = useRef<HTMLDivElement | null>(null);
    const [data, setData] = useState({});

    const goto = (path: string) => {
        hashHistory.push(path);
    }
    useEffect(() => {

    }, []);

    return (
        <div ref={dom} className={styles.ui}>
            <button onClick={() => goto("/")} >goto home</button>
            <div className={styles.fontTest}>12321311111111111111</div>
            <FunctionGraph
                fnArr={[
                    x => {
                        x = (x + 1) % 1;
                        return x;
                    },
                ]}
            />
        </div>
    );

}