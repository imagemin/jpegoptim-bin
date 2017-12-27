'use strict';
const BinBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['--version'], err => {
	if (err) {
		log.warn(err.message);
		log.warn('jpegoptim pre-build test failed');
		log.info('compiling from source');

		const builder = new BinBuild()
			.src('https://github.com/tjko/jpegoptim/archive/RELEASE.1.4.4.tar.gz')
			.cmd(`./configure --prefix="${bin.dest()}" --bindir="${bin.dest()}"`)
			.cmd('make install');

		return builder.run(err => {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('jpegoptim built successfully');
		});
	}

	log.success('jpegoptim pre-build test passed successfully');
});
