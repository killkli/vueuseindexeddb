import { DeepReadonly } from "vue";

export declare function useIndexedDB(name: string, version: number): {
    currentDB: DeepReadonly,
    currentDBName: DeepReadonly,
    currentDBVersion: DeepReadonly,
    getData :function,
    getAllData :function,
    addData :function,
    updateData:function,
    removeData:function
};

export * from "./comon.d.ts";
