const mysql = require('mysql');
const { mysqlConfig } = require('../config/dbConfig');
const pool = mysql.createPool(mysqlConfig)
const { MYSQL_ERROR_CODE } = require('../exception/errorCode')
const responesDataConfig = require('../config/responseDataConfig')

/**
 * @description 新增一条数据
 * @param  {str}  sql SQL语句
 * @param  {obj} reqData 插入的数据
 * @param  {obj} res 接口函数中的res对象
 * @param  {obj} next 接口函数中的next对象
 */

const db_add = (sql, reqData, res, next) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, [...reqData], (err, result) => {
                if (result) {
                    resolve(result)
                } else {
                    const errorData = responesDataConfig(MYSQL_ERROR_CODE, '数据库错误->插入数据失败', err)
                    reject(errorData)
                }
                // 释放连接
                connection.release();
            });
        });
    });
};


/**
 * @description 更新一条数据
 * @param  {String}  sql SQL语句
 * @param  {Array} reqData 插入的数据
 * @param  {obj} res 接口函数中的res对象
 * @param  {obj} next 接口函数中的next对象
 */
const db_updata = (sql, reqData, res, next) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, [...reqData], (err, result) => {
                if (result) {
                    resolve(result)
                } else {
                    const errorData = responesDataConfig(MYSQL_ERROR_CODE, '数据库错误->更新数据失败', err)
                    reject(errorData)
                }
                // 释放连接
                connection.release();
            });
        });
    });
};


/**
 * @description 查找一条数据
 * @param  {String}  sql SQL语句
 * @param  {Array} reqData 插入的数据
 * @param  {obj} res 接口函数中的res对象
 * @param  {obj} next 接口函数中的next对象
 */
const db_query_item = (sql, reqData, res, next) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, [...reqData], (err, result) => {
                if (result || typeof result === 'Array') {
                    resolve(result)
                } else {
                    const errorData = responesDataConfig(MYSQL_ERROR_CODE, '数据库错误->查找数据失败', err)
                    reject(errorData)
                }
                // 释放连接
                connection.release();
            });
        });
    });
};


/**
 * @description 查找所有数据
 * @param  {str} sql SQL语句
 * @param  {obj} reqData 插入的数据
 * @param  {obj} res 接口函数中的res对象
 * @param  {obj} next 接口函数中的next对象
 */
const db_query_all = (sql, reqData, res, next) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, [...reqData], (err, result) => {
                if (result) {
                    resolve(result)
                } else {
                    const errorData = responesDataConfig(MYSQL_ERROR_CODE, '数据库错误->查找所有数据失败', err)
                    reject(errorData)
                }
                // 释放连接
                connection.release();
            });
        });
    });
};




/**
 * @description 删除一条数据
 * @param  {str} sql SQL语句
 * @param  {obj} reqData 插入的数据
 * @param  {obj} res 接口函数中的res对象
 * @param  {obj} next 接口函数中的next对象
 */

const db_delete = (sql, reqData, res, next) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, [...reqData], (err, result) => {
                if (result) {
                    resolve(reject)
                } else {
                    const errorData = responesDataConfig(MYSQL_ERROR_CODE, '数据库错误->删除数据失败', err)
                    reject(errorData)
                }
                // 释放连接
                connection.release();
            });
        });
    });
};



module.exports = {
    db_add,
    db_updata,
    db_query_item,
    db_query_all,
    db_delete,
}