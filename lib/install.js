import process from 'node:process';
import binBuild from 'bin-build';
import bin from './index.js';

bin.run(['--version']).then(() => {
	console.log('jpegoptim pre-build test passed successfully');
}).catch(async error => {
	console.warn(error.message);
	console.warn('jpegoptim pre-build test failed');
	console.info('compiling from source');

	try {
		await binBuild.url('https://github.com/tjko/jpegoptim/archive/RELEASE.1.4.6.tar.gz', [
			`./configure --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
			'make install',
		]);

		console.log('jpegoptim built successfully');
	} catch (error) {
		console.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});
