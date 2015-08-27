/*global afterEach,beforeEach,it*/
'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var BinBuild = require('bin-build');
var binCheck = require('bin-check');
var compareSize = require('compare-size');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var tmp = path.join(__dirname, 'tmp');

beforeEach(function () {
	mkdirp.sync(tmp);
});

afterEach(function () {
	rimraf.sync(tmp);
});

it('rebuild the jpegoptim binaries', function (cb) {
	new BinBuild()
		.src('https://github.com/tjko/jpegoptim/archive/RELEASE.1.4.3.tar.gz')
		.cmd('./configure --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make install')
		.run(function (err) {
			assert(!err);
			assert(fs.statSync(path.join(tmp, 'jpegoptim')).isFile());
			cb();
		});
});

it('return path to binary and verify that it is working', function (cb) {
	binCheck(require('../'), ['--version'], function (err, works) {
		assert(!err);
		assert(works);
		cb();
	});
});

it('minify a JPG', function (cb) {
	var src = path.join(__dirname, 'fixtures/test.jpg');
	var dest = path.join(tmp, 'test.jpg');
	var args = [
		'--strip-all',
		'--all-progressive',
		'--dest=' + tmp,
		src
	];

	execFile(require('../'), args, function (err) {
		assert(!err);

		compareSize(src, dest, function (err, res) {
			assert(!err);
			assert(res[dest] < res[src]);
			cb();
		});
	});
});
