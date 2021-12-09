/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, readonly } from "vue";



const indexedDB: IDBFactory = window.indexedDB;
const dataBase = ref<IDBDatabase | null>(null);
const dbName = ref<string>("vueUseIndexedDB");
const dbVersion = ref<number>(1);
const storeName = "vueUseStore";

const createObjectStore = function (db: IDBDatabase) {
    db.createObjectStore(storeName);
};

const openIndexDB = () => {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(dbName.value, dbVersion.value);
        req.onerror = reject;
        req.onupgradeneeded = (e: IDBVersionChangeEvent) => {
            const event = e as CustomIDBVersionChangeEvent;
            createObjectStore(event.target.result);
        };
        // return db instance on succcess
        req.onsuccess = (e: Event) => {
            const event = e as CustomIDBOpenEvent;
            dataBase.value = event.target.result;
            resolve(true);
        };
    });
}

const getDataL = (name: string) => {
    return new Promise((resolve, reject) => {
        if (dataBase.value === null) {
            reject(new Error("IndexedDB is not initialized"));
            return;
        }
        const transaction = dataBase.value.transaction(storeName, "readonly");
        const get = transaction.objectStore(storeName).get(name);
        get.onsuccess = (e: Event) => {
            const event = e as CustomIDBTransactionEvent;
            resolve(event.target.result)
        };
        get.onerror = reject;
    });
}

const getAllDataL = () => {
    const results = new Map<IDBValidKey, any>();
    return new Promise((resolve, reject) => {
        if (dataBase.value === null) {
            reject(new Error("IndexedDB is not initialized"));
            return;
        }
        const transaction = dataBase.value.transaction(storeName, "readonly");
        const get = transaction.objectStore(storeName).openCursor();
        get.onsuccess = () => {
            const cursor = get.result;
            if (cursor) {
                results.set(cursor.key, cursor.value);
                cursor.continue();
            }
            else {
                resolve(results);
            }
        };
        get.onerror = reject;
    });
}

const addDataL = (name: string, data: any) => {
    return new Promise((resolve, reject) => {
        if (dataBase.value === null) {
            reject(new Error("IndexedDB is not initialized"));
            return;
        }
        const transaction = dataBase.value.transaction(storeName, "readwrite");
        const add = transaction.objectStore(storeName).add(data, name);
        add.onsuccess = resolve;
        add.onerror = reject;
    });
}

const updateDataL = (name: string, data: any) => {
    return new Promise((resolve, reject) => {
        if (dataBase.value === null) {
            reject(new Error("IndexedDB is not initialized"));
            return;
        }
        const transaction = dataBase.value.transaction(storeName, "readwrite");
        const update = transaction.objectStore(storeName).put(data, name);
        update.onsuccess = resolve;
        update.onerror = reject;
    });
}

const removeDataL = (name: string) => {
    return new Promise((resolve, reject) => {
        if (dataBase.value === null) {
            reject(new Error("IndexedDB is not initialized"));
            return;
        }
        const transaction = dataBase.value.transaction(storeName, "readwrite");
        const remove = transaction.objectStore(storeName).delete(name);
        remove.onsuccess = resolve;
        remove.onerror = reject;
    });
}

export function useIndexedDB(name = "vueUseIndexedDB", version = 1) {
    dbName.value = name;
    dbVersion.value = version;
    openIndexDB();
    const currentDB = readonly(dataBase);
    const currentDBName = readonly(dbName);
    const currentDBVersion = readonly(dbVersion);
    const getData = async (name: string) => {
        return await getDataL(name);
    }
    const addData = async (name: string, data: any) => {
        return await addDataL(name, data);
    }
    const updateData = async (name: string, data: any) => {
        return await updateDataL(name, data);
    }
    const removeData = async (name: string) => {
        return await removeDataL(name);
    }
    const getAllData = async () => {
        return await getAllDataL();
    }
    return {
        currentDB,
        currentDBName,
        currentDBVersion,
        getData,
        getAllData,
        addData,
        updateData,
        removeData
    };
}
