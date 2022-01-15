const config = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    ADMINS: process.env.ADMINS.split(","),
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    DB_URI: process.env.DB_URI
};

module.exports = config;