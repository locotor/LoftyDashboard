const helpers = require('./config/helpers');
const ip = require('ip');
exports.PROJECT_NAME = 'lofty-dashboard';
exports.HOST = ip.address();
exports.DEV_PORT = 3000;
exports.PROD_PORT = 8060;
exports.DEV_OUTPUT_DIR = "D:\\IIS\\Lofty\\dashboard";
exports.DLL_OUTPUT_DIR = "D:\\IIS\\Lofty\\dashboardDll";
exports.PROD_OUTPUT_DIR = "";


//配置map文件的生成方式
exports.DEV_SOURCE_MAP = 'source-map';
exports.PROD_SOURCE_MAP = '';

//配置开发服务器的变更监视
exports.DEV_SERVER_WATCH_OPTIONS = {
    poll: undefined,
    aggregateTimeout: 300,
    ignored: /node_modules/
};

exports.EXCLUDE_SOURCE_MAPS = [
    helpers.root('node_modules/@angular'),
    helpers.root('node_modules/@nguniversal'),
    helpers.root('node_modules/rxjs'),
    /\.scss&/,
    /\.html&/
];