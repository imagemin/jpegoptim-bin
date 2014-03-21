'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
  name: 'jpegoptim',
  bin: 'jpegoptim',
  path: path.join(__dirname, '../vendor'),
  url: 'https://raw.github.com/1000ch/node-jpegoptim-bin/master/vendor/jpegoptim',
  src: 'https://github.com/tjko/jpegoptim/archive/RELEASE.1.3.0.tar.gz',
  buildScript: './configure && make && mv ./jpegoptim ' + path.join(__dirname, '../vendor'),
  platform: {
    osx: {
      url: 'https://raw.github.com/1000ch/node-jpegoptim-bin/master/vendor/osx/pngcrush'
    },
    linux: {
      url: 'https://raw.github.com/1000ch/node-jpegoptim-bin/master/vendor/linux/pngcrush'
    }
  }
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;