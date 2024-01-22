
const { kelaTodoRunServer } = require('./server');
const mysql = require('./db/index');
const { whiteListPath, jwtErrorHandlerFun } = require('./utils/jwtUtils')

// 创建Server 实例
const server = new kelaTodoRunServer();

// JWT token 配置
server.setJwt(whiteListPath, jwtErrorHandlerFun)

// 用户注册路由
server.setRoute('/user/register/getcode', require('./service/user/register').getVerificationCodeMain); // 获取注册验证码
server.setRoute('/user/register/checkuser', require('./service/user/register').checkUserNameMain); // 检查用户名是否注册过
server.setRoute('/user/register', require('./service/user/register').emailRegUserMain); //注册

//登录路由
server.setRoute('/user/login', require('./service/user/login').userLoginMain); // 登录

// 修改密码
server.setRoute('/user/change/getcode', require('./service/user/change').getVerifyIdentidyUserCode); //获取核验用户身份验证码
server.setRoute('/user/change/checkuser', require('./service/user/change').VerifyIdentidyUserCode); //核验用户身份
server.setRoute('/user/change', require('./service/user/change').changeUserPasswordMain);//修改密码


// 监听端口
server.listen(5726);