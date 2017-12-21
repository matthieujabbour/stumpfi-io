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
    fromHTML('<html><head><title>test name</title><meta charSet="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="test description" /><meta name="keywords" content="tag1 tag2" /><meta name="author" content="author1, author2" /><script type="text/javascript" src="data:text/javascript;base64,data:text/javascript;base64,LyoqIENvcHlyaWdodCAyMDE2IC0gcHJlc2VudCwgTWF0dGhpZXUgSmFiYm91ciA8bWF0dGhpZXUuamFiYm91ckBnbWFpbC5jb20+LiBBbGwgcmlnaHRzIHJlc2VydmVkLiAqLwp3aW5kb3cub25sb2FkPWZ1bmN0aW9uKCl7Y29uc3QgYT1KU09OLnBhcnNlKGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXS5pbm5lckhUTUwpO2xldCBiPSExO2NvbnN0IGM9aD0+aC5yZXBsYWNlKC8oW0EtWl0pL2csJy0kMScpLnRvTG93ZXJDYXNlKCksZD1oPT57Y29uc3QgaT1oLmF0dHJpYnV0ZXMsaj1PYmplY3Qua2V5cyhpKS5yZWR1Y2UoKGssbCk9PidzdHJpbmcnPT10eXBlb2YgaVtsXT9gJHtrfSAke2MobCl9PSIke2lbbF19ImA6YCR7a30gJHtjKGwpfWAsJycpLnRyaW0oKTtzd2l0Y2goaC50eXBlKXtjYXNlJ3N0eWxlJzpyZXR1cm5gPHN0eWxlICR7an0+JHtoLmNvbnRlbnR8fCcnfTwvc3R5bGU+YDtjYXNlJ3NjcmlwdCc6cmV0dXJuYDxzY3JpcHQgJHtqfT4ke2guY29udGVudHx8Jyd9PC9zY3JpcHQ+YDtkZWZhdWx0OnJldHVybmA8bGluayAke2p9IC8+YDt9fSxlPWg9Pntjb25zdCBpPWBwb3NpdGlvbjogYWJzb2x1dGU7YCtgd2lkdGg6ICR7aC5kaW1lbnNpb25zLnd9JTtgK2BoZWlnaHQ6ICR7aC5kaW1lbnNpb25zLmh9JTtgK2B0b3A6ICR7aC5jb29yZGluYXRlcy55fSU7YCtgbGVmdDogJHtoLmNvb3JkaW5hdGVzLnh9JTtgLGs9YS50ZW1wbGF0ZXNbaC50ZW1wbGF0ZV0sbD1rLmNvZGUucmVwbGFjZSgvXHtceyhSSUNIX1RFWFR8U0lNUExFX1RFWFR8TUVESUEpXH1cfS9nLChtLG4sbyk9PntyZXR1cm4gbiE9PWEuY29udGVudHNbaC5jb250ZW50c1tvXV0udHlwZSYmKGNvbnNvbGUud2FybihgQ29udGVudCAjJHtoLmNvbnRlbnRzW29dfSdzIHR5cGUgaXMgbm90IGNvbXBhdGlibGUgd2l0aCAke259LmApLGI9ITApLGEuY29udGVudHNbaC5jb250ZW50c1tvXV0ubWFya3VwVGV4dH0pO3JldHVybmA8ZGl2IHN0eWxlPSIke2l9Ij4ke2x9PC9kaXY+YH0sZj1oPT57Y29uc3QgaT1bXSxqPVtdO2oudW5zaGlmdChkKHt0YWdOYW1lOidzY3JpcHQnLGNvbnRlbnQ6J2Z1bmN0aW9uIHNjYWxlKCkge2NvbnN0IGZvbnRTaXplID0gTWF0aC5taW4oMTYvOSAqIHdpbmRvdy5pbm5lckhlaWdodCAvIDEwMCwgd2luZG93LmlubmVyV2lkdGggLyAxMDApO2RvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7fXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwncmVzaXplXCcsIHNjYWxlKTsgd2luZG93Lm9ubG9hZCA9IHNjYWxlOycsYXR0cmlidXRlczp7dHlwZTondGV4dC9qYXZhc2NyaXB0JywnZGF0YS1kZWZhdWx0JzohMH19KSksai51bnNoaWZ0KGQoe3RhZ05hbWU6J3N0eWxlJyxjb250ZW50OidkaXZbZGF0YS1jb21wb25lbnQtaWRde292ZXJmbG93OiBhdXRvOyBwb3NpdGlvbjogYWJzb2x1dGU7fWJvZHl7d2lkdGg6IGNhbGMoMTYvOSAqIDEwMHZoKTsgaGVpZ2h0OiBjYWxjKDkvMTYgKiAxMDB2dyk7IG1heC13aWR0aDogMTAwdnc7bWF4LWhlaWdodDogMTAwdmg7IHBvc2l0aW9uOiByZWxhdGl2ZTsgbWFyZ2luOiAwO30nLGF0dHJpYnV0ZXM6e3R5cGU6J3RleHQvY3NzJywnZGF0YS1kZWZhdWx0JzohMH19KSk7Zm9yKGxldCBrPWg7bnVsbCE9PWs7KWsucmVzb3VyY2VzLmZvckVhY2gobT0+e2oudW5zaGlmdChkKG0pKX0pLGsuY29tcG9uZW50cy5mb3JFYWNoKG09PntpLnVuc2hpZnQoZShhLmNvbXBvbmVudHNbbV0pKX0pLGs9bnVsbD09PWsubWFzdGVyP251bGw6YS5wYWdlc1trLm1hc3Rlcl07Y29uc3QgbD1gPCFET0NUWVBFIGh0bWw+YCtgPGh0bWw+YCtgPGhlYWQ+YCtgJHtqLmpvaW4oJycpfWArYDwvaGVhZD5gK2A8Ym9keT5gK2Ake2kuam9pbignJyl9YCtgPC9ib2R5PmArYDwvaHRtbD5gO3JldHVybmA8aWZyYW1lIHNyY0RvYz0iJHtsLnJlcGxhY2UoL1wiL2csJyZxdW90OycpfSIgY2xhc3M9InN0dW1wZmkgcGFnZSIgLz5gfTtsZXQgZz0nJztPYmplY3Qua2V5cyhhLmRvY3VtZW50cykuZm9yRWFjaChoPT57YS5kb2N1bWVudHNbaF0ucGFnZXMuZm9yRWFjaChpPT57Zys9ZihhLnBhZ2VzW2ldKX0pLGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MPWd9KSwhMD09YiYmY29uc29sZS5lcnJvcignT25lIG9yIG1hbnkgZXJyb3JzIG9jY3VyZWQgZHVyaW5nIGRvY3VtZW50IHJlbmRlcmluZy4gVGhpcyBtYXkgYWZmZWN0IGRpc3BsYXlpbmcuJyl9Ow=="></script><link charset="UTF-8" bool-attribute /><style charset="UTF-8">body { background: blue; }</style><script bool-attribute>var p = 2;</script><style ></style><script ></script><style type="text/css">.stumpfi.page{border: none;}</style><noscript>The document cannot be rendered because Javascript is currently not enabled on your browser.</noscript></head><body><div style="display: none;">{"documents":{"document1":{"resources":["resource1","resource2","resource3","resource4","resource5"],"name":"test name","description":"test description","tags":["tag1","tag2"],"authors":["author1","author2"],"pages":["page2","page2","page3"]}},"pages":{"page1":{"resources":["resource1"],"master":null,"components":["component1"]},"page2":{"resources":["resource2"],"master":"page1","components":["component2"]},"page3":{"resources":[],"master":null,"components":["component2"]}},"resources":{"resource1":{"type":"link","content":"","attributes":{"charset":"UTF-8","boolAttribute":true}},"resource2":{"type":"style","content":"body { background: blue; }","attributes":{"charset":"UTF-8"}},"resource3":{"type":"script","content":"var p = 2;","attributes":{"boolAttribute":false}},"resource4":{"type":"style","content":null,"attributes":{}},"resource5":{"type":"script","content":null,"attributes":{}}},"components":{"component1":{"contents":["content1","content3","content4","content2"],"coordinates":{"x":50,"y":64},"dimensions":{"w":12,"h":7},"template":"template1"},"component2":{"contents":["content5","content1"],"coordinates":{"x":32,"y":21},"dimensions":{"w":85,"h":65},"template":"template1"}},"contents":{"content1":{"type":"RICH_TEXT","markupText":"test content 1"},"content3":{"type":"SIMPLE_TEXT","markupText":""},"content4":{"type":"SIMPLE_TEXT","markupText":""},"content2":{"type":"SIMPLE_TEXT","markupText":"test content 2"},"content5":{"type":"SIMPLE_TEXT","markupText":""}},"templates":{"template1":{"resources":["resource3"],"code":"<p>{{RICH_TEXT}}</p><ul><li>{{SIMPLE_TEXT}}</li></ul>"}}}</div></body></html>');
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
    expect(component.setContentAt).toHaveBeenCalledTimes(6);
    expect(component.setContentAt).toHaveBeenCalledWith(0, content);
    expect(component.setContentAt).toHaveBeenCalledWith(1, content);
    expect(component.setContentAt).toHaveBeenCalledWith(2, content);
    expect(component.setContentAt).toHaveBeenCalledWith(3, content);
    expect(Content).toHaveBeenCalledTimes(5);
    expect(Content).toHaveBeenCalledWith('SIMPLE_TEXT', '');
    expect(Content).toHaveBeenCalledWith('SIMPLE_TEXT', 'test content 2');
    expect(Content).toHaveBeenCalledWith('RICH_TEXT', 'test content 1');
  });
});
