/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var rm = require('rimraf');

describe('jpegoptim()', function () {
  afterEach(function (callback) {
    rm(path.join(__dirname, 'tmp'), callback);
  });

  beforeEach(function (callback) {
    fs.mkdir(path.join(__dirname, 'tmp'), callback);
  });

  it('should rebuild the jpegoptim binaries', function (callback) {
    var tmp = path.join(__dirname, 'tmp');
    var builder = new BinBuild()
      .src('https://github.com/tjko/jpegoptim/archive/RELEASE.1.3.1.tar.gz')
      .cfg('./configure --prefix="' + tmp + '"')
      .make('make install');

    builder.build(function (error) {
      assert(!error);
      assert(fs.existsSync(path.join(tmp, 'bin/jpegoptim')));
      callback();
    });
  });

  it('should return path to binary and verify that it is working', function (callback) {
      var binPath = require('../').path;

      binCheck(binPath, ['--version'], function (error, works) {
      callback(assert.equal(works, true));
    });
  });

  it('should minify a JPEG', function (callback) {
    var binPath = require('../').path;
    var args = [
      '--strip-all',
      '--all-progressive',
      '--dest=' + path.join(__dirname, 'tmp'),
      path.join(__dirname, 'fixtures/test.jpg')
    ];

    spawn(binPath, args).on('close', function () {
      var src = fs.statSync(path.join(__dirname, 'fixtures/test.jpg')).size;
      var dest = fs.statSync(path.join(__dirname, 'tmp/test.jpg')).size;

      callback(assert(dest < src));
    });
  });
});
