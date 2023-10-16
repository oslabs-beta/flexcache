import supacache from "/Users/brianyang/Brian Yang VSC/supacache/test/supacacheModuleTest.js";
const cache = new supacache;

const data = {
    firstData: "Hello there, I'm data!",
    moreData: "I'm more data...",
    etc: "...etc"
}

cache.set(data, [data])

console.log(cache.set(data))