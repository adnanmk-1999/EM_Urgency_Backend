//Secret key to create accessToken and refreshToken for authentication and authorisation.

const config = {
    secret : process.env.SECRET,
    accessExpire : process.env.ACCESS_TOKEN_LIFE,
    refreshExpire : process.env.REFRESH_TOKEN_LIFE
}

module.exports = config;