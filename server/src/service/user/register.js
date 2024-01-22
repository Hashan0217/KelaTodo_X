const { createUserId, createVerificationCode, checkFormFun, dataEncryptionHash, sendEmailFun } = require('../../utils/userUtils')
const responesData = require('../../config/responseDataConfig')
const { db_query_item, db_add } = require('../../db/index')
const { ERROR_CODE } = require('../../exception/errorCode')


/**
 * @description 用户名检查是否注册过
 * @param {*} event 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.checkUserNameMain = async (event, req, res) => {
    const { username } = event
    const dbResData = await db_query_item("SELECT COUNT(*) FROM user WHERE username = ?", [username])
    const userCountNum = dbResData[0]['COUNT(*)']     // 统计的数大于零 标识存在 
    const successData = responesData('200', '查找成功', userCountNum)
    return successData

}


/**
 * @description 获取验证码
 * @param {*} event 
 * @param {*} req 
 * @param {*} res 
 */
exports.getVerificationCodeMain = async (event, req, res) => {
    let { email } = event
    email = email.toLowerCase() // 改成小写
    //检查邮箱格式
    if (!checkFormFun({ 'email': email })) {
        const errorData = responesData(ERROR_CODE, '邮箱格式错误')
        return errorData
    }

    // 检查邮箱是否注册过
    const dbResData = await db_query_item('SELECT email FROM user WHERE email=?', [email])
    if (dbResData.length > 0) {
        if (dbResData[0].email === email) {
            const errorData = responesData(ERROR_CODE, '邮箱已注册')
            return errorData
        }
    }

    // 生成验证码
    const veriFicationCode = createVerificationCode()
    //存储验证码
    req.session[email] = veriFicationCode
    req.session[email + 'Tiem'] = Date.now()
    // 发送验证码
    const emailMessage = `
            <p>KelaTodo-X:您好！</p>
            <p>您正在注册KelaTodo-X账号</p>
            <p>你的验证码是：<strong style="color: #ff4e2a;">${veriFicationCode}</strong></p>
            <p>***该验证码5分钟内有效***</p>`
    const isSend = await sendEmailFun(email, emailMessage)

    //返回验证码
    const successData = responesData('200', '验证码生成成功')
    return successData
}

/**
 * @description 邮箱注册账号
 * @param {*} event 
 * @param {*} req 
 * @param {*} res  
 */
exports.emailRegUserMain = async (event, req, res) => {
    let { username, email, password, code } = event
    email = email.toLowerCase() // 改成小写
    veriFicationCode = req.session[email]
    VerificationCodeTime = req.session[email + 'Tiem']
    console.log(VerificationCodeTime);
    isTimeOut = (Date.now() - VerificationCodeTime) / 1000 > 300 // 判断是否超时五分钟
    const dbResEmailData = await db_query_item('SELECT * FROM user WHERE email=?', [email])
    if (dbResEmailData.length > 0) {
        if (dbResEmailData[0].email === email) {
            const errorData = responesData(ERROR_CODE, '邮箱已注册')
            return errorData
        }
    }
    //传参数据错误
    if (!checkFormFun({ 'email': email, 'password': password })) {
        const errorData = responesData(ERROR_CODE, '传参数据格式错误')
        return errorData
    }
    // 没有验证码
    if (!veriFicationCode && !code) {
        const errorData = responesData(ERROR_CODE, '没有验证码，先获取验证码')
        return errorData
    }
    // 验证码检验
    if (veriFicationCode !== code) {
        const errorData = responesData(ERROR_CODE, '验证码错误')
        return errorData
    }
    // 验证码是否失效
    if (isTimeOut) {
        const errorData = responesData(ERROR_CODE, '验证码失效')
        return errorData
    }

    // 处理密码为哈希值
    const passwordHash = dataEncryptionHash(password)
    //用户唯一标识符
    const uuid = createUserId();
    // 添加数据
    const dbResData = await db_add('INSERT INTO user (user_id,username,password_hash,email) VALUES (?, ?, ?, ?);',
        [uuid, username, passwordHash, email])
    //删除session
    req.session.destroy();
    const successData = responesData('200', '注册成功')
    return successData
}


