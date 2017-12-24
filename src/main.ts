/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as fs from 'fs-extra';
import * as path from 'path';
import { Component, Document, Page, Resource, Template } from 'stumpfi';
import fromHTML from './io/fromHTML';
import toHTML from './io/toHTML';


export { fromHTML, toHTML };


const document : Document = new Document();
const page : Page = new Page();
const header : Template = new Template('<div>{{SIMPLE_TEXT}}</div>');
const component : Component = new Component();


const r : Resource = new Resource('script');
r.setContent('var j = \'<div>zazad</div>\';');
component.setDimensions({ w: 100, h: 10 });
component.setTemplate(header);
header.addResource(r);
// component.setContentAt(1, content);
page.addComponent(component);
document.addPage(page);
document.addResource(r);
document.addTag('<div>fazfz</div>');
page.addResource(r);
fs.writeFileSync(path.resolve(__dirname, 'test.html'), toHTML(document));
