'use strict';

var BinBuild = require('bin-build');
var binVersion = require('bin-version');
var compareSize = require('compare-size');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the jpegoptim binaries', function (t) {
	t.plan(2);

	var version = require('../').version;
	var builder = new BinBuild()
		.src('https://github.com/tjko/jpegoptim/archive/RELEASE.' + version + '.tar.gz')
		.cmd('./configure --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make install')
		.cmd('mv ' + path.join(tmp, 'bin', 'jpegoptim') + ' ' + path.join(tmp, 'jpegoptim'));

	builder.run(function (err) {
		t.assert(!err, err);

		fs.exists(path.join(tmp, 'jpegoptim'), function (exists) {
			t.assert(exists);
		});
	});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binVersion(require('../').path, function (err, version) {
		t.assert(!err, err);
		t.assert(require('../').version === version);
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
