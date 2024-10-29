import globalStore from "@globalStore";
import { Spin } from "antd";
import { autorun } from "mobx";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import styles from './index.module.less';

interface Iprops {
    children: ReactNode
}

export default function LoadingWapper(props: Iprops) {
    const [loading, setLoading] = useState(globalStore.loadding);

    useEffect(() => autorun(() => {
        setLoading(globalStore.loadding);
    }), []);

    return (
        <Fragment>
            {props.children} 
            {loading && (
                <div className={styles.overlay}>
                    <Spin spinning={loading} size="large" />
                </div>
            )}
        </Fragment>
    );

}