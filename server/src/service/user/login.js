const jsonWebToken = require('jsonwebtoken');
const { ERROR_CODE } = require('../../exception/errorCode')
const responesData = require('../../config/responseDataConfig')
const { db_query_item } = require('../../db/index')
const { verifyPasswordFun } = require('../../utils/userUtils')
/**
 * @description  用户登录
 * @param {*} event 
 * @param {*} req 
 * @param {*} res 
 */

exports.userLoginMain = async (event, req, res, t) => {
    const { username, password } = event
    const token = req.headers.authorization.split(' ')[1]
    // console.log(req.uesr);
    // 没有toke 
    if (!token) {
        // 生成token
        const resData = await createNewToken(username, password)
        // 密码错误情况
        if (!resData) {
            const errorResData = responesData(ERROR_CODE, '密码错误')
            return errorResData
        }
        //返回
        const successResData = responesData('200', '登录成功', resData)
        return successResData
    }
    // 解码JWT，但不验证签名

    const decodedToken = jsonWebToken.decode(token, { complete: true });
    //解码错误
    if (!decodedToken) {
        console.log('解码错误');
        const errorResData = responesData(ERROR_CODE, '用户令牌无效')
        return errorResData;
    }

    const retunData = {
        userId: decodedToken.payload.userId,
        userName: decodedToken.payload.userName,
        avatarUrl: decodedToken.payload.avatarUrl,
    }
    const successResData = responesData('200', '登录成功', { userData: retunData })
    return successResData

}

/**
 * description 生成token
 * @param {string} username 
 * @param {string} password 
 * @return {Object} token和用户数据
 */
const createNewToken = async (username, password) => {
    const dbResData = await db_query_item('SELECT * FROM user WHERE username=?', [username])
    // 密码验证
    userDbPassWord = dbResData[0].password_hash;
    const isMatch = verifyPasswordFun(password, userDbPassWord)
    if (!isMatch) {

        return false;
    }
    // 生成token
    const SECRET_KEY = 'KelaTodo@Hashan@2003200202020217!@#$%^&*$#34DAG@$#GSDFG%$#^#$#!BDFS#@$DSAF^%sdf#*%'
    const userData = {
        userId: dbResData[0].user_id,
        userName: dbResData[0].username,
        avatarUrl: dbResData[0].avatar_url,
    }
    const newToken = 'Bearer ' + jsonWebToken.sign(userData, SECRET_KEY, {
        expiresIn: "168h", //token有效期 24*7  7天
    })

    return {
        userData: userData,
        token: newToken
    }
}