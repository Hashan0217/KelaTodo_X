/**
 * @description 响应数据格式化
 * @param {string} code 
 * @param {string} message 
 * @param {object} data 
 * @param {object} other 
 */

const responesDataConfig = (code, message, data = null, other = null) => {
    const obj = {
        code,
        message,
        data,
        other
    }
    const newData = JSON.stringify(obj)
    return newData
}

module.exports = responesDataConfig;