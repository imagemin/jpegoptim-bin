# [node-jpegoptim-bin](https://npmjs.org/package/jpegoptim-bin)

[jpegoptim](http://pmt.sourceforge.net/jpegoptim/) Node.js wrapper that optimize JPEG images.

> jpegoptim is a utility for optimizing JPEG files. It provides lossless optimization (based on optimizing the Huffman tables) and "lossy" optimization based on setting a maximum quality factor.

[![Build Status](https://travis-ci.org/1000ch/node-jpegoptim-bin.svg?branch=master)](https://travis-ci.org/1000ch/node-jpegoptim-bin)
[![NPM version](https://badge.fury.io/js/jpegoptim-bin.svg)](http://badge.fury.io/js/jpegoptim-bin)
[![Dependency Status](https://david-dm.org/1000ch/node-jpegoptim-bin.svg)](https://david-dm.org/1000ch/node-jpegoptim-bin)
[![devDependency Status](https://david-dm.org/1000ch/node-jpegoptim-bin/dev-status.svg)](https://david-dm.org/1000ch/node-jpegoptim-bin#info=devDependencies)

## Install

```sh
$ npm install --save jpegoptim-bin
```

## Usage

```js
var execFile = require('child_process').execFile;
var jpegoptim = require('jpegoptim-bin').path;

var args = [
  '--override',
  '--strip-all',
  '--strip-iptc',
  '--strip-icc',
  '--all-progressive',
  'input.jpg'
];

execFile(jpegoptim, args, function (err) {
  if (err) {
    throw err;
  }

  console.log('Image minified');
});
```

## License

This is licensed under BSD.

[jpegoptim](https://github.com/tjko/jpegoptim) is licensed under GNU General Public License.
