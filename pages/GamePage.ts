import { Locator, type FrameLocator, type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GamePage extends BasePage {
  readonly frame: FrameLocator;
  readonly page: Page;
  readonly canvasLocator: Locator;
  readonly settingsMenuLocator: Locator;
  readonly gameInfoLocator: Locator;
  readonly gameRulesLocator: Locator;
  readonly closeSettingsMenuLocator: Locator;
  readonly closeGameInfoLocator: Locator;
  readonly closeGameRulesLocator: Locator;
  readonly scrollElementLocator: Locator;
  readonly startGameLocator: Locator;
  readonly iframeLocator: Locator;
  readonly iframe: FrameLocator;
  readonly rootDivLocator: Locator;
  readonly rootCanvaLocator: Locator;
  

  constructor(page: Page, frame: FrameLocator) {
    super(page);
    this.frame = frame;
    this.page = page;
    this.canvasLocator = frame.locator('canvas');
    this.settingsMenuLocator = frame.getByRole('button', { name: 'Settings' });
    this.gameInfoLocator = frame.getByText('GAME INFO');
    this.gameRulesLocator = frame.getByText('GAME RULES', { exact: true });
    this.closeSettingsMenuLocator = frame.getByRole('img');
    this.closeGameInfoLocator = frame.getByRole('img');
    this.closeGameRulesLocator = frame.getByRole('img');
    this.scrollElementLocator = frame.locator('[id="__react_wrapper__"]');
    this.iframeLocator = page.locator('iframe[title="Iframe Content"]'); // Use page.locator here
    this.iframe = frame;
    this.startGameLocator = frame.locator('//iframe[@id="js-modal-iframe"]');
    this.rootDivLocator = this.iframe.locator('#root');
    this.rootCanvaLocator = this.iframe.locator('canvas');
  }

  async waitForCanvas() {
    await this.canvasLocator.waitFor({ state: 'visible' });
  }


  async startGame(){
    await this.rootCanvaLocator.click();
    await this.page.waitForTimeout(2000);
    await this.forceClickCanvas();
    await this.page.waitForTimeout(2000);
    await this.rootCanvaLocator.click({
        position: {
          x: 38,
          y: 454
        }
      }); // clicks sound

      await this.page.waitForTimeout(2000);
      await this.forceClickCanvas();
  }


  async forceClickCanvas() {
    const canvasBoundingBox = await this.canvasLocator.boundingBox();
    if (!canvasBoundingBox) {
      throw new Error('Canvas bounding box not found.');
    }

    await this.page.mouse.click(
      canvasBoundingBox.x + canvasBoundingBox.width / 2,
      canvasBoundingBox.y + canvasBoundingBox.height / 2,
      { button: 'left', clickCount: 1 }
    );
  }



  async waitForIframe() {
    await this.iframeLocator.waitFor({ state: 'visible' });
  }

  async openSettingsMenu() {
    await this.page.waitForTimeout(2000);
    await this.rootCanvaLocator.click({
        position: {
          x: 39,
          y: 514
        }
      }); // clicks settings
    await this.page.waitForTimeout(2000);
  }

  async openGameInfo() {
    await this.page.waitForTimeout(2000);
    await this.gameInfoLocator.click();
    await this.page.waitForTimeout(2000);
  }

  async scrollToBottomOfGameInfo() {
    //adds scroll element
    await this.page.waitForTimeout(1000);
    await this.scrollElementLocator.evaluate(el => el.scrollTop = el.scrollHeight);
    await this.page.waitForTimeout(500);
  }

  async closeGameInfo() {
    await this.closeGameInfoLocator.locator('path').click();
    await this.page.waitForTimeout(2000);
  }

  async openGameRules() {
    await expect(this.rootCanvaLocator).toBeVisible()
    await this.rootCanvaLocator.click({
        position: {
          x: 39,
          y: 514
        }
      }); // clicks settings
    await expect(this.gameRulesLocator).toBeVisible();
    await this.gameRulesLocator.click();
  }

  async scrollToBottomOfGameRules() {
    //adds scroll element
    await this.scrollElementLocator.evaluate(el => el.scrollTop = el.scrollHeight);
    await this.page.waitForTimeout(500);
  }

  async closeGameRules() {
    await this.closeGameInfoLocator.locator('path').click();
    
  }

  async closeSettingsMenu() {
    await this.closeSettingsMenuLocator.locator('path').click();
  }

  async waitForAction(){
    await this.page.waitForTimeout(2000);
  }
}

export default GamePage;
