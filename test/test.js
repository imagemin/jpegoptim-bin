'use strict';

var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var BinBuild = require('bin-build');
var binCheck = require('bin-check');
var compareSize = require('compare-size');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the jpegoptim binaries', function (t) {
	t.plan(2);

	new BinBuild()
		.src('https://github.com/tjko/jpegoptim/archive/RELEASE.1.4.2.tar.gz')
		.cmd('./configure --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make install')
		.run(function (err) {
			t.assert(!err, err);
			t.assert(fs.statSync(path.join(tmp, 'jpegoptim')).isFile());
		});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(require('../').path, ['--version'], function (err, works) {
		t.assert(!err, err);
		t.assert(works);
	});
});

test('minify a JPG', function (t) {
	t.plan(3);

	var src = path.join(__dirname, 'fixtures/test.jpg');
	var dest = path.join(tmp, 'test.jpg');
	var args = [
		'--strip-all',
		'--all-progressive',
		'--dest=' + tmp,
		src
	];

	execFile(require('../').path, args, function (err) {
		t.assert(!err, err);

		compareSize(src, dest, function (err, res) {
			t.assert(!err, err);
			t.assert(res[dest] < res[src]);
		});
	});
});
