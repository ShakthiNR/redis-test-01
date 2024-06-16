import { initRedisClient } from "./redis.js"

class DataSource {
    static async connect() {
        try {
            // redis connection
            await initRedisClient()
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default DataSource

