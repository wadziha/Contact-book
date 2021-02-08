import { openDb } from 'idb'

const dbPromise = () => {
  if (!('indexedDB' in window)) {
    throw new Error('Browser does not support IndexedDB')
  }

  return openDb('OfflineContacts', 1, (upgradeDb) => {
    if (!upgradeDb.objectStoreNames.contains('contacts')) {
      const store = upgradeDb.createObjectStore('contacts')
      store.createIndex('name', 'name')
      store.createIndex('surname', 'name')
    }
  })
}

const loadStorage = async (storeName) => {
  try {
    const db = await dbPromise()
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)

    return store.get(storeName)
  } catch (error) {
    return error
  }
}

/*
const loadStorage = async (storeName) => {
  try {
    const db = await dbPromise()
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)

    return store.index('name').get('asdasd')
  } catch (error) {
    return error
  }
}
*/

const saveToStorage = async (storeName, tasks) => {
  try {
    const db = await dbPromise()
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)

    store.put(tasks, storeName)

    return tx.complete
  } catch (error) {
    return error
  }
}

export default {
  loadStorage,
  saveToStorage,
}
