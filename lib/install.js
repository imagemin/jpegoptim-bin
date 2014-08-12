'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var logSymbols = require('log-symbols');
var path = require('path');

/**
 * Install binary and check whether it works.
 * If the test fails, try to build it.
 */

bin.run(['--version'], function (err) {
  if (err) {
    console.log(logSymbols.warning + ' pre-build test failed, compiling from source...');

    var builder = new BinBuild()
      .src('https://github.com/tjko/jpegoptim/archive/RELEASE.' + bin.v + '.tar.gz')
      .cmd('./configure --prefix="' + bin.dest() + '" --bindir="' + bin.dest() + '"')
      .cmd('make install')
      .cmd('mv ' + path.join(bin.dest(), 'bin', bin.use()) + ' ' + bin.path());

    return builder.build(function (err) {
      if (err) {
        return console.log(logSymbols.error, err);
      }

      console.log(logSymbols.success + ' jpegoptim built successfully!');
    });
  }

  console.log(logSymbols.success + ' pre-build test passed successfully!');
});
