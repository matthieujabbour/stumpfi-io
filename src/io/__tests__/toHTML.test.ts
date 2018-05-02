/**
 * Copyright 2017 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { Document } from 'stumpfi';
import toHTML from '../toHTML';


jest.mock('fs-extra');
jest.mock('path');
jest.mock('stumpfi');


describe('toHTML', () => {
  test('should correctly export a stumpfi Document', () => {
    expect(toHTML(new Document())).toMatchSnapshot();
  });
});
