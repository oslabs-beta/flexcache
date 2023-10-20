// const Supacache = require('../index.js')

/**
 * get - Get a cached key and change the stats. Takes either a key or an array of keys
 * @param {array | string | number} keys
 * @returns {object | any}: value from cache
 */

function get(keys) {


  // _boundMethodCheck(this, Supacache)

  let isArray = true;

  // If keys is not an array, convert to array with one key
  if (!Array.isArray(keys)) {
    isArray = false;
    keys = [keys];
  }

  // Define the return object
  const objectReturn = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    //Check if key is valid
    let err;
    if ((err = this._isInvalidKey(key)) != null) {
      throw err;
    }

    // Get data and increment stats
    if (this.data[key] && this._check(key, this.data[key])) {
      this.stats.hits++;
      objectReturn[key] = this._unwrap(this.data[key]);
    } else {
      // If not found, return undefined
      this.stats.misses++;
      objectReturn[key] = undefined
    }
  }

  // If a single key was provided, return the value directly; otherwise, return an object
  return isArray ? objectReturn : objectReturn[keys[0]]
}

/**
 * set - cache a key and change the stats. Takes either a key, value, and optional ttl, or an array of objects with key, value, and ttl inputs
 * @param {string | number} key: key to cache
 * @param {any} value: element to cache
 * @param {number} [ttl] - (optional) - value for time to live for cache instances in ttl mode
 */

function set(key, value, ttl) {

  // _boundMethodCheck(this, Supacache)

  // handle full cache for ttl mode
  if (this.stats.keys >= this.options.maxKeys && this.options.evictionPolicy === 'ttl') {
    const _err = this._error("ECACHEFULL");
    throw _err;
  }

  // handle full cache for lru mode
  if (this.stats.keys >= this.options.maxKeys && this.options.evictionPolicy === 'lru') {
    _checkIfLRUFull()
  }

  // force data to string
  if (this.options.forceString && !typeof value === "string") {
    value = JSON.stringify(value);
  }

  // set default ttl if not passed
  if (!ttl) {
    ttl = this.options.stdTTL;
  }

  //Check if key is valid
  let err;
  if ((err = this._isInvalidKey(key)) != null) {
    throw err;
  }

  // internal helper variable
  let existent = false;

  // remove existing data from stats
  if (this.data[key]) {
    existent = true;
    this.stats.vsize -= this._getValLength(this._unwrap(this.data[key]));
  }
  // set the value (ttl will be ignored if in lru mode)
  this.data[key] = this._wrap(value, ttl);
  this.stats.vsize += this._getValLength(value);

  // only add the keys and key-size if the key is new
  if (!existent) {
    this.stats.ksize += this._getKeyLength(key);
    this.stats.keys++;
  }
  this.emit("set", key, value);
  // return true
  return true;
}

/**
 * del - delete keys and change the stats. Takes either a single key or an array of keys
 * @param {array | string | number} keys: key or keys to delete
 * @returns {number}: the number of keys deleted
 */


function del(keys) {

  // _boundMethodCheck(this, Supacache)

  // make input an array if single key was passed in
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  let delCount = 0;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // check for invalid keys
    let err;
    if ((err = this._isInvalidKey(key)) != null) {
      throw err;
    }
    // only delete if existent
    if (this.data[key]) {
      // calc the stats
      this.stats.vsize -= this._getValLength(this._unwrap(this.data[key]));
      this.stats.ksize -= this._getKeyLength(key);
      this.stats.keys--;
      delCount++;
      // delete the value
      const oldVal = this.data[key];
      delete this.data[key];
      // return true
      this.emit("del", key, oldVal.v);
    }
  }
  return delCount;
}

/**
 * take - delete keys from the cache and return them (equivalent to get(key) + del(key). Takes either a single key or an array of keys
 * @param {array | string | number} keys: key or keys to take
 * @returns {object | any}: value from cache
 */


function take(key) {
  //  _boundMethodCheck(this, Supacache)
  const _ret = this.get(key);
  if ((_ret)) {
    this.del(key);
  }
  return _ret;
}

/**
 * ttl - resets the ttl of a key. Takes a single key and an optional ttl parameter
 * @param {string | number} key: key on which the ttl will be reset
 * @param {number} ttl: (optional) updated ttl value - uses default ttl if none provided
 * @returns {boolean}: boolean confirming whether ttl was updated
 */

function ttl(key, ttl) {

  // _boundMethodCheck(this, Supacache)
  ttl || (ttl = this.options.stdTTL);
  if (!key) {
    return false;
  }
  // check for invalid key types
  let err;
  if ((err = this._isInvalidKey(key)) != null) {
    throw err;
  }
  // check whether data exists and update the ttl value
  if (this.data[key] && this._check(key, this.data[key])) {
    // if ttl < 0 delete the key. otherwise reset the value
    if (ttl >= 0) {
      this.data[key] = this._wrap(this.data[key].v, ttl);
    } else {
      this.del(key);
    }
    return true;
  } else {
    // return false if key not found
    return false;
  }
}

/**
 * getTtl - read the ttl of a cached key.
 * @param {string | number} key: key whose ttl will be returned
 * @returns {number}: ttl of passed in key
 */

function getTtl(key) {

  // _boundMethodCheck(this, Supacache)

  //return undefined if cache is in lru mode

  if (this.options.evictionPolicy === 'lru') {
    return undefined
  }

  if (!key) {
    return undefined;
  }
  // handle invalid key types
  let err
  if ((err = this._isInvalidKey(key)) != null) {
    throw err;
  }
  // check for existant data and update the ttl value
  if ((this.data[key] != null) && this._check(key, this.data[key])) {
    const _ttl = this.data[key].t;
    return _ttl;
  } else {
    // return undefined if key has not been found
    return undefined;
  }
}

/**
 * keys - returns all keys in cache
 * @returns {array}: all cached keys
 */

function keys() {
  // _boundMethodCheck(this, Supacache);
  let _keys = Object.keys(this.data);
  return _keys;
}

/**
 * has - checks whether key exists in cache
 * @param {number | string}: key whose existence will be checked
 * @returns {boolean}: boolean representing whether passed in key exists
 */

function has(key) {

  // _boundMethodCheck(this, Supacache);
  const _exists = (this.data[key] != null) && this._check(key, this.data[key]);
  return _exists;
}

/**
 * getStats - returns stats container of cache instance
 * @returns {object}: stats container
 */

function getStats() {

  // _boundMethodCheck(this, Supacache);
  return this.stats;
}

/**
 * flushAll - flush all data and reset stats container
 */

function flushAll() {

  // _boundMethodCheck(this, Supacache);

  // set data empty
  this.data = {};
  // reset stats
  this.stats = {
    hits: 0,
    misses: 0,
    keys: 0,
    ksize: 0,
    vsize: 0
  };
  // reset check period
  this._killCheckPeriod();
  this._checkData(true);
  this.emit("flush");
}

/**
 * flushStats - reset stats container
 */

function flushStats() {

  // _boundMethodCheck(this, Supacache)

  // reset stats
  this.stats = {
    hits: 0,
    misses: 0,
    keys: 0,
    ksize: 0,
    vsize: 0
  }

  this.emit("flush_stats");
}

/**
 * close - clear timeout interval set on checkperiod option
 */

function close() {
  // _boundMethodCheck(this, Supacache)
  this._killCheckPeriod();
}

module.exports = { get, set, take, del, ttl, getTtl, getStats, flushStats, flushAll, has, keys, close }
