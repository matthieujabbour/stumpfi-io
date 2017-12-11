/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/* tslint:disable:no-console */


process.env.NODE_ENV = 'production';


import * as fs from 'fs-extra';
import * as packageJson from '../package.json';
import * as path from 'path';
import * as webpack from 'webpack';
import config from '../config/webpack.config.prod';


const types : string = 'types.d.ts';
const compiler : webpack.Compiler = webpack(config);
const stumpfiRenderer : string = 'stumpfi-renderer.min.js';
const distPath : string = path.resolve(__dirname, '../dist');


// `package.json` content used for distribution.
const distPackageJson : string = JSON.stringify({
  main: `./${packageJson.name}.js`,
  types: `./${types}`,
  name: packageJson.name,
  bugs: packageJson.bugs,
  author: packageJson.author,
  version: packageJson.version,
  engines: packageJson.engines,
  licence: packageJson.licence,
  keywords: packageJson.keywords,
  homepage: packageJson.homepage,
  repository: packageJson.repository,
  description: packageJson.description,
  contributors: packageJson.contributors,
  dependencies: packageJson.dependencies,
});


// Removing existing `dist` directory...
fs.remove(distPath)
// Running webpack compiler...
.then(() => new Promise<webpack.Stats>((resolve, reject) => {
  compiler.run((error, stats) => (error ? reject(error) : resolve(stats)));
}))
// Displaying webpack compilation stats...
.then((stats) => {
  if (stats.hasErrors()) throw new Error(stats.toJson().errors);
  console.log(stats.toString('normal'));
})
// Writing distributable `package.json` and `types.d.ts` files into `dist` directory...
.then(() => fs.writeFileSync(path.join(distPath, 'package.json'), distPackageJson))
.then(() => fs.copySync(path.resolve(__dirname, `../src/${types}`), path.join(distPath, types)))
// Writing `stumpfi-renderer` minified script into `dist` directory...
.then(() => fs.copySync(
  path.resolve(__dirname, `../src/renderer/${stumpfiRenderer}`),
  path.join(distPath, stumpfiRenderer),
))
// All went well...
.then(() => {
  console.log('DONE.');
})
// If any error occurs...
.catch((error) => {
  console.error(error);
});
