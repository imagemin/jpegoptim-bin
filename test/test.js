import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {execa} from 'execa';
import {temporaryDirectory} from 'tempy';
import binBuild from 'bin-build';
import binCheck from 'bin-check';
import compareSize from 'compare-size';
import jpegoptim from '../index.js';

test('rebuild the jpegoptim binaries', async t => {
	// Skip the test on Windows
	if (process.platform === 'win32') {
		t.pass();
		return;
	}

	const temporary = temporaryDirectory();
	await binBuild.url('https://github.com/tjko/jpegoptim/archive/RELEASE.1.4.6.tar.gz', [
		`./configure --prefix="${temporary}" --bindir="${temporary}"`,
		'make install',
	]);

	t.true(fs.existsSync(path.join(temporary, 'jpegoptim')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(jpegoptim, ['--version']));
});

test('minify a JPG', async t => {
	const temporary = temporaryDirectory();
	const src = fileURLToPath(new URL('fixtures/test.jpg', import.meta.url));
	const dest = path.join(temporary, 'test.jpg');
	const args = [
		'--strip-all',
		'--all-progressive',
		'--dest=' + temporary,
		src,
	];

	await execa(jpegoptim, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
