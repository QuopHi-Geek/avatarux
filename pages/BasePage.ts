import { type Page, Locator, type FrameLocator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly frame: FrameLocator;
  readonly acceptCookiesLocator: Locator;
  readonly acceptAgeLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.frameLocator('iframe[title="Iframe Content"]');
    this.acceptCookiesLocator = page.locator('//button[@class="cky-btn cky-btn-accept"]').first();
    this.acceptAgeLocator = page.locator('//button[@id="ageOver"]');
  }

  async acceptCookies() {
    await this.acceptCookiesLocator.click();
  }

  async acceptAge() {
    await this.acceptAgeLocator.click();
  }

  async takeScreenshot(path: string) {
    await this.page.screenshot({ path });
  }
}
