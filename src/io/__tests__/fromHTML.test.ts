/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { Component, Content, ContentTypes, Document, Page, Resource, Template } from 'stumpfi';
import fromHTML from '../fromHTML';


jest.mock('stumpfi');


describe('fromHTML', () => {
  test('should throw an error when the string is not a valid HTML', () => {
    expect(() => fromHTML('invalidHTML')).toThrowError();
  });
  test('should throw an error when the string is not a valid HTML stumpfi document', () => {
    expect(() => fromHTML('<html><head><title>test name</title><meta charSet="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="test description" /><meta name="keywords" content="tag1 tag2" /><meta name="author" content="author1, author2" /><script type="text/javascript" src="data:text/javascript;base64,data:text/javascript;base64,LyoqIENvcHlyaWdodCAyMDE2IC0gcHJlc2VudCwgTWF0dGhpZXUgSmFiYm91ciA8bWF0dGhpZXUuamFiYm91ckBnbWFpbC5jb20+LiBBbGwgcmlnaHRzIHJlc2VydmVkLiAqLwp3aW5kb3cub25sb2FkPWZ1bmN0aW9uKCl7Y29uc3QgYT1KU09OLnBhcnNlKGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwpO2xldCBiPSExO2NvbnN0IGM9aD0+aC5yZXBsYWNlKC8oW0EtWl0pL2csJy0kMScpLnRvTG93ZXJDYXNlKCksZD1oPT57Y29uc3QgaT1oLmF0dHJpYnV0ZXMsaj1PYmplY3Qua2V5cyhpKS5yZWR1Y2UoKGssbCk9PidzdHJpbmcnPT10eXBlb2YgaVtsXT9gJHtrfSAke2MobCl9PSIke2lbbF19ImA6YCR7a30gJHtjKGwpfWAsJycpLnRyaW0oKTtzd2l0Y2goaC50eXBlKXtjYXNlJ3N0eWxlJzpyZXR1cm5gPHN0eWxlICR7an0+JHtoLmNvbnRlbnR8fCcnfTwvc3R5bGU+YDtjYXNlJ3NjcmlwdCc6cmV0dXJuYDxzY3JpcHQgJHtqfT4ke2guY29udGVudHx8Jyd9PC9zY3JpcHQ+YDtkZWZhdWx0OnJldHVybmA8bGluayAke2p9IC8+YDt9fSxlPWg9Pntjb25zdCBpPWBwb3NpdGlvbjogYWJzb2x1dGU7YCtgd2lkdGg6ICR7aC5kaW1lbnNpb25zLnd9JTtgK2BoZWlnaHQ6ICR7aC5kaW1lbnNpb25zLmh9JTtgK2B0b3A6ICR7aC5jb29yZGluYXRlcy55fSU7YCtgbGVmdDogJHtoLmNvb3JkaW5hdGVzLnh9JTtgLGs9YS50ZW1wbGF0ZXNbaC50ZW1wbGF0ZV0sbD1rLmNvZGUucmVwbGFjZSgvXHtceyhSSUNIX1RFWFR8U0lNUExFX1RFWFR8TUVESUEpXH1cfS9nLChtLG4sbyk9PntyZXR1cm4gbiE9PWEuY29udGVudHNbaC5jb250ZW50c1tvXV0udHlwZSYmKGNvbnNvbGUud2FybihgQ29udGVudCAjJHtoLmNvbnRlbnRzW29dfSdzIHR5cGUgaXMgbm90IGNvbXBhdGlibGUgd2l0aCAke259LmApLGI9ITApLGEuY29udGVudHNbaC5jb250ZW50c1tvXV0ubWFya3VwVGV4dH0pO3JldHVybmA8ZGl2IHN0eWxlPSIke2l9Ij4ke2x9PC9kaXY+YH0sZj1oPT57Y29uc3QgaT1bXSxqPVtdO2oudW5zaGlmdChkKHt0YWdOYW1lOidzY3JpcHQnLGNvbnRlbnQ6J2Z1bmN0aW9uIHNjYWxlKCkge2NvbnN0IGZvbnRTaXplID0gTWF0aC5taW4oMTYvOSAqIHdpbmRvdy5pbm5lckhlaWdodCAvIDEwMCwgd2luZG93LmlubmVyV2lkdGggLyAxMDApO2RvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7fXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwncmVzaXplXCcsIHNjYWxlKTsgd2luZG93Lm9ubG9hZCA9IHNjYWxlOycsYXR0cmlidXRlczp7dHlwZTondGV4dC9qYXZhc2NyaXB0JywnZGF0YS1kZWZhdWx0JzohMH19KSksai51bnNoaWZ0KGQoe3RhZ05hbWU6J3N0eWxlJyxjb250ZW50OidkaXZbZGF0YS1jb21wb25lbnQtaWRde292ZXJmbG93OiBhdXRvOyBwb3NpdGlvbjogYWJzb2x1dGU7fWJvZHl7d2lkdGg6IGNhbGMoMTYvOSAqIDEwMHZoKTsgaGVpZ2h0OiBjYWxjKDkvMTYgKiAxMDB2dyk7IG1heC13aWR0aDogMTAwdnc7bWF4LWhlaWdodDogMTAwdmg7IHBvc2l0aW9uOiByZWxhdGl2ZTsgbWFyZ2luOiAwO30nLGF0dHJpYnV0ZXM6e3R5cGU6J3RleHQvY3NzJywnZGF0YS1kZWZhdWx0JzohMH19KSk7Zm9yKGxldCBrPWg7bnVsbCE9PWs7KWsucmVzb3VyY2VzLmZvckVhY2gobT0+e2oudW5zaGlmdChkKG0pKX0pLGsuY29tcG9uZW50cy5mb3JFYWNoKG09PntpLnVuc2hpZnQoZShhLmNvbXBvbmVudHNbbV0pKX0pLGs9bnVsbD09PWsubWFzdGVyP251bGw6YS5wYWdlc1trLm1hc3Rlcl07Y29uc3QgbD1gPCFET0NUWVBFIGh0bWw+YCtgPGh0bWw+YCtgPGhlYWQ+YCtgJHtqLmpvaW4oJycpfWArYDwvaGVhZD5gK2A8Ym9keT5gK2Ake2kuam9pbignJyl9YCtgPC9ib2R5PmArYDwvaHRtbD5gO3JldHVybmA8aWZyYW1lIHNyY0RvYz0iJHtsLnJlcGxhY2UoL1wiL2csJyZxdW90OycpfSIgY2xhc3M9InN0dW1wZmkgcGFnZSIgLz5gfTtsZXQgZz0nJztPYmplY3Qua2V5cyhhLmRvY3VtZW50cykuZm9yRWFjaChoPT57YS5kb2N1bWVudHNbaF0ucGFnZXMuZm9yRWFjaChpPT57Zys9ZihhLnBhZ2VzW2ldKX0pLGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MPWd9KSwhMD09YiYmY29uc29sZS5lcnJvcignT25lIG9yIG1hbnkgZXJyb3JzIG9jY3VyZWQgZHVyaW5nIGRvY3VtZW50IHJlbmRlcmluZy4gVGhpcyBtYXkgYWZmZWN0IGRpc3BsYXlpbmcuJyl9Ow=="></script><link charset="UTF-8" bool-attribute /><style charset="UTF-8">body { background: blue; }</style><script bool-attribute>var p = 2;</script><style ></style><script ></script><style type="text/css">.stumpfi.page{border: none;}</style><noscript>The document cannot be rendered because Javascript is currently not enabled on your browser.</noscript></head><body><div style="display: none;">{invalidDocument}</div></body></html>'))
    .toThrowError();
  });
  test('should correctly generate a stumpfi Document from an HTML string', () => {
    const document : Document = new Document();
    const resource : Resource = new Resource('script');
    const component : Component = new Component();
    const page : Page = new Page();
    const content : Content = new Content(ContentTypes.SIMPLE_TEXT);
    const template : Template = new Template('');
    Page.mockClear();
    Document.mockClear();
    Resource.mockClear();
    Component.mockClear();
    Content.mockClear();
    Template.mockClear();
    fromHTML('<html><head><title>test name</title><meta charSet=\\"UTF-8\\" /><meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" /><meta name=\\"description\\" content=\\"test description\\" /><meta name=\\"keywords\\" content=\\"tag1 tag2\\" /><meta name=\\"author\\" content=\\"author1, author2\\" /><script type=\\"text/javascript\\" src=\\"data:text/javascript;base64,data:text/javascript;base64,LyoqIENvcHlyaWdodCAyMDE2IC0gcHJlc2VudCwgTWF0dGhpZXUgSmFiYm91ciA8bWF0dGhpZXUuamFiYm91ckBnbWFpbC5jb20+LiBBbGwgcmlnaHRzIHJlc2VydmVkLiAqLwp3aW5kb3cub25sb2FkPWZ1bmN0aW9uKCl7Y29uc3QgYT1KU09OLnBhcnNlKGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwpO2xldCBiPSExO2NvbnN0IGM9aD0+aC5yZXBsYWNlKC8oW0EtWl0pL2csJy0kMScpLnRvTG93ZXJDYXNlKCksZD1oPT57Y29uc3QgaT1oLmF0dHJpYnV0ZXMsaj1PYmplY3Qua2V5cyhpKS5yZWR1Y2UoKGssbCk9PidzdHJpbmcnPT10eXBlb2YgaVtsXT9gJHtrfSAke2MobCl9PSIke2lbbF19ImA6YCR7a30gJHtjKGwpfWAsJycpLnRyaW0oKTtzd2l0Y2goaC50eXBlKXtjYXNlJ3N0eWxlJzpyZXR1cm5gPHN0eWxlICR7an0+JHtoLmNvbnRlbnR8fCcnfTwvc3R5bGU+YDtjYXNlJ3NjcmlwdCc6cmV0dXJuYDxzY3JpcHQgJHtqfT4ke2guY29udGVudHx8Jyd9PC9zY3JpcHQ+YDtkZWZhdWx0OnJldHVybmA8bGluayAke2p9IC8+YDt9fSxlPWg9Pntjb25zdCBpPWBwb3NpdGlvbjogYWJzb2x1dGU7YCtgd2lkdGg6ICR7aC5kaW1lbnNpb25zLnd9JTtgK2BoZWlnaHQ6ICR7aC5kaW1lbnNpb25zLmh9JTtgK2B0b3A6ICR7aC5jb29yZGluYXRlcy55fSU7YCtgbGVmdDogJHtoLmNvb3JkaW5hdGVzLnh9JTtgLGs9YS50ZW1wbGF0ZXNbaC50ZW1wbGF0ZV0sbD1rLmNvZGUucmVwbGFjZSgvXHtceyhSSUNIX1RFWFR8U0lNUExFX1RFWFR8TUVESUEpXH1cfS9nLChtLG4sbyk9PntyZXR1cm4gbiE9PWEuY29udGVudHNbaC5jb250ZW50c1tvXV0udHlwZSYmKGNvbnNvbGUud2FybihgQ29udGVudCAjJHtoLmNvbnRlbnRzW29dfSdzIHR5cGUgaXMgbm90IGNvbXBhdGlibGUgd2l0aCAke259LmApLGI9ITApLGEuY29udGVudHNbaC5jb250ZW50c1tvXV0ubWFya3VwVGV4dH0pO3JldHVybmA8ZGl2IHN0eWxlPSIke2l9Ij4ke2x9PC9kaXY+YH0sZj1oPT57Y29uc3QgaT1bXSxqPVtdO2oudW5zaGlmdChkKHt0YWdOYW1lOidzY3JpcHQnLGNvbnRlbnQ6J2Z1bmN0aW9uIHNjYWxlKCkge2NvbnN0IGZvbnRTaXplID0gTWF0aC5taW4oMTYvOSAqIHdpbmRvdy5pbm5lckhlaWdodCAvIDEwMCwgd2luZG93LmlubmVyV2lkdGggLyAxMDApO2RvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7fXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwncmVzaXplXCcsIHNjYWxlKTsgd2luZG93Lm9ubG9hZCA9IHNjYWxlOycsYXR0cmlidXRlczp7dHlwZTondGV4dC9qYXZhc2NyaXB0JywnZGF0YS1kZWZhdWx0JzohMH19KSksai51bnNoaWZ0KGQoe3RhZ05hbWU6J3N0eWxlJyxjb250ZW50OidkaXZbZGF0YS1jb21wb25lbnQtaWRde292ZXJmbG93OiBhdXRvOyBwb3NpdGlvbjogYWJzb2x1dGU7fWJvZHl7d2lkdGg6IGNhbGMoMTYvOSAqIDEwMHZoKTsgaGVpZ2h0OiBjYWxjKDkvMTYgKiAxMDB2dyk7IG1heC13aWR0aDogMTAwdnc7bWF4LWhlaWdodDogMTAwdmg7IHBvc2l0aW9uOiByZWxhdGl2ZTsgbWFyZ2luOiAwO30nLGF0dHJpYnV0ZXM6e3R5cGU6J3RleHQvY3NzJywnZGF0YS1kZWZhdWx0JzohMH19KSk7Zm9yKGxldCBrPWg7bnVsbCE9PWs7KWsucmVzb3VyY2VzLmZvckVhY2gobT0+e2oudW5zaGlmdChkKG0pKX0pLGsuY29tcG9uZW50cy5mb3JFYWNoKG09PntpLnVuc2hpZnQoZShhLmNvbXBvbmVudHNbbV0pKX0pLGs9bnVsbD09PWsubWFzdGVyP251bGw6YS5wYWdlc1trLm1hc3Rlcl07Y29uc3QgbD1gPCFET0NUWVBFIGh0bWw+YCtgPGh0bWw+YCtgPGhlYWQ+YCtgJHtqLmpvaW4oJycpfWArYDwvaGVhZD5gK2A8Ym9keT5gK2Ake2kuam9pbignJyl9YCtgPC9ib2R5PmArYDwvaHRtbD5gO3JldHVybmA8aWZyYW1lIHNyY0RvYz0iJHtsLnJlcGxhY2UoL1wiL2csJyZxdW90OycpfSIgY2xhc3M9InN0dW1wZmkgcGFnZSIgLz5gfTtsZXQgZz0nJztPYmplY3Qua2V5cyhhLmRvY3VtZW50cykuZm9yRWFjaChoPT57YS5kb2N1bWVudHNbaF0ucGFnZXMuZm9yRWFjaChpPT57Zys9ZihhLnBhZ2VzW2ldKX0pLGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MPWd9KSwhMD09YiYmY29uc29sZS5lcnJvcignT25lIG9yIG1hbnkgZXJyb3JzIG9jY3VyZWQgZHVyaW5nIGRvY3VtZW50IHJlbmRlcmluZy4gVGhpcyBtYXkgYWZmZWN0IGRpc3BsYXlpbmcuJyl9Ow==\\"></script><link charset=\\"UTF-8\\" bool-attribute /><style charset=\\"UTF-8\\">body { background: blue; }</style><script >var p = 2;</script><style ></style><script ></script><style type=\\"text/css\\">.stumpfi.page{border: none;}</style><noscript>The document cannot be rendered because Javascript is currently not enabled on your browser.</noscript></head><body><div style=\\"display: none;\\">{&quot;documents&quot;:{&quot;document1&quot;:{&quot;resources&quot;:[&quot;resource1&quot;,&quot;resource2&quot;,&quot;resource3&quot;,&quot;resource4&quot;,&quot;resource5&quot;],&quot;name&quot;:&quot;test name&quot;,&quot;description&quot;:&quot;test description&quot;,&quot;tags&quot;:[&quot;tag1&quot;,&quot;tag2&quot;],&quot;authors&quot;:[&quot;author1&quot;,&quot;author2&quot;],&quot;pages&quot;:[&quot;page2&quot;,&quot;page2&quot;,&quot;page3&quot;]}},&quot;pages&quot;:{&quot;page1&quot;:{&quot;resources&quot;:[&quot;resource1&quot;],&quot;master&quot;:null,&quot;components&quot;:[&quot;component1&quot;]},&quot;page2&quot;:{&quot;resources&quot;:[&quot;resource2&quot;],&quot;master&quot;:&quot;page1&quot;,&quot;components&quot;:[&quot;component2&quot;]},&quot;page3&quot;:{&quot;resources&quot;:[],&quot;master&quot;:null,&quot;components&quot;:[&quot;component2&quot;]}},&quot;resources&quot;:{&quot;resource1&quot;:{&quot;type&quot;:&quot;link&quot;,&quot;content&quot;:&quot;&quot;,&quot;attributes&quot;:{&quot;charset&quot;:&quot;UTF-8&quot;,&quot;boolAttribute&quot;:true}},&quot;resource2&quot;:{&quot;type&quot;:&quot;style&quot;,&quot;content&quot;:&quot;body { background: blue; }&quot;,&quot;attributes&quot;:{&quot;charset&quot;:&quot;UTF-8&quot;}},&quot;resource3&quot;:{&quot;type&quot;:&quot;script&quot;,&quot;content&quot;:&quot;var p = 2;&quot;,&quot;attributes&quot;:{&quot;boolAttribute&quot;:false}},&quot;resource4&quot;:{&quot;type&quot;:&quot;style&quot;,&quot;content&quot;:null,&quot;attributes&quot;:{}},&quot;resource5&quot;:{&quot;type&quot;:&quot;script&quot;,&quot;content&quot;:null,&quot;attributes&quot;:{}}},&quot;components&quot;:{&quot;component1&quot;:{&quot;contents&quot;:[&quot;content1&quot;,null,null,&quot;content2&quot;],&quot;coordinates&quot;:{&quot;x&quot;:50,&quot;y&quot;:64},&quot;dimensions&quot;:{&quot;w&quot;:12,&quot;h&quot;:7},&quot;template&quot;:&quot;template1&quot;},&quot;component2&quot;:{&quot;contents&quot;:[null,&quot;content1&quot;],&quot;coordinates&quot;:{&quot;x&quot;:32,&quot;y&quot;:21},&quot;dimensions&quot;:{&quot;w&quot;:85,&quot;h&quot;:65},&quot;template&quot;:&quot;template1&quot;}},&quot;contents&quot;:{&quot;content1&quot;:{&quot;type&quot;:&quot;RICH_TEXT&quot;,&quot;markupText&quot;:&quot;test content 1&quot;},&quot;content2&quot;:{&quot;type&quot;:&quot;SIMPLE_TEXT&quot;,&quot;markupText&quot;:&quot;test content 2&quot;}},&quot;templates&quot;:{&quot;template1&quot;:{&quot;resources&quot;:[&quot;resource3&quot;],&quot;code&quot;:&quot;&lt;p&gt;{{RICH_TEXT}}&lt;/p&gt;&lt;ul&gt;&lt;li&gt;{{SIMPLE_TEXT}}&lt;/li&gt;&lt;/ul&gt;&quot;}}}</div></body></html>');
    expect(Document).toHaveBeenCalledTimes(1);
    expect(Document).toHaveBeenCalledWith('test name', 'test description');
    expect(document.addAuthor).toHaveBeenCalledTimes(2);
    expect(document.addAuthor).toHaveBeenCalledWith('author1');
    expect(document.addAuthor).toHaveBeenCalledWith('author2');
    expect(document.addTag).toHaveBeenCalledTimes(2);
    expect(document.addTag).toHaveBeenCalledWith('tag1');
    expect(document.addTag).toHaveBeenCalledWith('tag2');
    expect(document.addResource).toHaveBeenCalledTimes(5);
    expect(document.addPage).toHaveBeenCalledTimes(3);
    expect(Resource).toHaveBeenCalledTimes(5);
    expect(Resource).toHaveBeenCalledWith('link');
    expect(Resource).toHaveBeenCalledWith('script');
    expect(Resource).toHaveBeenCalledWith('style');
    expect(resource.setContent).toHaveBeenCalledTimes(3);
    expect(resource.setContent).toHaveBeenCalledWith('');
    expect(resource.setContent).toHaveBeenCalledWith('body { background: blue; }');
    expect(resource.setContent).toHaveBeenCalledWith('var p = 2;');
    expect(resource.setAttribute).toHaveBeenCalledTimes(4);
    expect(resource.setAttribute).toHaveBeenCalledWith('charset', 'UTF-8');
    expect(resource.setAttribute).toHaveBeenCalledWith('boolAttribute', true);
    expect(resource.setAttribute).toHaveBeenCalledWith('boolAttribute', false);
    expect(Page).toHaveBeenCalledTimes(3);
    expect(page.setMaster).toHaveBeenCalledTimes(1);
    expect(page.setMaster).toHaveBeenCalledWith(page);
    expect(page.addResource).toHaveBeenCalledTimes(2);
    expect(page.addResource).toHaveBeenCalledWith(resource);
    expect(page.addComponent).toHaveBeenCalledTimes(3);
    expect(page.addComponent).toHaveBeenCalledWith(component);
    expect(Component).toHaveBeenCalledTimes(2);
    expect(component.setCoordinates).toHaveBeenCalledTimes(2);
    expect(component.setCoordinates).toHaveBeenCalledWith({ x: 32, y: 21 });
    expect(component.setCoordinates).toHaveBeenCalledWith({ x: 50, y: 64 });
    expect(component.setDimensions).toHaveBeenCalledTimes(2);
    expect(component.setDimensions).toHaveBeenCalledWith({ h: 65, w: 85 });
    expect(component.setDimensions).toHaveBeenCalledWith({ h: 7, w: 12 });
    expect(component.setTemplate).toHaveBeenCalledTimes(2);
    expect(component.setTemplate).toHaveBeenCalledWith(template);
    expect(Template).toHaveBeenCalledTimes(1);
    expect(Template).toHaveBeenCalledWith('<p>{{RICH_TEXT}}</p><ul><li>{{SIMPLE_TEXT}}</li></ul>');
    expect(template.addResource).toHaveBeenCalledTimes(1);
    expect(template.addResource).toHaveBeenCalledWith(resource);
    expect(component.setContentAt).toHaveBeenCalledTimes(3);
    expect(component.setContentAt).toHaveBeenCalledWith(0, content);
    expect(component.setContentAt).toHaveBeenCalledWith(1, content);
    expect(component.setContentAt).toHaveBeenCalledWith(3, content);
    expect(Content).toHaveBeenCalledTimes(2);
    expect(Content).toHaveBeenCalledWith('RICH_TEXT', 'test content 1');
    expect(Content).toHaveBeenCalledWith('SIMPLE_TEXT', 'test content 2');
  });
});
