'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');

const url = `https://raw.githubusercontent.com/imagemin/jpegoptim-bin/v${pkg.version}/vendor/`;

module.exports = new BinWrapper()
	.src(`${url}osx/jpegoptim`, 'darwin')
	.src(`${url}linux/jpegoptim`, 'linux')
	.src(`${url}win32/jpegoptim.exe`, 'win32')
	.dest(path.resolve(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'jpegoptim.exe' : 'jpegoptim');
