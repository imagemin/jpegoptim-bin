'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const BinBuild = require('bin-build');
const binCheck = require('bin-check');
const compareSize = require('compare-size');
const jpegoptim = require('..');

test.cb('rebuild the jpegoptim binaries', t => {
	const tmp = tempy.directory();
	new BinBuild()
		.src('https://github.com/tjko/jpegoptim/archive/RELEASE.1.4.4.tar.gz')
		.cmd(`./configure --prefix="${tmp}" --bindir="${tmp}"`)
		.cmd('make install')
		.run(err => {
			t.ifError(err);
			t.true(fs.existsSync(path.join(tmp, 'jpegoptim')));
			t.end();
		});
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(jpegoptim, ['--version']));
});

test('minify a JPG', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.jpg');
	const dest = path.join(tmp, 'test.jpg');
	const args = [
		'--strip-all',
		'--all-progressive',
		'--dest=' + tmp,
		src
	];

	await execa(jpegoptim, args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});
