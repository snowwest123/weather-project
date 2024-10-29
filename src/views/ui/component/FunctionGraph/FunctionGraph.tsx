/*
 * @Author: xiaosihan 
 * @Date: 2023-03-20 11:17:01 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2023-03-20 11:25:18
 */


import { useEffect, useRef, useState } from "react";
import styles from "./functionGraph.module.less";
import ReactEcharts from 'echarts-for-react';
import { getOptions } from "./instants";

export type Iprops = (x: number) => number;


export interface IpropsArr {
    fnArr: Iprops[]
}

// TODO 函数图像
export default function FunctionGraph(props: IpropsArr) {

    const canvas = useRef<HTMLCanvasElement | null>(null);
    const [data, setData] = useState({});
    const chart = useRef<any>({});
    const [option, setOption] = useState<any>(null);

    useEffect(() => {
        setOption(getOptions(props))
    }, [props.fnArr]);

    // useEffect(() => {
    //     if (canvas.current) {
    //         const ctx = canvas.current.getContext("2d");
    //         if (ctx) {
    //             ctx.clearRect(0, 0, 200, 400);
    //             ctx.beginPath();
    //             for (let i = 0; i < 1; i += 0.01) {
    //                 if (i == 0) {
    //                     ctx.moveTo(i * 200, props.function(1 - i) * 200 + 200);
    //                 } else {
    //                     ctx.lineTo(i * 200, props.function(1 - i) * 200 + 200);
    //                 }
    //             }
    //             ctx.strokeStyle = "#ff0000";
    //             ctx.stroke();
    //         }
    //     }
    // }, [props.function]);

    return (
        <div className={styles.functionGraph}>
            {option ? <ReactEcharts option={option}
                style={{
                    height: '100%',
                    width: '100%'
                }}
                ref={chart} /> : ''}
        </div>
    );

}