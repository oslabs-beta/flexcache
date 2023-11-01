(function () {

	const eventEmitter = require('events').EventEmitter

	const fs = require('fs')

	module.exports = class Supacache extends eventEmitter {
		constructor(options = {}) {
			super()

			// default options
			this.options = {
				forceString: false,
				stdTTL: Infinity,
				checkPeriod: 0,
				deleteOnExpire: true,
				maxKeys: Infinity,
				persistCache: false,
				persistPeriod: 5,
				URIKey: ''
			}

			// overwrite default options with user inputs
			const { forceString, stdTTL, checkPeriod, deleteOnExpire, maxKeys, persistCache, persistPeriod, URIKey, evictionPolicy } = options
			const writableProps = { forceString, stdTTL, checkPeriod, deleteOnExpire, maxKeys, persistCache, persistPeriod, URIKey }
			for (const key in writableProps) {
				if (writableProps[key]) {
					if (typeof writableProps[key] !== typeof this.options[key]) {
						const _err = this.#error("EOPTIONINPUTS")
						throw _err
					}
					this.options[key] = writableProps[key]
				}
			}

			// assign eviction policy as read only property, use ttl as default policy
			if (evictionPolicy) {
				if (!this.#evictionPolicies.includes(evictionPolicy)) {
					const _err = this.#error("EEVICPOLICY")
					throw _err
				}
				else {
					Object.defineProperty(this.options, "evictionPolicy", {
						value: evictionPolicy,
						writable: false,
						enumerable: true
					})
				}
			}
			else {
				Object.defineProperty(this.options, "evictionPolicy", {
					value: 'ttl',
					writable: false,
					enumerable: true
				})
			}

			// intitialize Mongo connection if persistance option selected

			if (this.options.persistCache) {

				// const mongoose = require('mongoose')
				const MONGO_URI = this.options.URIKey
				mongoose.connect(MONGO_URI, {
					useNewUrlParser: true,
					useUnifiedTopology: true,
					dbName: 'cache_snapshots'
				})
					.catch(err => console.log('Error connecting to database.', err));

				const Schema = mongoose.Schema
				const snapshotSchema = new Schema({ Snapshot: Object })
				const Snapshot = mongoose.model('snapshot', snapshotSchema)
				this.#snapshotModel = Snapshot
			}

			// data and metadata containers

			this.data = {};

			this.stats = {
				hits: 0,
				misses: 0,
				keys: 0,
				ksize: 0,
				vsize: 0
			}

			// bind public methods

			this.get = this.get.bind(this)
			this.set = this.set.bind(this)
			this.del = this.del.bind(this)
			this.take = this.take.bind(this)
			this.ttl = this.ttl.bind(this)
			this.getTtl = this.getTtl.bind(this)
			this.keys = this.keys.bind(this)
			this.has = this.has.bind(this)
			this.getStats = this.getStats.bind(this)
			this.flushAll = this.flushAll.bind(this)
			this.flushStats = this.flushStats.bind(this)
			this.close = this.close.bind(this)

			//start checking period
			this.#checkData()


			return
		}

		/**
		 * Public Methods
		 */


		/**
		 * get - Get a cached key and change the stats. Takes either a key or an array of keys
		 * @param {array | string | number} key
		 * @returns {any | array}: value from cache or array of key/value pairs
		 */

		get(key) {

			this.#boundMethodCheck(this, Supacache)


			// If keys is an array, call and return mget
			if (Array.isArray(key)) {
				return this.#mget(key)
			}

			//Check if key is valid
			let err;
			if (err = this.#isInvalidKey(key)) {
				throw err;
			}

			let ret;
			// Get data and modify stats
			if (this.data[key] && this.#check(key, this.data[key])) {
				this.stats.hits++;
				ret = this.#unwrap(this.data[key]);
			} else {
				// If not found, return undefined
				this.stats.misses++;
				ret = undefined;
			}
			return ret
		}


		/**
		 * set - cache a key and change the stats. Takes either a key, value, and optional ttl, or an array of objects with key, value, and ttl properties for each input
		 * @param {string | number} keyORKeyValueSet: key to cache or array of key value pairs
		 * @param {any} value: - (optional) -  element to cache
		 * @param {number} ttl - (optional) - value for time to live for cache instances in ttl mode
		 */

		set(keyORKeyValueSet, value, ttl) {

			this.#boundMethodCheck(this, Supacache)


			// call mset if array is passed in
			if (Array.isArray(keyORKeyValueSet)) {
				return this.#mset(keyORKeyValueSet)
			}

			// handle full cache for ttl mode
			if (this.stats.keys >= this.options.maxKeys && this.options.evictionPolicy === 'ttl') {
				const _err = this.#error("ECACHEFULL");
				throw _err;
			}

			// handle full cache for lru mode
			if (this.stats.keys >= this.options.maxKeys && this.options.evictionPolicy === 'lru') {
				this.#checkIfLRUFull()
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
			if (err = this.#isInvalidKey(keyORKeyValueSet)) {
				throw err;
			}

			// internal helper variable
			let existent = false;

			// remove existing data from stats
			if (this.data[keyORKeyValueSet]) {
				existent = true;
				this.stats.vsize -= this.#getValLength(this.#unwrap(this.data[keyORKeyValueSet]));
			}
			// set the value (ttl will be ignored if in lru mode)
			this.data[keyORKeyValueSet] = this.#wrap(value, ttl);
			this.stats.vsize += this.#getValLength(value);

			// only add the keys and key-size if the key is new
			if (!existent) {
				this.stats.ksize += this.#getKeyLength(keyORKeyValueSet);
				this.stats.keys++;
			}
			this.emit("set", keyORKeyValueSet, value);


			// return true
			return true;


		}

		/**
		 * del - delete keys and change the stats. Takes either a single key or an array of keys
		 * @param {array | string | number} keys: key or keys to delete
		 * @returns {number}: the number of keys deleted
		 */


		del(keys) {

			this.#boundMethodCheck(this, Supacache)

			// make input an array if single key was passed in
			if (!Array.isArray(keys)) {
				keys = [keys];
			}

			// validate all passed in keys before deleting
			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				// check for invalid keys
				let err;
				if (err = this.#isInvalidKey(key)) {
					throw err;
				}
			}

			// delete existant keys
			let delCount = 0;

			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				if (this.data[key]) {
					// adjust stats
					this.stats.vsize -= this.#getValLength(this.#unwrap(this.data[key]));
					this.stats.ksize -= this.#getKeyLength(key);
					this.stats.keys--;
					delCount++;
					// delete the value
					const oldVal = this.data[key];
					delete this.data[key];
					// return true
					this.emit("del", key, oldVal.value);
				}

			}

			return delCount;
		}

		/**
		 * take - delete keys from the cache and return them (equivalent to get(key) + del(key). Takes either a single key or an array of keys
		 * @param {array | string | number} keys: key or keys to take
		 * @returns {object | any}: value from cache
		 */

		take(key) {
			this.#boundMethodCheck(this, Supacache)
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

		ttl(key, ttl) {

			this.#boundMethodCheck(this, Supacache)
			ttl || (ttl = this.options.stdTTL);
			if (!key) {
				return false;
			}
			// check for invalid key types
			let err;
			if (err = this.#isInvalidKey(key)) {
				throw err;
			}
			// check whether data exists and update the ttl value
			if (this.data[key] && this.#check(key, this.data[key])) {
				// if ttl < 0 delete the key. otherwise reset the value
				if (ttl >= 0) {
					this.data[key] = this.#wrap(this.data[key].v, ttl);
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

		getTtl(key) {

			this.#boundMethodCheck(this, Supacache)

			//return undefined if cache is in lru mode

			if (this.options.evictionPolicy === 'lru') {
				return undefined
			}

			if (!key) {
				return undefined;
			}
			// handle invalid key types
			let err
			if (err = this.#isInvalidKey(key)) {
				throw err;
			}
			// check for existant data and update the ttl value
			if (this.data[key] && this.#check(key, this.data[key])) {
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

		keys() {
			this.#boundMethodCheck(this, Supacache);
			let _keys = Object.keys(this.data);
			return _keys;
		}

		/**
		 * has - checks whether key exists in cache
		 * @param {number | string}: key whose existence will be checked
		 * @returns {boolean}: boolean representing whether passed in key exists
		 */

		has(key) {

			this.#boundMethodCheck(this, Supacache);
			const _exists = this.data[key] && this.#check(key, this.data[key]);
			return _exists;
		}

		/**
		 * getStats - returns stats container of cache instance
		 * @returns {object}: stats container
		 */

		getStats() {

			this.#boundMethodCheck(this, Supacache);
			return this.stats;
		}

		/**
		 * flushAll - flush all data and reset stats container
		 */

		flushAll() {

			this.#boundMethodCheck(this, Supacache);

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
			this.#killCheckPeriod();
			this.#checkData();
			this.emit("flush");
		}

		/**
		 * flushStats - reset stats container
		 */

		flushStats() {

			this.#boundMethodCheck(this, Supacache)

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

		close() {
			this.#boundMethodCheck(this, Supacache)
			this.#killCheckPeriod();
		}

		/**
		 * Helper Function Methods
		 */


		/**
		 * mget - helper function to handle multiple inputs to get method
		 * @param {array} keys: an array of keys to return
		 * @returns {object}: object with found key/value pairs. Keys not found have value of undefined
		 */

		#mget(keys) {


			if (!Array.isArray(keys)) {
				let err = this.#error("EKEYSTYPE")
				throw err
			}

			let returnObj = {};

			for (let i = 0; i < keys.length; i++) {
				let key = keys[i]
				let _err
				if (_err = this.#isInvalidKey(key)) {
					throw err
				}
				if (this.data[key] && this.#check(key, this.data[key])) {
					this.stats.hits++
					returnObj[key] = this.#unwrap(this.data[key])
				} else {
					this.stats.misses++
				}
			}
			return returnObj
		}

		/**
		 * mset - helper function to handle multiple inputs to set method
		 * @param {array} keyValuePairs: an array of objects with properties key, value, and optional ttl
		 * @returns {boolean}: boolean confirming keys have been successfully set
		 */

		#mset(keyValuePairs) {


			// check if cache full

			if (this.stats.keys + keyValuePairs.length >= this.options.maxKeys) {
				const err = this.#error("ECACHEFULL")
				throw err
			}

			// validate all inputs before setting
			for (let i = 0; i < keyValuePairs.length; i++) {
				const keyValuePair = keyValuePairs[i]
				const { key, ttl } = keyValuePair
				// check if ttl is a number
				if (ttl && typeof ttl !== "number") {
					const err = this._error("ETTLTYPE");
					throw err;
				}
				let err;
				if (err = this.#isInvalidKey(key)) {
					throw err
				}
			}

			for (let j = 0; j < keyValuePairs.length; j++) {
				const keyValuePair = keyValuePairs[i]
				const { key, value, ttl } = keyValuePair
				this.set(key, value, ttl)
			}
			return true

		}


		/**
		 *
		 * @param {item} item --> Input item to be deep cloned.
		 */
		#deepClone(itemToClone) {

			return JSON.parse(JSON.stringify(itemToClone));

		}

		/**
		 *
		 * @param {String} value --> Value that we want to wrap into an object with livetime (ttl) or last_time_used (lru)
		 * @param {String} ttl --> Time to live for ttl eviction method. Do not supply for the lru method, if supplied it will be ignored.
		 */
		#wrap(value, ttl) {

			let now;

			if (this.options.evictionPolicy === 'ttl') {

				let livetime = 0;
				let ttlMultiplier = 5000;

				now = Date.now();
				livetime = now + (ttl * ttlMultiplier);

				const ttl_obj = {
					livetime: livetime,
					value: value
				}

				return ttl_obj;

			}

			else if (this.options.evictionPolicy = 'lru') {

				const lru_obj = {
					last_time_used: now,
					value: value
				}

				return lru_obj;
			}
		}

		/**
		 *
		 * @param {Object} cacheEntry -> object contains eviction policy specific time (either livetime or last_time used) and value
		 * @returns value from a specified cache entry
		 */

		#unwrap(cacheEntry) {

			return cacheEntry.value;
		}

		/**
		 *
		 * @param {String || Number || Boolean || Function | Object} value --> value within a cacheEntry that we want to calculate how much memory it will consume.
		 */

		#getValLength(value) {


			if (typeof value === 'string') return value.length;

			else if (Array.isArray(value)) {

				return this.#memorySizeAssumptions.arrayValueSize * value.length;

			}

			else if (typeof value === 'number' || typeof value === 'boolean') {

				return 8;

			}

			else if (typeof (value !== null ? value.then : void 0) === 'function') {

				return this.#memorySizeAssumptions.promiseValueSize;

			}

			else if (value !== null && typeof value === 'object') {

				return this.#memorySizeAssumptions.objectValueSize * Object.keys(value).length;

			}

			else return 0;

		}

		/**
		 *
		 * @param {String} key --> get length of a particular key of a cacheEntry
		 */

		#getKeyLength(key) {

			return key.toString().length;

		}

		/**
		 *
		 * @param {String} type --> refers to error type, such as ENOTFOUND
		 */
		#error(type, data) {


			//commenting out this line for debugging purposes - think data param and associated logic can be deleted
			// let data = this._error.data ? this._error.data : {};

			let error = new Error();
			//fill in error properties
			error.name = type;
			error.errorcode = type;
			error.message = this.#Errors[type] ? this.#Errors[type] : '-';
			error.data = data;

			return error;
		}

		/**
		 *
		 * @param {String} key
		 * @param {Object} data
		 * @returns true if no data needs to be evicted, false otherwise
		 */
		#check(key, data) {


			const now = Date.now();
			let result = true;

			if (this.options.evictionPolicy === 'ttl') {

				if (data.livetime !== 0 && data.livetime < now) {

					if (this.options.deleteOnExpire) {

						result = false;
						this.del(key);

					}

					this.emit("expired", key, this._unwrap(data));

				}

				return result;

			}

			else if (this.options.evictionPolicy === 'lru') {

				this.data[key].last_time_used = Date.now(); //set lru value for key

				return result;

			}

		}
		/**
		 * checks if LRU cache is full before we set a cache value
		 */
		#checkIfLRUFull() {


			if (this.stats.keys >= this.maxKeys) { //indicates that the LRU cache is full

				//calculate key of least recently used entry in the cache
				const lru_key = Object.keys(this.data).reduce(function (a, b) { return this.data[a] < this.data[b] ? a : b });

				//once the key is found, delete the entry using the public delete method
				result = false;
				this.del(lru_key);


			}
		}

		/**
		 *
		 * @returns {void} applies setTimeout once called
		 */

		#checkData() {

			this.#boundMethodCheck(this, Supacache);

			for (let key in this.data) {

				const value = this.data[key];
				this.#check(key, value);
			}

			if (this.options.checkPeriod > 0) {
				this.checkTimeout = setTimeout(this.#checkData, this.options.checkPeriod * 1000);
			}
			return
		}

		/**
		 * kills check period and restart stats counter
		 */
		#killCheckPeriod() {

			this.#boundMethodCheck(this, Supacache);

			if (this.checkTimeout) {
				return clearTimeout(this.checkTimeout);
			}
		}

		/**
		 *
		 * @param {Class Instance} instance
		 * @param {Class Constructor} constructor
		 * @returns throws error if conditional check fails
		 */
		#boundMethodCheck(instance, Constructor) {

			if (!(instance instanceof Constructor)) {

				throw new Error('Accessed instance before binding.');
			}

		}

		/**
		 * Helper function for kill check period
		 */
		#closed() {

			this.#boundMethodCheck(this, Supacache)
			this._killCheckPeriod();

		}

		/**
		 *
		 * @param {String} key
		 * @returns Error object containing the invalid key type that was passed in
		 */

		#isInvalidKey(key) {

			this.#boundMethodCheck(this, Supacache);

			const keyType = typeof (key);
			if (this.#validKeyTypes.indexOf(keyType) === -1) {

				return this.#error("EKEYTYPE", {
					type: typeof key
				})

			}
		}


		/**
		 * #retrieveCacheContents - retrieves snapshot of cache from external DB if option is selected
		 * @returns {void}
		 */


		async retrieveCacheContents() {

			if (this.options.persistCache) {

				let data = await this.#snapshotModel.find().exec()
				if (data[0].Snapshot) {
					this.data = data[0].Snapshot
				}
			}
		}

		/**
		 * #persistCacheContents - stores snapshot of cache in external DB if option is selected
		 * @returns {void} applies setTimeout once called
		 */


		async persistCacheContents() {

			if (this.options.persistCache) {

				try {
					const response = await this.#snapshotModel.findOneAndUpdate({}, { 'Snapshot': this.data }, { upsert: true })
				} catch (err) {
					console.log('error writing cache snapshop to database:', err)
				}

				this.persistPeriodTimeout = setTimeout(() => this.persistCacheContents(), this.options.persistPeriod * 1000)
			}
		}


		/**
		 * kills persist period
		 */
		#killPersistPeriod() {

			if (this.persistPeriodTimeout) {
				return clearTimeout(this.persistPeriodTimeout);
			}
		}


		/**
		 * Global Internal Fields
		 */

		#snapshotModel;

		#memorySizeAssumptions = {
			objectValueSize: 80,
			promiseValueSize: 80,
			arrayValueSize: 40,
		}

		#evictionPolicies = ['ttl', 'lru']

		#validKeyTypes = ["string", "number"]

		#Errors = {
			"ENOTFOUND": "Key `__key` not found",
			"ECACHEFULL": "Cache max keys amount exceeded",
			"EKEYTYPE": "The key argument has to be of type `string` or `number`. Found: `__key`",
			"EKEYSTYPE": "The keys argument has to be an array.",
			"ETTLTYPE": "The ttl argument has to be a number.",
			"EEVICPOLICY": "Eviction policy has to be " + this.#evictionPolicies.join(' or ') + '.',
			"EOPTIONINPUTS": "Option inputs must match the data type of default parameters."
		}

	}

}).call(this)