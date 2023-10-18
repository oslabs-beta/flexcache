import NodeCache from 'node-cache';

// ttl of 1 hour
const defaultTTL = 60 * 60;

const cache = new NodeCache({ stdTTL: defaultTTL });

// Set
export const setCache = (key: string, value: any, ttl?: number): boolean => {
    console.log(`Adding ${key} to cache`);
    return cache.set(key, value, ttl || defaultTTL);
};

// Get
export const getCache = <T>(key: string): T | undefined => {
    const value = cache.get<T>(key);

    console.log(`Getting ${key} from cache`);
    if (value === undefined) {
        return undefined;
    }
    return value;
};

