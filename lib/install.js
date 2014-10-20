'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var log = require('imagemin-log');
var path = require('path');

/**
 * Install binary and check whether it works
 * If the test fails, try to build it
 */

bin.run(['--version'], function (err) {
	if (err) {
		log.warn('jpegoptim pre-build test failed');
		log.info('compiling from source');

		var make = process.platform === 'win32' ? 'nmake' : 'make';
		var move = process.platform === 'win32' ? 'move' : 'mv';

		var builder = new BinBuild()
			.src('https://github.com/tjko/jpegoptim/archive/RELEASE.' + bin.v + '.tar.gz')
			.cmd('.' + path.sep + 'configure --prefix="' + bin.dest() + '" --bindir="' + bin.dest() + '"')
			.cmd(make + ' install')
			.cmd(move + ' ' + path.join(bin.dest(), 'bin', bin.use()) + ' ' + bin.path());

		return builder.build(function (err) {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('jpegoptim built successfully');
		});
	}

	log.success('jpegoptim pre-build test passed successfully');
});
