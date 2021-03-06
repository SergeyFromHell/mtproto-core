const { getLocalStorage } = require('./local');
const { TempLocalStorage } = require('./temp');

class Storage {
  constructor(prefix, options = {}) {
    this._prefix = prefix;

    const { customLocalStorage = getLocalStorage() } = options;

    this.localStorage = customLocalStorage;

    this.cache = {};
  }

  setPrefix(prefix) {
    this._prefix = prefix;
  }

  pSet(name, value) {
    const key = `${this._prefix}${name}`;

    return this.set(key, value);
  }

  async pGetBytes(name) {
    const result = await this.pGet(name);

    return new Uint8Array(result);
  }

  pGet(name) {
    const key = `${this._prefix}${name}`;

    return this.get(key);
  }

  async set(key, value) {
    this.cache[key] = value;

    const result = await this.localStorage.setItem(key, JSON.stringify(value));

    return result;
  }

  async get(key) {
    if (key in this.cache) {
      return this.cache[key];
    }

    const fromLocalStorage = await this.localStorage.getItem(key);

    if (fromLocalStorage) {
      this.cache[key] = JSON.parse(fromLocalStorage);

      return this.cache[key];
    }

    return null;
  }

  static createDummy() {
    return new Storage('', {
      customLocalStorage: new TempLocalStorage(),
    });  
  }
}

module.exports = { Storage };
