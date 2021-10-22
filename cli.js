#!/usr/bin/env node
import {spawn} from 'node:child_process';
import process from 'node:process';
import jpegoptim from './index.js';

const input = process.argv.slice(2);

spawn(jpegoptim, input, {stdio: 'inherit'})
	.on('exit', process.exit);
