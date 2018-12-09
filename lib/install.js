'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['--version']).then(() => {
	log.success('jpegoptim pre-build test passed successfully');
}).catch(error => {
	log.warn(error.message);
	log.warn('jpegoptim pre-build test failed');
	log.info('compiling from source');

	binBuild.url('https://github.com/tjko/jpegoptim/archive/RELEASE.1.4.6.tar.gz', [
		`./configure --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
		'make install'
	]).then(() => {
		log.success('jpegoptim built successfully');
	}).catch(error => {
		log.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	});
});
