const express = require('express');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(expressSession);
const { redisConfig } = require('./config/dbConfig')
const { BLACK_IP_LIST, FORBIDDEN_CODE } = require('./constant');
const MyError = require('./exception');

// 创建Redis连接配置
const redisClient = redis.createClient(redisConfig);
redisClient.on('connect', function () {
    console.log('Redis client connected');
});
redisClient.on('error', function (e) {
    console.error(e);
});

//临时黑名单
const tempBlackIpList = [];
// 请求大小限制
const requestLimit = '5120kb';

class kelaTodoServer {
    constructor() {
        this.server = express();
        //使用 bodyParser 中间件来解析 urlencoded 格式的请求体。其中，extended: false 表示只解析 URL 编码的数据，而不支持解析复杂对象。
        this.server.use(bodyParser.urlencoded({ extended: false, limit: requestLimit }));
        //bodyParser.json: 使用 bodyParser 中间件来解析 JSON 格式的请求体。
        this.server.use(bodyParser.json({ limit: requestLimit }));
        //this.server.use('x-powered-by', false);: 禁用 Express 的 x-powered-by 头部，以增强安全性。
        this.server.set('x-powered-by', false);
        this.server.all('*', (req, res, next) => {
            // google需要配置，否则报错cors error
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            // 允许的地址 http://127.0.0.1:9000 这样的格式
            res.setHeader('Access-Control-Allow-Origin', req.get('Origin'));
            // 允许跨域请求的方法
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
            // 允许跨域请求 header 携带哪些东西
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since',
            );
            next();
        });

        // 设置Express的Session存储中间件(跟之前session设置方法一样，只加了store项为redis存储)
        this.server.use(
            expressSession({
                // store session存储实例，默认为一个新的 MemoryStore 实例。
                store: new RedisStore({ client: redisClient }), // 只需设置这个就可存储到redis
                name: 'session_id', // 默认connect.sid
                secret: 'hashan007', // 设置签名秘钥  内容可以任意填写
                resave: false, // 强制保存，如果session没有被修改也要重新保存,默认true(推荐false)
                saveUninitialized: true, // 如果原先没有session那么就设置，否则不设置(推荐true)
                rolling: true, // 每次请求更新有效时长
            }),
        );

    }

    setRoute(path, handlerFunction) {

        const handler = async (req, res) => {
            // 黑名单过滤
            const requestClientIp = getClientIp(req);
            if (
                !requestClientIp ||
                BLACK_IP_LIST.includes(requestClientIp) ||
                tempBlackIpList.includes(requestClientIp)
            ) {
                console.error(`ip ${requestClientIp} is in blackList, banned!`);
                return FORBIDDEN_CODE;
            }

            const event = req.body;
            if (event?.pageSize === 100) {
                tempBlackIpList.push(requestClientIp);
                console.log('tempBlackIpList = ' + JSON.stringify(tempBlackIpList));
            }

            let result;

            try {
                const startTime = new Date().getTime();
                let params;
                if (event.file) {
                    let eventCopy = { ...event };
                    eventCopy.file = undefined;
                    params = JSON.stringify(eventCopy);
                } else {
                    params = JSON.stringify(event)
                }
                console.log(
                    `req start path = ${req.path}, clientIp = ${requestClientIp}, params = ${params}`,
                );

                result = await handlerFunction(event, req, res)

                console.log(
                    `req end path = ${req.path}, clientIp = ${requestClientIp}, params = ${params}, costTime = ${new Date().getTime() - startTime}`,
                );

            } catch (e) {
                console.log('错误处理');
                // 全局异常处理
                if (e instanceof MyError) {
                    result = {
                        code: e.code,
                        message: e.message,
                        data: null,
                    };
                } else {
                    // console.log(e);
                    result = e;
                }
                console.error(
                    `req error path = ${req.path}, clientIp = ${requestClientIp}, params = ${JSON.stringify(
                        event,
                    )}`,
                    e,

                );
            }


            res.send(result);

        }

        const contextPath = '/api';
        this.server.post(contextPath + path, handler);
    }

    setJwt(path, jwtErorrHadnlerFun) {
        // 设置token解析中间件
        const SECRET_KEY = 'KelaTodo@Hashan@2003200202020217!@#$%^&*$#34DAG@$#GSDFG%$#^#$#!BDFS#@$DSAF^%sdf#*%'
        this.server.use(jwt({
            secret: SECRET_KEY,
            algorithms: ['HS256'],
            // 令牌过期
            onExpired: async (req, err) => {
                if (new Date() - err.inner.expiredAt < 2 * 60 * 60 * 1000) { return; } // 小于2小时报错
                throw err;
            }
        }).unless(path));

        this.server.use(jwtErorrHadnlerFun)
    }

    listen(port, ...args) {
        this.server.listen(port, ...args);
        console.log(`server start at ${port}`);
    }
}


/**
 * 获取真实客户端 ip
 * @param req
 * @returns {*|string}
 */
function getClientIp(req) {
    if (!req) {
        return '';
    }
    return (
        req.headers['x-forwarded-for'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.connection?.socket?.remoteAddress ||
        req.ip
    );
}

module.exports.kelaTodoRunServer = kelaTodoServer;