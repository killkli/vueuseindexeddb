interface CustomIDBVersionChangeEvent extends IDBVersionChangeEvent {
    target: IDBTargetEvent;
}

interface CustomIDBOpenEvent extends Event {
    target: IDBTargetEvent;
}

interface CustomIDBTransactionEvent extends Event {
    target: IDBTransactionTargetEvent;
}

interface IDBTransactionTargetEvent extends EventTarget {
    result: unknown;
}

interface IDBTargetEvent extends EventTarget{
    result: IDBResult;
}

type IDBResult = IDBDatabase;