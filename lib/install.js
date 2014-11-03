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
		log.warn(err.message);
		log.warn('jpegoptim pre-build test failed');
		log.info('compiling from source');

		var builder = new BinBuild()
			.src('https://github.com/tjko/jpegoptim/archive/RELEASE.' + bin.v + '.tar.gz')
			.cmd('./configure --prefix="' + bin.dest() + '" --bindir="' + bin.dest() + '"')
			.cmd('make install')
			.cmd('mv ' + path.join(bin.dest(), 'bin', bin.use()) + ' ' + bin.path());

		return builder.run(function (err) {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('jpegoptim built successfully');
		});
	}

	log.success('jpegoptim pre-build test passed successfully');
});
