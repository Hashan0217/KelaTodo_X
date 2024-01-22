const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const { ERROR_CODE } = require('../exception/errorCode')
/**
 * @description 生成用户id
 * @return {String} 返回用户的唯一标识符
 */

const createUserId = () => {
    const uuid = uuidv4();
    return uuid
}

/**
 * @description 生成验证码
 * @return {String} 返回邮箱验证码
 */
const createVerificationCode = () => {
    const code = uuidv4().slice(0, 4);
    return code
}

/**
 * @description 检查表单数据是否合法
 * @param {Object} data 
 */
const checkFormFun = (data) => {
    const ruler = {
        'email': function (email) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email)
        },
        'password': function (password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password)
        }
    }
    const dataKey = Object.keys(data);
    console.log(dataKey);
    // 根据参数循环调用每个检查规则，都为真则真 否则为假
    const result = dataKey.every((item) => {

        return ruler[item](data[item])
    })
    return result;

}

/**
 * @description 加密密码为哈希
 * @param {String} password 
 */
const dataEncryptionHash = (password) => {
    const passwordHash = bcrypt.hashSync(password, 10)
    return passwordHash
}

/**
 * description 验证密码
 * @param {String} password - 密码
 * @param {String} passwordHash - 哈希密码（数据库中的密码）
 */

const verifyPasswordFun = (password, passwordHash) => {
    const isMatch = bcrypt.compareSync(password, passwordHash);
    return isMatch;
}


/**
 * @description 发送验证码邮件
 * @param {String} email - 邮箱号
 * @param {String} message - 邮件内容
 */

const sendEmailFun = (email, message) => {
    return new Promise((resolve, reject) => {
        // 创建邮件传输对象  
        const transporter = nodemailer.createTransport(smtpTransport({
            host: 'smtp.88.com', // 你的SMTP服务器主机名  
            port: 465, // 你的SMTP服务器端口号  
            secure: true,
            auth: {
                user: 'hashan@88.com', // 你的邮箱地址  
                pass: 'mdZqyjDhxY5aWR92' // 你的邮箱密码  
            }
        }));

        // 设置邮件内容  
        const mailOptions = {
            from: 'hashan@88.com', // 发件人邮箱地址  
            to: email, // 收件人邮箱地址  
            subject: 'KelaTodo-X:查看您的验证码邮件', // 邮件主题  
            html: message
        };

        // 使用transporter对象发送邮件  
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                // console.log(error);
                const errorResData = { code: ERROR_CODE, data: error }
                reject(errorResData)
                // 关闭连接  
                transporter.close();
            } else {
                console.log('Email sent:', info.response);
                resolve(true)
                // 关闭连接  
                transporter.close();
            }
        });
    })


}

module.exports = {
    createUserId,
    createVerificationCode,
    checkFormFun,
    dataEncryptionHash,
    sendEmailFun,
    verifyPasswordFun
}