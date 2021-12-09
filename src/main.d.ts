import { DeepReadonly } from "vue";

export declare function useIndexedDB(name: string, version: number): {
    currentDB: DeepReadonly,
    currentDBName: DeepReadonly,
    currentDBVersion: DeepReadonly,
    getData: (name: IDBValidKey) => Promise<unknown>,
    getAllData: () => Promise<unknown[]>,
    addData: <T>(name: IDBValidKey, data: T) => Promise<void>,
    updateData: <T>(name: IDBValidKey, data: T) => Promise<void>,
    removeData: (name: IDBValidKey) => Promise<unknown>,
};

export * from "./comon.d.ts";
