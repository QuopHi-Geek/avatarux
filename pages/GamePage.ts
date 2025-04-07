import { Locator, type FrameLocator, type Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class GamePage extends BasePage {
  readonly frame: FrameLocator;
  readonly page: Page;
  readonly canvasLocator: Locator;
  readonly gameInfoLocator: Locator;
  readonly gameRulesLocator: Locator;
  readonly closeIconLocator: Locator;
  readonly scrollElementLocator: Locator;
  readonly startGameLocator: Locator;
  readonly iframeLocator: Locator;
  readonly iframe: FrameLocator;
  readonly rootDivLocator: Locator;
  readonly rootCanvasLocator: Locator;
  readonly gamesInfoFeatureLocator: Locator;
  readonly gameRulesContentLocator: Locator;
  readonly genericLocator: Locator;
  readonly genericLocator2: Locator;
  

  constructor(page: Page, frame: FrameLocator) {
    super(page);
    this.frame = frame;
    this.page = page;
    this.iframeLocator = page.locator('iframe[title="Iframe Content"]');
    this.iframe = frame;
    this.canvasLocator = frame.locator("canvas");
    this.startGameLocator = frame.locator('//iframe[@id="js-modal-iframe"]');
    this.scrollElementLocator = frame.locator('[id="__react_wrapper__"]');
    this.gameInfoLocator = frame.locator('//span[@class="title-0-2-100 title-d3-0-2-104"]');
    this.gameRulesLocator = frame.locator('//span[@class="title-0-2-100 title-d5-0-2-106"]');
    this.closeIconLocator = frame.getByRole("img");
    this.gamesInfoFeatureLocator = this.iframe.locator(
      "div:nth-child(5) > .sectionContainer-0-2-9"
    );
    this.gameRulesContentLocator = this.frame.locator(
      "#__react_wrapper__ > div:nth-child(2) > div.page-0-2-42.pageActive-0-2-43 > div.rulesContent-0-2-45.rulesContent-d4-0-2-52 > div > ul:nth-child(9) > li:nth-child(3)"
    );
    this.rootCanvasLocator = this.iframe.locator("canvas");
    this.rootDivLocator = this.iframe.locator("#root");
    
  }

  async waitForCanvas() {
    await this.canvasLocator.waitFor({ state: "visible" });
  }

  async startGame() {
    await this.rootCanvasLocator.click();
    await this.page.waitForTimeout(2000);

    //waits and executes click on canvas
    await this.forceClickCanvas();
    await this.page.waitForTimeout(2000);
    await this.forceClickCanvas();
  }

  async forceClickCanvas() {
    const canvasBoundingBox = await this.canvasLocator.boundingBox();
    if (!canvasBoundingBox) {
      throw new Error("Canvas not found or displayed");
    }

    await this.page.mouse.click(
      canvasBoundingBox.x + canvasBoundingBox.width / 2,
      canvasBoundingBox.y + canvasBoundingBox.height / 2,
      { button: "left", clickCount: 1 }
    );
  }

  async waitForIframe() {
    await this.iframeLocator.waitFor({ state: "visible" });
  }

  async openSettingsMenu() {
    await this.page.waitForTimeout(2000);
    await this.rootCanvasLocator.click({
      position: {
        x: 39,
        y: 514,
      },
    }); // clicks settings
    await this.page.waitForTimeout(500);
  }

  async openGameInfo() {
    await this.page.waitForTimeout(2000);
    await this.gameInfoLocator.click();
    await this.page.waitForTimeout(2000);
  }

  async scrollToBottomOfGameInfo() {
    //adds scroll element
    await this.page.waitForTimeout(1000);
    await this.scrollElementLocator.evaluate((el) => (el.scrollTop = 1000));

    await expect(this.gamesInfoFeatureLocator).toBeVisible();
    await this.gamesInfoFeatureLocator.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
  }

  async closeGameInfo() {
    await this.closeIconLocator.locator("path").click();
    await this.page.waitForTimeout(500);

  }

  async openGameRules() {
    await expect(this.rootCanvasLocator).toBeVisible();
    await this.rootCanvasLocator.click({
      position: {
        x: 39,
        y: 514,
      },
    }); // clicks settings
    await expect(this.gameRulesLocator).toBeVisible();
    await this.gameRulesLocator.click();
    await this.page.waitForTimeout(500);
  }

  async scrollToBottomOfGameRules() {
    //adds scroll element
    await this.gameRulesContentLocator.evaluate((el) => (el.scrollTop = 1000));
    await this.page.waitForTimeout(500);

    await expect(this.gameRulesContentLocator).toBeVisible();
    await this.gameRulesContentLocator.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
  }

  async closeGameRules() {
    await this.closeIconLocator.locator("path").click();
    await this.page.waitForTimeout(500);
  }

  async closeSettingsMenu() {
    await this.rootCanvasLocator.click({
      position: {
        x: 39,
        y: 514,
      },
    });
    await this.closeIconLocator.locator("path").click();
    await this.page.waitForTimeout(500);
  }

  async waitForAction() {
    await this.page.waitForTimeout(2000);
  }
}

export default GamePage;
