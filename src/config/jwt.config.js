require('dotenv').config('../../.env')

const jwtConfig = {
    jwtAccessSecret: process.env.ACCESS_SECRET_KEY,
    jwtRefreshSecret: process.env.REFRESH_SECRET_KEY,
    jwtAccessExpiry: process.env.ACCESS_EXPIRY,
    jwtRefreshExpiry: process.env.REFRESH_EXPIRY,
}

module.exports = {jwtConfig}