require("dotenv").config();

let env = process.env.NODE_ENV.trim();

const dev = {
    server: {
        port: parseInt(process.env.DEV_SERVER_PORT) || 8080,
        key: parseInt(process.env.DEV_SERVER_KEY) || "azerty",
        tokenDuration: parseInt(process.env.DEV_SERVER_TOKEN_DURATION) || "24h",
    },
    mongodb: {
        host: process.env.DEV_MONGODB_HOST || "mongodb://127.0.0.1",
        port: parseInt(process.env.DEV_MONGODB_PORT) || 27017,
        name: process.env.DEV_MONGODB_NAME || "polaropedia",
    },
    mail: {
        user: process.env.DEV_MAIL_USER,
        password: process.env.DEV_MAIL_PASSWORD,
    },
};

const config = {
    dev,
};

console.log(config[env]);

module.exports = config[env];
