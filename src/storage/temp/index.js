class TempLocalStorage {
  constructor() {
    this.storage = new Map();
  }

  setItem(key, value) {
    return this.storage.set(String(key), value);
  }

  getItem(key) {
    return this.storage.get(String(key));
  }
}

const tempLocalStorage = new TempLocalStorage();

module.exports = {
  tempLocalStorage,
  TempLocalStorage,
};
