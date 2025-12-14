//Secret key to create accessToken and refreshToken for authentication and authorisation.
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
require('dotenv').config();

const config = {
    secret: process.env.JWT_SECRET,
    accessExpire: process.env.ACCESS_TOKEN_LIFE,
    refreshExpire: process.env.REFRESH_TOKEN_LIFE
}

module.exports = config;