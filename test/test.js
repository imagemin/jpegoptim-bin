'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binBuild = require('bin-build');
const binCheck = require('bin-check');
const compareSize = require('compare-size');
const jpegoptim = require('..');

test('rebuild the jpegoptim binaries', async t => {
	// Skip the test on Windows
	if (process.platform === 'win32') {
		t.pass();
		return;
	}

	const temporary = tempy.directory();
	await binBuild.url('https://github.com/tjko/jpegoptim/archive/RELEASE.1.4.6.tar.gz', [
		`./configure --prefix="${temporary}" --bindir="${temporary}"`,
		'make install'
	]);

	t.true(fs.existsSync(path.join(temporary, 'jpegoptim')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(jpegoptim, ['--version']));
});

test('minify a JPG', async t => {
	const temporary = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.jpg');
	const dest = path.join(temporary, 'test.jpg');
	const args = [
		'--strip-all',
		'--all-progressive',
		'--dest=' + temporary,
		src
	];

	await execa(jpegoptim, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
