const { createVerificationCode, checkFormFun, sendEmailFun, dataEncryptionHash } = require('../../utils/userUtils')
const responesData = require('../../config/responseDataConfig')
const { ERROR_CODE } = require('../../exception/errorCode')
const { db_query_item, db_updata } = require('../../db/index')

/**
 * description 获取核验用户身份验证码
 * 
 */
exports.getVerifyIdentidyUserCode = async (event, req, res) => {

    let { email } = event
    email = email.toLowerCase() // 改成小写
    //检查邮箱格式
    if (!checkFormFun({ 'email': email })) {
        const errorData = responesData(ERROR_CODE, '邮箱格式错误')
        return errorData
    }

    // 检查邮箱是否存在
    const dbResData = await db_query_item('SELECT email FROM user WHERE email=?', [email])
    if (dbResData.length <= 0 && dbResData[0].email !== email) {
        const errorData = responesData(ERROR_CODE, '邮箱不正确')
        return errorData
    }
    // 生成验证码
    const veriFicationCode = createVerificationCode()
    //存储验证码
    req.session['change' + email] = veriFicationCode
    req.session['change' + email + 'Tiem'] = Date.now()
    // 发送验证码
    const emailMessage = `
            <p>KelaTodo-X:核验您的身份</p>
            <p>您正在修改KelaTodo-X账号的密码</p>
            <p>你的验证码是：<strong style="color: #ff4e2a;">${veriFicationCode}</strong></p>
            <p>***该验证码5分钟内有效***</p>`
    const isSend = await sendEmailFun(email, emailMessage)

    //返回验证码
    const successData = responesData('200', '验证码发送成功')
    return successData

}

/**
 * description 核验用户身份
 */
exports.VerifyIdentidyUserCode = async (event, req, res) => {
    let { code, email } = event
    email = email.toLowerCase() // 改成小写
    veriFicationCode = req.session['change' + email]
    VerificationCodeTime = req.session['change' + email + 'Tiem']
    isTimeOut = (Date.now() - VerificationCodeTime) / 1000 > 300 // 判断是否超时五分钟

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

    //删除session
    req.session.destroy();
    const successData = responesData('200', '核验身份成功')
    return successData
}



/**
 * description 修改密码
 */

exports.changeUserPasswordMain = async (event, req, res) => {
    let { email, password } = event
    email = email.toLowerCase() // 改成小写
    const passwordHash = dataEncryptionHash(password)
    const dbResData = await db_updata("UPDATE user  SET password_hash =? WHERE email =?", [passwordHash, email])
    //返回验证码
    const successData = responesData('200', '修改密码成功')
    return successData
}