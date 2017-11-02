/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


 /** This declaration is necessary to run jest CLI from a file. */
 declare module 'jest-cli' {
  export function run(argv: string[]): void;
}


/** This declaration is necessary to import JSON files into TypeScript files. */
declare module '*.json';


/** JSON type definition. */
type basic = string | number | boolean | null | object;
interface JsonArray extends Array<basic | JsonObject | JsonArray> {}
interface JsonObject { [x: string]: basic | JsonObject | JsonArray; }
type Json = basic | JsonObject | JsonArray;
