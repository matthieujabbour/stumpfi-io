/**
 * Copyright 2017 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
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
    expect(() => fromHTML('<html><head><title>test name</title><meta charSet="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="test description" /><meta name="keywords" content="tag1 tag2" /><meta name="author" content="author1, author2" /><script type="text/javascript" src="data:text/javascript;base64,data:text/javascript;base64,LyoqCiAqIENvcHlyaWdodCAyMDE3IC0gcHJlc2VudCwgTWF0dGhpZXUgSmFiYm91ciA8bWF0dGhpZXUuamFiYm91ckBnbWFpbC5jb20+LgogKiBBbGwgcmlnaHRzIHJlc2VydmVkLgogKi8KY29uc3Qgc3BlY2lhbENoYXJzTWFwPXsnJmFtcDsnOicmJywnJmx0Oyc6JzwnLCcmZ3Q7JzonPicsJyZxdW90Oyc6JyInLCcmIzAzOTsnOidcJycsJyYnOicmYW1wOycsJzwnOicmbHQ7JywnPic6JyZndDsnLCciJzonJnF1b3Q7JywnXCcnOicmIzAzOTsnfSxyZXBsYWNlcj1hPT5zcGVjaWFsQ2hhcnNNYXBbYV07ZnVuY3Rpb24gdW5lc2NhcGUoYSl7cmV0dXJuIGEucmVwbGFjZSgvKCZhbXA7fCZsdDt8Jmd0O3wmcXVvdDt8JiMwMzk7KS9nLHJlcGxhY2VyKX1mdW5jdGlvbiBlc2NhcGUoYSl7cmV0dXJuIGEucmVwbGFjZSgvWyY8PiInXS9nLHJlcGxhY2VyKX1jb25zdCBjb250ZW50VHlwZXNSZW5kZXJlcnM9e1NJTVBMRV9URVhUOmE9PmEsUklDSF9URVhUOmE9PmEsTUVESUE6YT0+YX07d2luZG93Lm9ubG9hZD0oKT0+e2NvbnN0IGE9SlNPTi5wYXJzZSh1bmVzY2FwZShkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MKSk7bGV0IGI9ITE7Y29uc3QgYz1oPT5oLnJlcGxhY2UoLyhbQS1aXSkvZywnLSQxJykudG9Mb3dlckNhc2UoKSxkPWg9Pntjb25zdCBpPWguYXR0cmlidXRlcyxqPU9iamVjdC5rZXlzKGkpLnJlZHVjZSgoayxsKT0+e3JldHVybidzdHJpbmcnPT10eXBlb2YgaVtsXT9gJHtrfSAke2MobCl9PSIke2lbbF19ImA6ITA9PT1pW2xdP2Ake2t9ICR7YyhsKX1gOmt9LCcnKS50cmltKCk7c3dpdGNoKGgudHlwZSl7Y2FzZSdzdHlsZSc6cmV0dXJuYDxzdHlsZSAke2p9PiR7aC5jb250ZW50fHwnJ308L3N0eWxlPmA7Y2FzZSdzY3JpcHQnOnJldHVybmA8c2NyaXB0ICR7an0+JHtoLmNvbnRlbnR8fCcnfTwvc2NyaXB0PmA7ZGVmYXVsdDpyZXR1cm5gPGxpbmsgJHtqfSAvPmA7fX0sZT1oPT57Y29uc3QgaT0ncG9zaXRpb246IGFic29sdXRlOycrYHdpZHRoOiAke2guZGltZW5zaW9ucy53fSU7YCtgaGVpZ2h0OiAke2guZGltZW5zaW9ucy5ofSU7YCtgdG9wOiAke2guY29vcmRpbmF0ZXMueX0lO2ArYGxlZnQ6ICR7aC5jb29yZGluYXRlcy54fSU7YCxqPSgoKT0+e2xldCBtPTA7cmV0dXJuKG4sbyk9PntpZihudWxsPT09aC5jb250ZW50c1ttXXx8dm9pZCAwPT09aC5jb250ZW50c1ttXSlyZXR1cm4gbSs9MSwnJztvIT09YS5jb250ZW50c1toLmNvbnRlbnRzW21dXS50eXBlJiYoY29uc29sZS53YXJuKGBDb250ZW50ICMke2guY29udGVudHNbbV19J3MgdHlwZSBpcyBub3QgY29tcGF0aWJsZSB3aXRoICR7b30uYCksYj0hMCk7Y29uc3QgcD1lc2NhcGUoYS5jb250ZW50c1toLmNvbnRlbnRzW21dXS5tYXJrdXBUZXh0KTtyZXR1cm4gbSs9MSxjb250ZW50VHlwZXNSZW5kZXJlcnNbb10ocCl9fSkoKSxrPWEudGVtcGxhdGVzW2gudGVtcGxhdGVdLGw9ay5jb2RlLnJlcGxhY2UoL1x7XHsoUklDSF9URVhUfFNJTVBMRV9URVhUfE1FRElBKVx9XH0vZyxqKTtyZXR1cm5gPGRpdiBzdHlsZT0iJHtpfSI+JHtsfTwvZGl2PmB9LGY9aD0+e2NvbnN0IGk9W10saj17fTtqLmF1dG9yZXNpemVTY3JpcHQ9ZCh7dHlwZTonc2NyaXB0JyxhdHRyaWJ1dGVzOnt0eXBlOid0ZXh0L2phdmFzY3JpcHQnfSxjb250ZW50OidmdW5jdGlvbiBzY2FsZSgpIHtjb25zdCBmb250U2l6ZSA9IE1hdGgubWluKDE2LzkgKiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAxMDAsIHdpbmRvdy5pbm5lcldpZHRoIC8gMTAwKTtkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO313aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcJ3Jlc2l6ZVwnLCBzY2FsZSk7IHdpbmRvdy5vbmxvYWQgPSBzY2FsZTsnfSksai5hdXRvcmVzaXplU3R5bGU9ZCh7dHlwZTonc3R5bGUnLGF0dHJpYnV0ZXM6e3R5cGU6J3RleHQvY3NzJ30sY29udGVudDonZGl2W2RhdGEtY29tcG9uZW50LWlkXXtvdmVyZmxvdzogYXV0bzsgcG9zaXRpb246IGFic29sdXRlO31ib2R5e3dpZHRoOiBjYWxjKDE2LzkgKiAxMDB2aCk7IGhlaWdodDogY2FsYyg5LzE2ICogMTAwdncpOyBtYXgtd2lkdGg6IDEwMHZ3O21heC1oZWlnaHQ6IDEwMHZoOyBwb3NpdGlvbjogcmVsYXRpdmU7IG1hcmdpbjogMDsgb3ZlcmZsb3c6IGhpZGRlbjt9J30pO2ZvcihsZXQgaz1oO251bGwhPT1rOylrLnJlc291cmNlcy5mb3JFYWNoKG09PntqW21dPWQoYS5yZXNvdXJjZXNbbV0pfSksay5jb21wb25lbnRzLmZvckVhY2gobT0+e2kudW5zaGlmdChlKGEuY29tcG9uZW50c1ttXSkpO2NvbnN0IG49YS5jb21wb25lbnRzW21dLnRlbXBsYXRlO2EudGVtcGxhdGVzW25dLnJlc291cmNlcy5mb3JFYWNoKG89PntqW29dPWQoYS5yZXNvdXJjZXNbb10pfSl9KSxrPW51bGw9PT1rLm1hc3Rlcj9udWxsOmEucGFnZXNbay5tYXN0ZXJdO2NvbnN0IGw9JzwhRE9DVFlQRSBodG1sPjxodG1sPjxoZWFkPicrYCR7T2JqZWN0LmtleXMoaikubWFwKG09PmpbbV0pLmpvaW4oJycpfWArJzwvaGVhZD48Ym9keT4nK2Ake2kuam9pbignJyl9YCsnPC9ib2R5PjwvaHRtbD4nO3JldHVybmA8aWZyYW1lIHNyY0RvYz0iJHtlc2NhcGUobCl9IiBjbGFzcz0ic3R1bXBmaSBwYWdlIj48L2lmcmFtZT5gfTtsZXQgZz0nJztPYmplY3Qua2V5cyhhLmRvY3VtZW50cykuZm9yRWFjaChoPT57YS5kb2N1bWVudHNbaF0ucGFnZXMuZm9yRWFjaChpPT57Zys9ZihhLnBhZ2VzW2ldKX0pLGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MPWd9KSwhMD09YiYmY29uc29sZS5lcnJvcignT25lIG9yIHNldmVyYWwgZXJyb3JzIG9jY3VyZWQgZHVyaW5nIGRvY3VtZW50IHJlbmRlcmluZy4gVGhpcyBtYXkgYWZmZWN0IGRpc3BsYXlpbmcuJyl9Ow=="></script><link charset="UTF-8" bool-attribute /><style charset="UTF-8">body { background: blue; }</style><script bool-attribute>var p = 2;</script><style ></style><script ></script><style type="text/css">.stumpfi.page{border: none;}</style><noscript>The document cannot be rendered because Javascript is currently not enabled on your browser.</noscript></head><body><div style="display: none;">{invalidDocument}</div></body></html>'))
    .toThrowError();
  });
  test('should correctly generate a stumpfi Document from an HTML string', () => {
    const document : Document = new Document();
    const resource : Resource = new Resource('script');
    const component : Component = new Component();
    const page : Page = new Page();
    const content : Content = new Content(ContentTypes.SIMPLE_TEXT);
    const template : Template = new Template('');
    (Page as jest.Mock<object>).mockClear();
    (Resource as jest.Mock<object>).mockClear();
    (Component as jest.Mock<object>).mockClear();
    (Content as jest.Mock<object>).mockClear();
    (Template as jest.Mock<object>).mockClear();
    fromHTML('<html><head><title>test name</title><meta charSet=\\"UTF-8\\" /><meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" /><meta name=\\"description\\" content=\\"test description\\" /><meta name=\\"keywords\\" content=\\"tag1 tag2\\" /><meta name=\\"author\\" content=\\"author1, author2\\" /><script type=\\"text/javascript\\" src=\\"data:text/javascript;base64,data:text/javascript;base64,LyoqCiAqIENvcHlyaWdodCAyMDE3IC0gcHJlc2VudCwgTWF0dGhpZXUgSmFiYm91ciA8bWF0dGhpZXUuamFiYm91ckBnbWFpbC5jb20+LgogKiBBbGwgcmlnaHRzIHJlc2VydmVkLgogKi8KY29uc3Qgc3BlY2lhbENoYXJzTWFwPXsnJmFtcDsnOicmJywnJmx0Oyc6JzwnLCcmZ3Q7JzonPicsJyZxdW90Oyc6JyInLCcmIzAzOTsnOidcJycsJyYnOicmYW1wOycsJzwnOicmbHQ7JywnPic6JyZndDsnLCciJzonJnF1b3Q7JywnXCcnOicmIzAzOTsnfSxyZXBsYWNlcj1hPT5zcGVjaWFsQ2hhcnNNYXBbYV07ZnVuY3Rpb24gdW5lc2NhcGUoYSl7cmV0dXJuIGEucmVwbGFjZSgvKCZhbXA7fCZsdDt8Jmd0O3wmcXVvdDt8JiMwMzk7KS9nLHJlcGxhY2VyKX1mdW5jdGlvbiBlc2NhcGUoYSl7cmV0dXJuIGEucmVwbGFjZSgvWyY8PiInXS9nLHJlcGxhY2VyKX1jb25zdCBjb250ZW50VHlwZXNSZW5kZXJlcnM9e1NJTVBMRV9URVhUOmE9PmEsUklDSF9URVhUOmE9PmEsTUVESUE6YT0+YX07d2luZG93Lm9ubG9hZD0oKT0+e2NvbnN0IGE9SlNPTi5wYXJzZSh1bmVzY2FwZShkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MKSk7bGV0IGI9ITE7Y29uc3QgYz1oPT5oLnJlcGxhY2UoLyhbQS1aXSkvZywnLSQxJykudG9Mb3dlckNhc2UoKSxkPWg9Pntjb25zdCBpPWguYXR0cmlidXRlcyxqPU9iamVjdC5rZXlzKGkpLnJlZHVjZSgoayxsKT0+e3JldHVybidzdHJpbmcnPT10eXBlb2YgaVtsXT9gJHtrfSAke2MobCl9PSIke2lbbF19ImA6ITA9PT1pW2xdP2Ake2t9ICR7YyhsKX1gOmt9LCcnKS50cmltKCk7c3dpdGNoKGgudHlwZSl7Y2FzZSdzdHlsZSc6cmV0dXJuYDxzdHlsZSAke2p9PiR7aC5jb250ZW50fHwnJ308L3N0eWxlPmA7Y2FzZSdzY3JpcHQnOnJldHVybmA8c2NyaXB0ICR7an0+JHtoLmNvbnRlbnR8fCcnfTwvc2NyaXB0PmA7ZGVmYXVsdDpyZXR1cm5gPGxpbmsgJHtqfSAvPmA7fX0sZT1oPT57Y29uc3QgaT0ncG9zaXRpb246IGFic29sdXRlOycrYHdpZHRoOiAke2guZGltZW5zaW9ucy53fSU7YCtgaGVpZ2h0OiAke2guZGltZW5zaW9ucy5ofSU7YCtgdG9wOiAke2guY29vcmRpbmF0ZXMueX0lO2ArYGxlZnQ6ICR7aC5jb29yZGluYXRlcy54fSU7YCxqPSgoKT0+e2xldCBtPTA7cmV0dXJuKG4sbyk9PntpZihudWxsPT09aC5jb250ZW50c1ttXXx8dm9pZCAwPT09aC5jb250ZW50c1ttXSlyZXR1cm4gbSs9MSwnJztvIT09YS5jb250ZW50c1toLmNvbnRlbnRzW21dXS50eXBlJiYoY29uc29sZS53YXJuKGBDb250ZW50ICMke2guY29udGVudHNbbV19J3MgdHlwZSBpcyBub3QgY29tcGF0aWJsZSB3aXRoICR7b30uYCksYj0hMCk7Y29uc3QgcD1lc2NhcGUoYS5jb250ZW50c1toLmNvbnRlbnRzW21dXS5tYXJrdXBUZXh0KTtyZXR1cm4gbSs9MSxjb250ZW50VHlwZXNSZW5kZXJlcnNbb10ocCl9fSkoKSxrPWEudGVtcGxhdGVzW2gudGVtcGxhdGVdLGw9ay5jb2RlLnJlcGxhY2UoL1x7XHsoUklDSF9URVhUfFNJTVBMRV9URVhUfE1FRElBKVx9XH0vZyxqKTtyZXR1cm5gPGRpdiBzdHlsZT0iJHtpfSI+JHtsfTwvZGl2PmB9LGY9aD0+e2NvbnN0IGk9W10saj17fTtqLmF1dG9yZXNpemVTY3JpcHQ9ZCh7dHlwZTonc2NyaXB0JyxhdHRyaWJ1dGVzOnt0eXBlOid0ZXh0L2phdmFzY3JpcHQnfSxjb250ZW50OidmdW5jdGlvbiBzY2FsZSgpIHtjb25zdCBmb250U2l6ZSA9IE1hdGgubWluKDE2LzkgKiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAxMDAsIHdpbmRvdy5pbm5lcldpZHRoIC8gMTAwKTtkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO313aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcJ3Jlc2l6ZVwnLCBzY2FsZSk7IHdpbmRvdy5vbmxvYWQgPSBzY2FsZTsnfSksai5hdXRvcmVzaXplU3R5bGU9ZCh7dHlwZTonc3R5bGUnLGF0dHJpYnV0ZXM6e3R5cGU6J3RleHQvY3NzJ30sY29udGVudDonZGl2W2RhdGEtY29tcG9uZW50LWlkXXtvdmVyZmxvdzogYXV0bzsgcG9zaXRpb246IGFic29sdXRlO31ib2R5e3dpZHRoOiBjYWxjKDE2LzkgKiAxMDB2aCk7IGhlaWdodDogY2FsYyg5LzE2ICogMTAwdncpOyBtYXgtd2lkdGg6IDEwMHZ3O21heC1oZWlnaHQ6IDEwMHZoOyBwb3NpdGlvbjogcmVsYXRpdmU7IG1hcmdpbjogMDsgb3ZlcmZsb3c6IGhpZGRlbjt9J30pO2ZvcihsZXQgaz1oO251bGwhPT1rOylrLnJlc291cmNlcy5mb3JFYWNoKG09PntqW21dPWQoYS5yZXNvdXJjZXNbbV0pfSksay5jb21wb25lbnRzLmZvckVhY2gobT0+e2kudW5zaGlmdChlKGEuY29tcG9uZW50c1ttXSkpO2NvbnN0IG49YS5jb21wb25lbnRzW21dLnRlbXBsYXRlO2EudGVtcGxhdGVzW25dLnJlc291cmNlcy5mb3JFYWNoKG89PntqW29dPWQoYS5yZXNvdXJjZXNbb10pfSl9KSxrPW51bGw9PT1rLm1hc3Rlcj9udWxsOmEucGFnZXNbay5tYXN0ZXJdO2NvbnN0IGw9JzwhRE9DVFlQRSBodG1sPjxodG1sPjxoZWFkPicrYCR7T2JqZWN0LmtleXMoaikubWFwKG09PmpbbV0pLmpvaW4oJycpfWArJzwvaGVhZD48Ym9keT4nK2Ake2kuam9pbignJyl9YCsnPC9ib2R5PjwvaHRtbD4nO3JldHVybmA8aWZyYW1lIHNyY0RvYz0iJHtlc2NhcGUobCl9IiBjbGFzcz0ic3R1bXBmaSBwYWdlIj48L2lmcmFtZT5gfTtsZXQgZz0nJztPYmplY3Qua2V5cyhhLmRvY3VtZW50cykuZm9yRWFjaChoPT57YS5kb2N1bWVudHNbaF0ucGFnZXMuZm9yRWFjaChpPT57Zys9ZihhLnBhZ2VzW2ldKX0pLGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MPWd9KSwhMD09YiYmY29uc29sZS5lcnJvcignT25lIG9yIHNldmVyYWwgZXJyb3JzIG9jY3VyZWQgZHVyaW5nIGRvY3VtZW50IHJlbmRlcmluZy4gVGhpcyBtYXkgYWZmZWN0IGRpc3BsYXlpbmcuJyl9Ow==\\"></script><link charset=\\"UTF-8\\" bool-attribute /><style charset=\\"UTF-8\\">body { background: blue; }</style><script >var p = 2;</script><style ></style><script ></script><style type=\\"text/css\\">.stumpfi.page{border: none;}</style><noscript>The document cannot be rendered because Javascript is currently not enabled on your browser.</noscript></head><body><div style=\\"display: none;\\">{&quot;documents&quot;:{&quot;document1&quot;:{&quot;resources&quot;:[&quot;resource1&quot;,&quot;resource2&quot;,&quot;resource3&quot;,&quot;resource4&quot;,&quot;resource5&quot;],&quot;name&quot;:&quot;test name&quot;,&quot;description&quot;:&quot;test description&quot;,&quot;tags&quot;:[&quot;tag1&quot;,&quot;tag2&quot;],&quot;authors&quot;:[&quot;author1&quot;,&quot;author2&quot;],&quot;pages&quot;:[&quot;page2&quot;,&quot;page2&quot;,&quot;page3&quot;]}},&quot;pages&quot;:{&quot;page1&quot;:{&quot;resources&quot;:[&quot;resource1&quot;],&quot;master&quot;:null,&quot;components&quot;:[&quot;component1&quot;]},&quot;page2&quot;:{&quot;resources&quot;:[&quot;resource2&quot;],&quot;master&quot;:&quot;page1&quot;,&quot;components&quot;:[&quot;component2&quot;]},&quot;page3&quot;:{&quot;resources&quot;:[],&quot;master&quot;:null,&quot;components&quot;:[&quot;component2&quot;]}},&quot;resources&quot;:{&quot;resource1&quot;:{&quot;type&quot;:&quot;link&quot;,&quot;content&quot;:&quot;&quot;,&quot;attributes&quot;:{&quot;charset&quot;:&quot;UTF-8&quot;,&quot;boolAttribute&quot;:true}},&quot;resource2&quot;:{&quot;type&quot;:&quot;style&quot;,&quot;content&quot;:&quot;body { background: blue; }&quot;,&quot;attributes&quot;:{&quot;charset&quot;:&quot;UTF-8&quot;}},&quot;resource3&quot;:{&quot;type&quot;:&quot;script&quot;,&quot;content&quot;:&quot;var p = 2;&quot;,&quot;attributes&quot;:{&quot;boolAttribute&quot;:false}},&quot;resource4&quot;:{&quot;type&quot;:&quot;style&quot;,&quot;content&quot;:null,&quot;attributes&quot;:{}},&quot;resource5&quot;:{&quot;type&quot;:&quot;script&quot;,&quot;content&quot;:null,&quot;attributes&quot;:{}}},&quot;components&quot;:{&quot;component1&quot;:{&quot;contents&quot;:[&quot;content1&quot;,null,null,&quot;content2&quot;],&quot;coordinates&quot;:{&quot;x&quot;:50,&quot;y&quot;:64},&quot;dimensions&quot;:{&quot;w&quot;:12,&quot;h&quot;:7},&quot;template&quot;:&quot;template1&quot;},&quot;component2&quot;:{&quot;contents&quot;:[null,&quot;content1&quot;],&quot;coordinates&quot;:{&quot;x&quot;:32,&quot;y&quot;:21},&quot;dimensions&quot;:{&quot;w&quot;:85,&quot;h&quot;:65},&quot;template&quot;:&quot;template1&quot;}},&quot;contents&quot;:{&quot;content1&quot;:{&quot;type&quot;:&quot;RICH_TEXT&quot;,&quot;markupText&quot;:&quot;test content 1&quot;},&quot;content2&quot;:{&quot;type&quot;:&quot;SIMPLE_TEXT&quot;,&quot;markupText&quot;:&quot;test content 2&quot;}},&quot;templates&quot;:{&quot;template1&quot;:{&quot;resources&quot;:[&quot;resource3&quot;],&quot;code&quot;:&quot;&lt;p&gt;{{RICH_TEXT}}&lt;/p&gt;&lt;ul&gt;&lt;li&gt;{{SIMPLE_TEXT}}&lt;/li&gt;&lt;/ul&gt;&quot;}}}</div></body></html>');
    expect(Document).toHaveBeenCalledTimes(2);
    expect(Document).toHaveBeenCalledWith('test name', 'test description');
    expect(document.setId).toHaveBeenCalledTimes(1);
    expect(document.setId).toHaveBeenCalledWith('document1');
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
    expect(resource.setId).toHaveBeenCalledTimes(5);
    expect(resource.setId).toHaveBeenCalledWith('resource3');
    expect(resource.setId).toHaveBeenCalledWith('resource4');
    expect(resource.setId).toHaveBeenCalledWith('resource5');
    expect(resource.setContent).toHaveBeenCalledTimes(3);
    expect(resource.setContent).toHaveBeenCalledWith('');
    expect(resource.setContent).toHaveBeenCalledWith('body { background: blue; }');
    expect(resource.setContent).toHaveBeenCalledWith('var p = 2;');
    expect(resource.setAttribute).toHaveBeenCalledTimes(4);
    expect(resource.setAttribute).toHaveBeenCalledWith('charset', 'UTF-8');
    expect(resource.setAttribute).toHaveBeenCalledWith('boolAttribute', true);
    expect(resource.setAttribute).toHaveBeenCalledWith('boolAttribute', false);
    expect(Page).toHaveBeenCalledTimes(3);
    expect(page.setId).toHaveBeenCalledTimes(3);
    expect(page.setId).toHaveBeenCalledWith('page1');
    expect(page.setId).toHaveBeenCalledWith('page2');
    expect(page.setId).toHaveBeenCalledWith('page3');
    expect(page.setMaster).toHaveBeenCalledTimes(1);
    expect(page.setMaster).toHaveBeenCalledWith(page);
    expect(page.addResource).toHaveBeenCalledTimes(2);
    expect(page.addResource).toHaveBeenCalledWith(resource);
    expect(page.addComponent).toHaveBeenCalledTimes(3);
    expect(page.addComponent).toHaveBeenCalledWith(component);
    expect(Component).toHaveBeenCalledTimes(2);
    expect(component.setId).toHaveBeenCalledTimes(2);
    expect(component.setId).toHaveBeenCalledWith('component1');
    expect(component.setId).toHaveBeenCalledWith('component2');
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
    expect(template.setId).toHaveBeenCalledTimes(1);
    expect(template.setId).toHaveBeenCalledWith('template1');
    expect(template.addResource).toHaveBeenCalledTimes(1);
    expect(template.addResource).toHaveBeenCalledWith(resource);
    expect(component.setContentAt).toHaveBeenCalledTimes(3);
    expect(component.setContentAt).toHaveBeenCalledWith(0, content);
    expect(component.setContentAt).toHaveBeenCalledWith(1, content);
    expect(component.setContentAt).toHaveBeenCalledWith(3, content);
    expect(Content).toHaveBeenCalledTimes(2);
    expect(content.setId).toHaveBeenCalledTimes(2);
    expect(content.setId).toHaveBeenCalledWith('content1');
    expect(content.setId).toHaveBeenCalledWith('content2');
    expect(Content).toHaveBeenCalledWith('RICH_TEXT', 'test content 1');
    expect(Content).toHaveBeenCalledWith('SIMPLE_TEXT', 'test content 2');
  });
});
