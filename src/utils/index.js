const config = require("./config");

exports.isProduction = () => config.NODE_ENV === "production";