const { ERROR_CODE } = require('../exception/errorCode')
const responesData = require('../config/responseDataConfig')

// 避开jwt token解析
exports.whiteListPath = {
    path:
        [
            '/api/user/register/getcode',
            '/api/user/register',
            '/api/user/register/checkuser',
            '/api/user/login',
            '/api/user/change/getcode',
            '/api/user/change/checkuser',
            '/api/user/change'
        ]
}

// jwt解析错误处理
exports.jwtErrorHandlerFun = (err, req, res, next) => {
    if (req.user.admin) {
        const errResData = responesData(ERROR_CODE, '用户令牌错误', err.message)
        res.send(errResData)
    }

}
