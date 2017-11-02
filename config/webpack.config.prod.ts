/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as packageJson from '../package.json';
import * as path from 'path';
import * as webpack from 'webpack';


// Used to specify to webpack that we only want to consider the files in `src` directory.
const src : string = path.resolve(__dirname, '../src');


// webpack's production configuration.
const productionConfig : webpack.Configuration = {
  target: 'node',
  bail: true,
  cache: false,
  context: src,
  node: {
    __dirname: false,
  },
  entry: { [packageJson.name]: './main.ts' },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    pathinfo: false,
    library: packageJson.name,
    libraryTarget: 'commonjs2',
  },
  externals: Object.keys(packageJson.dependencies).reduce(
    (externals, dependency) => Object.assign(externals, { [dependency]: dependency }),
    {},
  ),
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '*', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [src],
        use: [
          // `awesome-typescript-loader` is then used, to compile Typescript into Javascript.
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
            },
          },
          // `tslint-loader` is first used, to lint the code.
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true,
              failOnHint: true,
              typeCheck: true,
            },
          },
        ],
      },
      {
        test: /\.json$/,
        include: [src],
        use: [{ loader: 'json-loader' }],
      },
    ],
  },
  plugins: [
    // Handles errors more cleanly and prevents Webpack from outputting anything into a bundle.
    new webpack.NoEmitOnErrorsPlugin(),
    // Makes some environment variables available to the JS code.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: false,
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      comments: false,
    }),
  ],
};


export default productionConfig;
