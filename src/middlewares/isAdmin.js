const config = require("../utils/config")

module.exports = (ctx, next) => {
    if (config.ADMINS.some(admin => admin == ctx.from.id)) {
        return next();
    };
    return;
}