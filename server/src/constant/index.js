
const FORBIDDEN_CODE = 403;

/**
 * 网站域名
 * @type {string}
 */
const WEB_HOST = 'https://www.mianshiya.com';


/**
 * 对象存储域名
 * @type {string}
 */
// const COS_HOST = 'https://xxx.mianshiya.com';



/**
 * 永封 IP
 * @type {string[]}
 */
const BLACK_IP_LIST = [
    '111.202.85.21',
    '114.117.161.191',
    '82.156.28.118',
];

module.exports = {
    FORBIDDEN_CODE,
    BLACK_IP_LIST,
    WEB_HOST,
};