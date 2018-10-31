#!/usr/bin/env node
'use strict';
const {spawn} = require('child_process');
const jpegoptim = require('.');

const input = process.argv.slice(2);

spawn(jpegoptim, input, {stdio: 'inherit'})
	.on('exit', process.exit);
