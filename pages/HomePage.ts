import { Locator,FrameLocator,type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly page: Page;
  readonly gamesLocator: Locator;
  readonly selectGameLocator: Locator;
  readonly playDemoLocator: Locator;
  readonly iframeLocator: Locator;
  readonly iframe: FrameLocator;
  

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.gamesLocator = page.locator('//li[@id="menu-item-283"]');
    this.selectGameLocator = page.locator('#main').getByRole('link').filter({ hasText: /^$/ })
    this.playDemoLocator = page.locator("//button[@class='crunch-button crunch-button__full-background crunch-button__full-background--with-icon crunch-button__full-background--with-icon--left crunch-button__full-background--medium js-iframe-modal-trigger c-mr-6']");
    this.iframeLocator = page.locator('iframe[title="Iframe Content"]');
    this.iframe = page.frameLocator('iframe[title="Iframe Content"]');
  }

  async gotoHome() {
    await this.page.goto('https://avatarux.com/');
  }

  async navigateToGames() {
    await this.gamesLocator.click();
  }

  async selectFirstGame() {
    await this.selectGameLocator.nth(1).click();
  }

  async playGameDemo() {
    await this.playDemoLocator.click();
  }

  async waitForIframe() {
    await this.iframeLocator.waitFor({ state: 'visible' });
  }

  getGameIframe(): FrameLocator {
    return this.iframe;
  }
}

export default HomePage;