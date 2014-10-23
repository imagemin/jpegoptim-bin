# jpegoptim-bin [![Build Status](http://img.shields.io/travis/imagemin/jpegoptim-bin.svg?style=flat)](http://travis-ci.org/imagemin/jpegoptim-bin)

> jpegoptim is a utility for optimizing JPEG files that provides lossless optimization (based on optimizing the Huffman tables) and "lossy" optimization based on setting a maximum quality factor


## Install

```sh
$ npm install --save jpegoptim-bin
```


## Usage

```js
var execFile = require('child_process').execFile;
var jpegOptim = require('jpegoptim-bin').path;

var args = [
	'--override',
	'--strip-all',
	'--strip-iptc',
	'--strip-icc',
	'--all-progressive',
	'--dest=build'
	'input.jpg'
];

execFile(jpegOptim, args, function (err) {
	if (err) {
		throw err;
	}

	console.log('Image minified');
});
```


## CLI

```sh
$ npm install --global jpegoptim-bin
```

```sh
$ jpegoptim --help
```


## License

MIT © [imagemin](https://github.com/imagemin)
