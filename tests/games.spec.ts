import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { GamePage } from '../pages/GamePage';

test.describe('Game Translation Coverage Test', () => {
  let page: Page;
  let homePage: HomePage;
  let gamePage: GamePage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    await homePage.gotoHome();
    await homePage.acceptCookies();
    await homePage.acceptAge();
    await homePage.navigateToGames();
    await homePage.selectFirstGame();
    await homePage.playGameDemo();
    await homePage.waitForIframe();
    const frame = homePage.getGameIframe();
    gamePage = new GamePage(page, frame);
    await gamePage.waitForCanvas();
  });

  test.afterEach(async () => {
    await page.close();
  });

});
