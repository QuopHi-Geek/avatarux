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
    this.gamesLocator = page.locator('#menu-item-283').getByRole('link', { name: 'Games' });
    this.selectGameLocator = page.locator('#main').getByRole('link').filter({ hasText: /^$/ })
    this.playDemoLocator = page.getByRole('button', { name: 'Play demo Try demo' });
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