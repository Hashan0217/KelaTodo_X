/**
 * @description MYSQL 配置
 * 
 */

const mysqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'Kelatododata'
}

/**
 * @description Redis配置
 */
const redisConfig = {
    host: '127.0.0.1',
    port: 6379,
}


module.exports = {
    mysqlConfig,
    redisConfig
}