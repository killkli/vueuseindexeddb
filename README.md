# vueuseindexeddb
An indexedDB wrapper for Vue3 Composition API

Current version: 0.1.2

Must use with Vue3, as an composition API.

usage:

```javascript
import {useIndexedDB} from "vueuseindexeddb";

const {currentDB: DeepReadonly,
    currentDBName: DeepReadonly,
    currentDBVersion: DeepReadonly,
    getData :function,
    getAllData :function,
    addData :function,
    updateData:function,
    removeData:function} = useIndexedDB();
```

All function returns a Promise, and could be used witha async/await syntax.
DBVersion and DBName can be set as the parameter of useIndexedDB(), as follows:


```javascript
const {currentDBName,currentDBVersion} = useIndexedDB("TestDBNAME",2);

console.log(currentDBName,currentDBVersion);
```

Much to add yet, but it's usable now as it is :)

Enjoy~
