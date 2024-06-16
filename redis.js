import { createClient } from 'redis';

let client;

const initRedisClient = async () => {
    if (!client) {
        client = createClient(); // 6379 - default port
        client.on('error', err => console.log('Redis Client Error', err))
    }

    try {
        await client.connect()
    } catch (error) {
        console.log("Error occured in initializing redis")
        throw new Error("Redis connection failed")
    }
}

const getStringValue = async (key) => {
    try {
        const value = await client.get(key)
        return JSON.parse(value)
    } catch (error) {
        console.log("Error occured in getting value from redis")
        throw new Error("Redis get key failed")
    }
}

const setStringValue = async (key, value) => {
    try {
        await client.set(key, JSON.stringify(value))
    } catch (error) {
        console.log("Error occured in setting value from redis")
        throw new Error("Redis set key failed")
    }
}


export { getStringValue, setStringValue, initRedisClient }