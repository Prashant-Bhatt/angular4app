import { AngularfrontPage } from './app.po';

describe('angularfront App', () => {
  let page: AngularfrontPage;

  beforeEach(() => {
    page = new AngularfrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
