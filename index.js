'use strict';

var BinBuild = require('bin-build');
var BinWrapper = require('bin-wrapper');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper()
  .src('https://raw.github.com/1000ch/node-jpegoptim-bin/master/vendor/osx/jpegoptim', 'darwin')
  .src('https://raw.github.com/1000ch/node-jpegoptim-bin/master/vendor/linux/jpegoptim', 'linux')
  .dest(path.join(__dirname, 'vendor'))
  .use('jpegoptim');

/**
 * Only run check if binary doesn't already exist
 */

fs.exists(bin.use(), function (exists) {
  if (!exists) {
    bin.run(['--version'], function (err) {
      if (err) {
        console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

        var builder = new BinBuild()
          .src('https://github.com/tjko/jpegoptim/archive/RELEASE.1.3.1.tar.gz')
          .cfg('./configure --prefix="' + bin.dest() + '" --bindir="' + bin.dest() + '"')
          .make('make install');

        return builder.build(function (err) {
          if (err) {
            return console.log(chalk.red('✗ ' + err));
          }

          bin.use('bin/jpegoptim');
          console.log(chalk.green('✓ jpegoptim built successfully'));
        });
      }

      console.log(chalk.green('✓ pre-build test passed successfully'));
    });
  }
});

/**
 * Module exports
 */

module.exports.path = bin.use();
