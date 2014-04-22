'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

describe('jpegoptim()', function () {
  this.timeout(0);

  after(function () {
    fs.unlinkSync('test/fixtures/minified.jpg');
  });

  it('should return path to jpegoptim binary', function (callback) {
    var binPath = require('../lib/jpegoptim').path;

    execFile(binPath, ['-h'], function (err, stdout, stderr) {
      assert(stderr.toString().indexOf('jpegoptim') !== -1);
      callback();
    });
  });

  it('should successfully proxy jpegoptim', function (callback) {
    var binPath = path.join(__dirname, '../bin/jpegoptim.js');

    execFile('node', [binPath, '-h'], function (err, stdout, stderr) {
      assert(stderr.toString().indexOf('jpegoptim') !== -1);
      callback();
    });
  });

  it('should minify a .jpg', function (callback) {
    var binPath = path.join(__dirname, '../bin/jpegoptim.js');

    var readStream = fs.createReadStream('test/fixtures/test.jpg');
    readStream.pipe(fs.createWriteStream('test/fixtures/minified.jpg'));

    var args = [
      '--strip-all',
      '--strip-iptc',
      '--strip-icc',
      '--all-progressive',
      path.join(__dirname, 'fixtures', 'minified.jpg')
    ];

    exec('node ' + [binPath].concat(args).join(' '), function () {
      var actual = fs.statSync('test/fixtures/minified.jpg').size;
      var original = fs.statSync('test/fixtures/test.jpg').size;

      assert(actual < original);
      callback();
    });
  });
});