const { default: test } = require('node:test')
const Supacache = require('./index.js')

const testCache = new Supacache ()


testCache.set('name', 'brian')

testCache.options.evictionPolicy = 'lru'

console.log(testCache)

// const testCacheVal =testCache.get('name')

