// // Memory session
const { session: memorySession } = require('telegraf');


// Redis session
const RedisSession = require('telegraf-session-redis');
const config = require('../utils/config');

let session;

if (config.SESSION_TYPE === 'redis') {
    session = new RedisSession({
        store: {
            host: config.REDIS_HOST || '127.0.0.1',
            port: config.REDIS_PORT || 6379
        }
    });;
} else {
    session = memorySession;
}

module.exports = session;