import NodeCache from 'node-cache';

// ttl of 1 hour
const defaultTTL = 60 * 60;

const cache = new NodeCache({ stdTTL: defaultTTL });

// SET
export const setCache = (key: string, value: any, ttl?: number): boolean => {
    return cache.set(key, value, ttl || defaultTTL);
};

// GET
export const getCache = (key: string): string | undefined => {
    const value = cache.get(key);
    if (value === undefined) {
        return undefined;
    }
    return value;
};
