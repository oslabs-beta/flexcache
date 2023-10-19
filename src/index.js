(function() {

    const helperFunctions = require('./private/helperFunctions.js')
    const publicMethods = require('./public/public_methods.js')

    const {
        _deepClone, _wrap, _unwrap,
        _getValLength, _getKeyLength,
        _error, _check, _checkIfLRUFull,
        _checkData, _killCheckPeriod, _closed,
        _boundMethodCheck, _isInvalidKey 
    } = helperFunctions
    
    const {
        get, set, take,
        del, ttl, getTtl,
        getStats, flushStats, flushAll,
        has, keys, close 
    } = publicMethods

    const eventEmitter = require('events').EventEmitter

    module.exports = class Supacache extends eventEmitter {
        constructor (options = {}) {
            super()
            
            /**
             * Option Parameters
             */

            // default options
            this.options = {
                forceString: false,
                stdTTL: Infinity,
                checkPeriod: 0,
                deleteOnExpire: true,
                maxKeys: Infinity,
            }

            // overwrite defaults with user inputs
            const {forceString, stdTTL, checkPeriod, deleteOnExpire, maxKeys, evictionPolicy} = options
            const writableProps = {forceString, stdTTL, checkPeriod, deleteOnExpire, maxKeys}
            for (const key in writableProps) {
                if (writableProps[key]) {
                    if (typeof writableProps[key] !== typeof this.options[key]){
                        const _err = this._error("EOPTIONINPUTS")
                        throw _err
                    }
                    this.options[key] = writableProps[key]
                }
            }
        
            // assign eviction policy as read only property, use ttl as default policy
            if (evictionPolicy) {
                if (!this._evictionPolicies.includes(evictionPolicy)) {
                    const _err = this._error("EEVICPOLICY")
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

            /**
             * Data and Metadata Containers
             */

            this.data= {}

            this.stats = {
                hits: 0,
                misses: 0,
                keys: 0,
                ksize: 0,
                vsize: 0
            }
            
            /**
             * Bind Internal Methods
             */

            this._deepClone = this._deepClone.bind(this)
            this._wrap = this._wrap.bind(this)
            this._unwrap = this._unwrap.bind(this)
            this._getValLength = this._getValLength.bind(this)
            this._getKeyLength = this._getKeyLength.bind(this)
            this._error = this._error.bind(this)
            this._check = this._check.bind(this)
            this._checkIfLRUFull = this._checkIfLRUFull.bind(this)
            this._checkData = this._checkData.bind(this)
            this._killCheckPeriod = this._killCheckPeriod.bind(this)
            this._closed = this._closed.bind(this)
            this._boundMethodCheck = this._boundMethodCheck.bind(this)
            this._isInvalidKey = this._isInvalidKey.bind(this)

            /**
             * Bind Public Methods
             */

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

            this._checkData()

            return
        }

        /**
         * Public Methods
         */
        get = get
        set = set
        take = take
        del = del
        ttl = ttl
        getTtl = getTtl
        getStats = getStats
        flushStats = flushStats
        flushAll = flushAll
        has = has
        keys = keys
        close = close

        /**
         * Private Methods
         */

        _deepClone = _deepClone
        _wrap = _wrap
        _unwrap = _unwrap
        _getValLength = _getValLength
        _getKeyLength = _getKeyLength
        _error = _error
        _check = _check
        _checkIfLRUFull =_checkIfLRUFull
        _checkData = _checkData
        _killCheckPeriod = _killCheckPeriod
        _closed = _closed
        _boundMethodCheck = _boundMethodCheck
        _isInvalidKey = _isInvalidKey


        /**
         * Global Metadata Fields
         */

        _memorySizeAssumptions = {
            objectValueSize: 80,
            promiseValueSize: 80,
            arrayValueSize: 40,
        }

        _evictionPolicies = ['ttl', 'lru']

        _validKeyTypes = ["string", "number"]

        _Errors = {
            "ENOTFOUND": "Key `__key` not found",
            "ECACHEFULL": "Cache max keys amount exceeded",
            "EKEYTYPE": "The key argument has to be of type `string` or `number`. Found: `__key`",
            "EKEYSTYPE": "The keys argument has to be an array.",
            "ETTLTYPE": "The ttl argument has to be a number.",
            "EEVICPOLICY": "Eviction policy has to be " + this._evictionPolicies.join(' or ') + '.',
            "EOPTIONINPUTS": "Option inputs must match the data type of default parameters."
        }
            
    }

}).call(this)