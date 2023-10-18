//will need to import public delete method


/**
 * 
 * @param {item} item --> Input item to be deep cloned. 
 */
const _deepClone = itemToClone => {

    return JSON.parse(JSON.stringify(itemToClone));

}

/**
 * 
 * @param {String} value --> Value that we want to wrap into an object with livetime (ttl) or last_time_used (lru)
 * @param {String} ttl --> Time to live for ttl eviction method. Do not supply for the lru method, if supplied it will be ignored.
 */
const _wrap = (value, ttl) => {

    _boundMethodCheck(this, Supacache);

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
const _unwrap = cacheEntry => {

    return cacheEntry.value;

}



/**
 * 
 * @param {String || Number || Boolean || Function | Object} value --> value within a cacheEntry that we want to calculate how much memory it will consume.
 */
const _getValLength = value => {

    _boundMethodCheck(this, Supacache);

    if (typeof value === 'string') return value.length;

    else if (Array.isArray(value)) {

        return this.arrayValueSize * value.length;

    }

    else if (typeof value === 'number' || typeof value === 'boolean') {

        return 8;

    }

    else if (typeof (value !== null ? value.then : void 0) === 'function') {

        return this.promiseValueSize;

    }

    else if (value !== null && typeof value === 'object') {

        return this.objectValueSize * Object.keys(value).length;

    }

    else return 0;

}

/**
 * 
 * @param {String} key --> get length of a particular key of a cacheEntry 
 */
const _getKeyLength = key => {

    return key.toString().length;

}

/**
 * 
 * @param {String} type --> refers to error type, such as ENOTFOUND
 */
const _error = (type, data) => {

    _boundMethodCheck(this, Supacache);

    //commenting out this line for debugging purposes - think data param and associated logic can be deleted
    // let data = this._error.data ? this._error.data : {};

    let error = new Error();
    //fill in error properties
    error.name = type;
    error.errorcode = type;
    error.message = this._Errors[type] != null ? this._Errors[type] : '-';
    error.data = data;

    return error;
}

/**
 * 
 * @param {String} key 
 * @param {Object} data 
 * @returns true if no data needs to be evicted, false otherwise
 */
const _check = (key, data) => {

    _boundMethodCheck(this, Supacache);
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
const _checkIfLRUFull = () => {

    _boundMethodCheck(this, Supacache);

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
 * @param {Boolean} startPeriod, defaulted to true
 * @returns {void} applies setTimeout once called 
 */
const _checkData = (startPeriod = true) => {

    _boundMethodCheck(this, Supacache);

    for (let key in this.data) {

        const value = this.data[key];
        this._check(key, value);

    }

    if (startPeriod && this.options.checkPeriod > 0) {

        this.checkTimeout = setTimeout(this._checkData, this.options.checkPeriod * 1000, startPeriod);

    }

}

/**
 * For internal use only to kill check period and restart stats counter 
 */
const _killCheckPeriod = () => {

    if (this.checkTimeout != null) {
        return clearTimeout(this.checkTimeout);
    }
}

/**
 * Helper function for kill check period
 */
const _closed = () => {

    _boundMethodCheck(this, Supacache)
    this._killCheckPeriod();

}

/**
 * 
 * @param {Class Instance} instance 
 * @param {Class Constructor} constructor
 * @returns throws error if conditional check fails  
 */
const _boundMethodCheck = (instance, constructor) => {

    if (!(instance instanceof Constructor)) {

        throw new Error('Accessed instance before binding.');
    }

}

/**
 * 
 * @param {String} key 
 * @returns Error object containing the invalid key type that was passed in
 */
const _isInvalidKey = key => {

    _boundMethodCheck(this, Supacache);

    const keyType = typeof (key);
    if (this._validKeyTypes.indexOf(keyType) === -1) {

        return this._error("EKEYTYPE", {
            type: typeof key
        })

    }
}

// export functions

module.exports = {_deepClone, _wrap, _unwrap, _getValLength, _getKeyLength, _error, _check, _checkIfLRUFull, _checkData, _killCheckPeriod, _closed, _boundMethodCheck, _isInvalidKey}














