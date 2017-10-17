import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('my-sample-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    browser.ignoreSynchronization = true;
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
    browser.ignoreSynchronization = false;
  });
});
