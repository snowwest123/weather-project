/*
 * @Author: xiaosihan 
 * @Date: 2024-06-07 00:39:56 
 * @Last Modified by: xiaosihan
 * @Last Modified time: 2024-06-07 01:26:11
 */


// homeStore.tx
import { observable, configure } from "mobx";
configure({ enforceActions: "never" });

const home2Store = observable({

    value: ["1"],
    setValue(v: string) {
        this.value = [v];
    }

}, {}, { deep: false });

export default home2Store;