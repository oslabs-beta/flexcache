class supacache {

  constructor() {
    this.cache = new Map();
    this.options = {}
  }
/*  mset/set method ------------------------------------------------------------------------------------*/
  set(keyOrKeyValueSet, value, evictionPolicy) {
    try{
      if (Array.isArray(keyOrKeyValueSet)) {
          // Handle setting multiple key-value pairs
          for (const { key, value, evictionPolicy } of keyOrKeyValueSet) {
              this.set(key, value, evictionPolicy);
          }
      } else {
          // Handle setting a single key-value pair
          const key = keyOrKeyValueSet;
  
          let _err, err, existent; //maybe not need?
          boundMethodCheck(this, NodeCache);
  
          // Check if cache is overflowing
          if (this.options.maxKeys !== Infinity && this.stats.keys >= this.options.maxKeys) {
              _err = this._error("ECACHEFULL");
              throw _err;
          }
  
          // Force the data to a string if required
          if (this.options.forceString && typeof value !== "string") {
              value = JSON.stringify(value);
          }
  
          // Check what the passed-in eviction policy is
          console.log(`Eviction policy is: ${evictionPolicy}`);
  
          // Set evictionPolicy to default TTL if not passed
          switch (evictionPolicy) {
            case 'ttl' : 
              evictionPolicy = this.options.TTL
              break;
            case 'lru' :
              evictionPolicy = this.options.LRU
              break;
            default :
              evictionPolicy = this.options.stdTTL
              break;
          }
  
          // Handle invalid key types
          if ((err = this._isInvalidKey(key)) != null) {
              throw err;
          }
  
          // Internal helper variables
          existent = false;
  
          // Remove existing data from stats if the key already exists
          if (this.data[key]) {
              existent = true;
              this.stats.vsize -= this._getValLength(this._unwrap(this.data[key], false));
          }
  
          // Set the value
          this.data[key] = this._wrap(value, evictionPolicy);
          this.stats.vsize += this._getValLength(value);
  
          // Only add the keys and key-size if the key is new
          if (!existent) {
              this.stats.ksize += this._getKeyLength(key);
              this.stats.keys++;
          }
      }

        return true;
    }
    
    catch(err) {
      console.log("Try/Catch Set Method Error", err)
    }
  }
  /*  mget/get method ------------------------------------------------------------------------------------*/
  get(keys) {
    try {
        let err, i, key, len, objectReturn;
        boundMethodCheck(this, NodeCache);

        // If keys is not an array, convert it to an array with one key
        if (!Array.isArray(keys)) {
            keys = [keys];
        }

        // Define the return object
        objectReturn = {};

        for (i = 0, len = keys.length; i < len; i++) {
            key = keys[i];

            //Check if key is valid
            if ((err = this._isInvalidKey(key)) != null) {
                throw err;
            }

            // Get data and increment stats
            if ((this.data[key] != null) && this._check(key, this.data[key])) {
                this.stats.hits++;
                objectReturn[key] = this._unwrap(this.data[key]);
            } else {
                // If not found, return an error
                this.stats.misses++;
            }
        }

        // If a single key was provided, return the value directly; otherwise, return an object
        return Array.isArray(keys) ? objectReturn : objectReturn[keys[0]];

    } 
    
    catch (err) {
        console.log("Try/Catch Get Method Error", err);
    }
  }
}


const cache = new supacache();
const data = {dataKey : "dataValue"}

cache.set(data, [data])

console.log(cache)

export default supacache;
