var path = require('path');
const EVENT = process.env.npm_lifecycle_event || '';
var ROOT = path.resolve(__dirname, "..");
var DevPath = path.format({ dir: "D:\\IIS\\Lofty" })


function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

function hasNpmFlag(flag) {
    return EVENT.includes(flag);
}

function isWebpackDevServer() {
    return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}

var root = path.join.bind(path, ROOT);
var devRoot = path.join.bind(path, DevPath);


exports.hasProcessFlag = hasProcessFlag;
exports.hasNpmFlag = hasNpmFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
exports.devRoot = devRoot;