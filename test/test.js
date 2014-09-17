'use strict';

var bin = require('../lib');
var BinBuild = require('bin-build');
var binVersion = require('bin-version');
var execFile = require('child_process').execFile;
var fs = require('fs');
var mkdir = require('mkdirp');
var path = require('path');
var rm = require('rimraf');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the jpegoptim binaries', function (t) {
	t.plan(3);

	var builder = new BinBuild()
		.src('https://github.com/tjko/jpegoptim/archive/RELEASE.' + bin.v + '.tar.gz')
		.cmd('./configure --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make install')
		.cmd('mv ' + path.join(tmp, 'bin/' + bin.use()) + ' ' + path.join(tmp, bin.use()));

	builder.build(function (err) {
		t.assert(!err);

		fs.exists(path.join(tmp, bin.use()), function (exists) {
			t.assert(exists);

			rm(tmp, function (err) {
				t.assert(!err);
			});
		});
	});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binVersion(require('../').path, function (err, version) {
		t.assert(!err);
		t.assert(bin.v);
	});
});

test('minify a JPG', function (t) {
	t.plan(6);

	var args = [
		'--strip-all',
		'--all-progressive',
		'--dest=' + path.join(__dirname, 'tmp'),
		path.join(__dirname, 'fixtures/test.jpg')
	];

	mkdir(tmp, function (err) {
		t.assert(!err);

		execFile(require('../').path, args, function (err) {
			t.assert(!err);

			fs.stat(path.join(__dirname, 'fixtures/test.jpg'), function (err, a) {
				t.assert(!err);

				fs.stat(path.join(tmp, 'test.jpg'), function (err, b) {
					t.assert(!err);
					t.assert(b.size < a.size);

					rm(tmp, function (err) {
						t.assert(!err);
					});
				});
			});
		});
	});
});
