/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as jest from 'jest-cli';


process.env.NODE_ENV = 'test';

const argv : string[] = process.argv.slice(2);

// We want to run Jest in watch mode and see the code coverage for faster testing.
jest.run(argv);
