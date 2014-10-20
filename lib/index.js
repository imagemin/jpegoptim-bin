'use strict';

var BinWrapper = require('bin-wrapper');
var path = require('path');
var pkg = require('../package.json');

/**
 * Variables
 */

var BIN_VERSION = '1.4.1';
var BASE_URL = 'https://raw.githubusercontent.com/imagemin/jpegoptim-bin/v' + pkg.version + '/vendor/';

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper({ progress: false })
	.src(BASE_URL + 'osx/jpegoptim', 'darwin')
	.src(BASE_URL + 'linux/jpegoptim', 'linux')
	.src(BASE_URL + 'win32/jpegoptim.exe', 'win32')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'jpegoptim.exe' : 'jpegoptim');

/**
 * Module exports
 */

module.exports = bin;
module.exports.v = BIN_VERSION;
