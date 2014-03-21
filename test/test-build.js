'use strict';

var assert = require('assert');
var Bin = require('bin-wrapper');
var fs = require('fs');
var options = require('../lib/jpegoptim').options;
var path = require('path');

describe('jpegoptim.build()', function () {
  it('should rebuild the jpegoptim binaries', function (callback) {
    this.timeout(false);
    var bin = new Bin(options);

    bin.path = path.join(__dirname, '../vendor', bin.bin);
    bin.buildScript = './configure && make && mv ./jpegoptim ' + path.join(__dirname, '../vendor');

    bin.build(function () {
      var origCTime = fs.statSync(bin.path).ctime;
      var actualCTime = fs.statSync(bin.path).ctime;

      assert(actualCTime !== origCTime);
      callback();
    });
  });
});