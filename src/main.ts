/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as fs from 'fs-extra';
import * as path from 'path';
import { Component, Content, ContentTypes, Document, Page, Resource, Template } from 'stumpfi';
import fromHTML from './io/fromHTML';
import toHTML from './io/toHTML';


export { fromHTML, toHTML };


const document : Document = new Document();
const header : Template = new Template('<div class="big_title">{{SIMPLE_TEXT}}</div>');
const p : Template = new Template('<p class="header_text">{{SIMPLE_TEXT}}</p><p class="basic_text">{{SIMPLE_TEXT}}</p>');
const mediumTitle : Template = new Template('<p class="medium_title">{{SIMPLE_TEXT}}</p>');
const basicText : Template = new Template('<p class="basic_text">{{SIMPLE_TEXT}}</p>');
const mainTitle : Template = new Template('<p class="main_title">{{SIMPLE_TEXT}}</p>');
const img : Template = new Template('<img src="{{MEDIA}}" style="max-width: 100%;" />');
const bottomT : Template = new Template('<div style="text-align: center; font-size: 1.1em; color: #A6A6A6;">{{SIMPLE_TEXT}}</div>');
const importantText : Template = new Template('<p class="important_text">{{SIMPLE_TEXT}}</p>');
const res : Resource = new Resource('style');
res.setAttribute('type', 'text/css');
res.setContent('html{background:black;}body{font-family: "Helvetica";padding: 0; margin: 0 auto; background: white;} .main_title{text-align: center; font-weight: bold; font-size: 4em; color: #595959;} .big_title{padding: 0; margin: 0; background: #1ABC9C;color:#FFFFFF;font-size: 4em;font-weight: bold;text-align: center;line-height: 1.5em;} .medium_title{color: #1ABC9C; font-size: 2.6em;font-weight: bold;text-align: center;} .header_text{color: #1ABC9C; text-align: center; font-size: 1.6em;} .basic_text{text-align: justify; font-size: 1.6em;color: #393939;} .important_text{text-align: center; font-size: 1.6em;color: #393939; font-weight: bold}');

const theme : Page = new Page();
theme.addResource(res);
const bottomCont : Content = new Content(ContentTypes.SIMPLE_TEXT, 'Ce document est la propriété de TREEVEA. Toute reproduction même partielle doit faire l\'objet d\'une autorisation.');
const bottom : Component = new Component();
bottom.setTemplate(bottomT);
bottom.setContentAt(0, bottomCont);
bottom.setCoordinates({ x: 0, y: 97 });
bottom.setDimensions({ w: 100, h: 11 });
theme.addComponent(bottom);

const r : Resource = new Resource('style');
r.setAttribute('type', 'text/css');
r.setContent('iframe.stumpfi.page{width: 100vw;height: 100vh;}');
document.addResource(r);


// P1
let page : Page = new Page();
page.setMaster(theme);
let content : Content = new Content(ContentTypes.MEDIA, './image1.png');
let component : Component = new Component();
component.setTemplate(img);
component.setContentAt(0, content);
component.setCoordinates({ x: 22.5, y: 30 });
component.setDimensions({ w: 55, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Création et gestion d\'une entreprise');
component = new Component();
component.setTemplate(mainTitle);
component.setContentAt(0, content);
component.setCoordinates({ x: 0, y: 55 });
component.setDimensions({ w: 100, h: 11 });
page.addComponent(component);
document.addPage(page);


// P3
page = new Page();
page.setMaster(theme);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Équipe');
component = new Component();
component.setCoordinates({ x: 0, y: 0 });
component.setDimensions({ w: 100, h: 11 });
component.setTemplate(header);
component.setContentAt(0, content);
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Constat 1');
component = new Component();
component.setTemplate(p);
component.setContentAt(0, content);
component.setContentAt(1, new Content(ContentTypes.SIMPLE_TEXT, 'En moyenne, 30% du temps des avocats et juristes est passé à la rédaction de contrats. La plus grande partie de ce travail consiste à rechercher et réutiliser des clauses existantes, tâche fastidieuse et sans réelle valeur, qui génère un grand nombre d\'erreurs humaines.'));
component.setDimensions({ w: 75, h: 50 });
component.setCoordinates({ x: 12.5, y: 14 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Constat 2');
component = new Component();
component.setTemplate(p);
component.setContentAt(0, content);
component.setContentAt(1, new Content(ContentTypes.SIMPLE_TEXT, 'La quantité de documents numériques d\'un cabinet ou d\'un service juridique augmente de 60% chaque année. De ce fait, la capitalisation des connaissances et du travail antérieur est un enjeu croissant au fil du temps.'));
component.setDimensions({ w: 75, h: 50 });
component.setCoordinates({ x: 12.5, y: 35 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Constat 3');
component = new Component();
component.setTemplate(p);
component.setContentAt(0, content);
component.setContentAt(1, new Content(ContentTypes.SIMPLE_TEXT, 'Des solutions sur la marché proposent des templates de contrats standards, mais ceux-ci sont trop génériques, et ne répondent pas au besoin des utilisateurs : pouvoir construire des contrats à partir de leur propre base documentaire.'));
component.setDimensions({ w: 75, h: 50 });
component.setCoordinates({ x: 12.5, y: 54 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Conclusion');
component = new Component();
component.setTemplate(p);
component.setContentAt(0, content);
component.setContentAt(1, new Content(ContentTypes.SIMPLE_TEXT, 'Les avocats et juristes ont besoin d\"une solution leur permettant de créer rapidement et simplement des nouveaux contrats, à partir de ceux qu\"ils ont déjà rédigés.'));
component.setDimensions({ w: 75, h: 50 });
component.setCoordinates({ x: 12.5, y: 75 });
page.addComponent(component);
document.addPage(page);


// P5
page = new Page();
page.setMaster(theme);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Problème');
component = new Component();
component.setTemplate(header);
component.setContentAt(0, content);
component.setCoordinates({ x: 0, y: 0 });
component.setDimensions({ w: 100, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Constat 1');
component = new Component();
component.setTemplate(p);
component.setContentAt(0, content);
component.setContentAt(1, new Content(ContentTypes.SIMPLE_TEXT, 'En moyenne, 30% du temps des avocats et juristes est passé à la rédaction de contrats. La plus grande partie de ce travail consiste à rechercher et réutiliser des clauses existantes, tâche fastidieuse et sans réelle valeur, qui génère un grand nombre d\'erreurs humaines.'));
component.setDimensions({ w: 75, h: 50 });
component.setCoordinates({ x: 12.5, y: 14 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Constat 2');
component = new Component();
component.setTemplate(p);
component.setContentAt(0, content);
component.setContentAt(1, new Content(ContentTypes.SIMPLE_TEXT, 'La quantité de documents numériques d\'un cabinet ou d\'un service juridique augmente de 60% chaque année. De ce fait, la capitalisation des connaissances et du travail antérieur est un enjeu croissant au fil du temps.'));
component.setDimensions({ w: 75, h: 50 });
component.setCoordinates({ x: 12.5, y: 35 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Constat 3');
component = new Component();
component.setTemplate(p);
component.setContentAt(0, content);
component.setContentAt(1, new Content(ContentTypes.SIMPLE_TEXT, 'Des solutions sur la marché proposent des templates de contrats standards, mais ceux-ci sont trop génériques, et ne répondent pas au besoin des utilisateurs : pouvoir construire des contrats à partir de leur propre base documentaire.'));
component.setDimensions({ w: 75, h: 50 });
component.setCoordinates({ x: 12.5, y: 54 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Conclusion');
component = new Component();
component.setTemplate(p);
component.setContentAt(0, content);
component.setContentAt(1, new Content(ContentTypes.SIMPLE_TEXT, 'Les avocats et juristes ont besoin d\"une solution leur permettant de créer rapidement et simplement des nouveaux contrats, à partir de ceux qu\"ils ont déjà rédigés.'));
component.setDimensions({ w: 75, h: 50 });
component.setCoordinates({ x: 12.5, y: 75 });
page.addComponent(component);
document.addPage(page);


// P6
page = new Page();
page.setMaster(theme);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Solution');
component = new Component();
component.setTemplate(header);
component.setContentAt(0, content);
component.setCoordinates({ x: 0, y: 0 });
component.setDimensions({ w: 100, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.MEDIA, './image5.png');
component = new Component();
component.setTemplate(img);
component.setContentAt(0, content);
component.setCoordinates({ x: 16, y: 40 });
component.setDimensions({ w: 18, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Assistant digital à la conception de contrats');
component = new Component();
component.setTemplate(mediumTitle);
component.setContentAt(0, content);
component.setCoordinates({ x: 0, y: 23 });
component.setDimensions({ w: 100, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Proposition automatique de templates selon le type de contrat souhaité, en fonction de la base contractuelle existante de l\'utilisateur, et de son travail antérieur.');
component = new Component();
component.setTemplate(basicText);
component.setContentAt(0, content);
component.setCoordinates({ x: 36, y: 47 });
component.setDimensions({ w: 48, h: 11 });
page.addComponent(component);
document.addPage(page);


// P7
page = new Page();
page.setMaster(theme);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Solution');
component = new Component();
component.setTemplate(header);
component.setContentAt(0, content);
component.setCoordinates({ x: 0, y: 0 });
component.setDimensions({ w: 100, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.MEDIA, './image6.PNG');
component = new Component();
// 1px solid #AAAAAA
component.setTemplate(img);
component.setContentAt(0, content);
component.setCoordinates({ x: 10, y: 16 });
component.setDimensions({ w: 80, h: 11 });
page.addComponent(component);
document.addPage(page);


// P8
page = new Page();
page.setMaster(theme);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Solution');
component = new Component();
component.setTemplate(header);
component.setContentAt(0, content);
component.setCoordinates({ x: 0, y: 0 });
component.setDimensions({ w: 100, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.MEDIA, './image7.png');
component = new Component();
// 1px solid #AAAAAA
component.setTemplate(img);
component.setContentAt(0, content);
component.setCoordinates({ x: 10, y: 16 });
component.setDimensions({ w: 80, h: 11 });
page.addComponent(component);
document.addPage(page);


// P9
page = new Page();
page.setMaster(theme);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Solution');
component = new Component();
component.setTemplate(header);
component.setContentAt(0, content);
component.setCoordinates({ x: 0, y: 0 });
component.setDimensions({ w: 100, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.MEDIA, './image8.png');
component = new Component();
// 1px solid #AAAAAA
component.setTemplate(img);
component.setContentAt(0, content);
component.setCoordinates({ x: 10, y: 16 });
component.setDimensions({ w: 80, h: 11 });
page.addComponent(component);
document.addPage(page);


// P10
page = new Page();
page.setMaster(theme);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Solution');
component = new Component();
component.setTemplate(header);
component.setContentAt(0, content);
component.setCoordinates({ x: 0, y: 0 });
component.setDimensions({ w: 100, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.MEDIA, './image9.png');
component = new Component();
// 1px solid #AAAAAA
component.setTemplate(img);
component.setContentAt(0, content);
component.setCoordinates({ x: 10, y: 16 });
component.setDimensions({ w: 80, h: 11 });
page.addComponent(component);
document.addPage(page);


// P12
page = new Page();
page.setMaster(theme);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Démo');
component = new Component();
component.setTemplate(header);
component.setContentAt(0, content);
component.setCoordinates({ x: 0, y: 0 });
component.setDimensions({ w: 100, h: 11 });
// lineHeight: '14em', fontStyle: 'italic' });
page.addComponent(component);
document.addPage(page);


// P13
page = new Page();
page.setMaster(theme);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Marché');
component = new Component();
component.setTemplate(header);
component.setContentAt(0, content);
component.setCoordinates({ x: 0, y: 0 });
component.setDimensions({ w: 100, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, './image10.png');
component = new Component();
component.setTemplate(img);
component.setContentAt(0, content);
component.setCoordinates({ x: 45, y: 15 });
component.setDimensions({ w: 10, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, 'Cibles : Services juridiques et professions réglementées (avocats / juristes)');
component = new Component();
component.setTemplate(importantText);
component.setContentAt(0, content);
component.setCoordinates({ x: 32.5, y: 34 });
component.setDimensions({ w: 35, h: 11 });
page.addComponent(component);
content = new Content(ContentTypes.SIMPLE_TEXT, './image18.png');
component = new Component();
component.setTemplate(img);
component.setContentAt(0, content);
component.setCoordinates({ x: 20, y: 47 });
component.setDimensions({ w: 60, h: 11 });
page.addComponent(component);
document.addPage(page);


fs.writeFileSync(path.resolve(__dirname, 'test.html'), toHTML(document));
