// // Memory session
// const { session: memorySession } = require('telegraf');

// const session = memorySession();



// Redis session
const RedisSession = require('telegraf-session-redis');
const config = require('../utils/config');

const session = new RedisSession({
    store: {
        host: config.REDIS_HOST || '127.0.0.1',
        port: config.REDIS_PORT || 6379
    }
});

module.exports = session;