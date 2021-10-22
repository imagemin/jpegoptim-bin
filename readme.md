# jpegoptim-bin ![GitHub Actions Status](https://github.com/imagemin/jpegoptim-bin/workflows/test/badge.svg?branch=main)


> [jpegoptim](https://github.com/tjko/jpegoptim) is a utility for optimizing JPEG files that provides lossless optimization (based on optimizing the Huffman tables) and "lossy" optimization based on setting a maximum quality factor

You probably want [`imagemin-jpegoptim`](https://github.com/imagemin/imagemin-jpegoptim) instead.


## Install

```
$ npm install jpegoptim-bin
```

Make sure you have the correct version of libjpeg. See [jpegoptim's README](https://github.com/tjko/jpegoptim#readme) for more information.


## Usage

```js
import {execFile} from 'child_process';
import jpegoptim from 'jpegoptim-bin';

const args = [
	'--overwrite',
	'--strip-all',
	'--strip-iptc',
	'--strip-icc',
	'--all-progressive',
	'--dest=build',
	'input.jpg'
];

execFile(jpegoptim, args, error => {
	console.log('Image minified');
});
```


## CLI

```
$ npm install --global jpegoptim-bin
```

```
$ jpegoptim --help
```


## License

MIT © [Imagemin](https://github.com/imagemin)
