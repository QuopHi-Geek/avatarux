import { test, expect, type Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { GamePage } from "../pages/GamePage";

test.describe("Game Translation Coverage Test", () => {
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

  test("Validate game translation coverage", async () => {
    // 1. Launch the game
    await test.step("Launch the game", async () => {
      await gamePage.takeScreenshot("screenshots/1-launch-game.png");
      await gamePage.waitForCanvas();
      await gamePage.takeScreenshot("screenshots/1-launch-game.png");

      //start game
      await gamePage.startGame();
      await gamePage.takeScreenshot("screenshots/1-start-game.png");
    });


    // 2. Open the Settings Menu.
    await test.step("Open the Settings Menu", async () => {
      await gamePage.openSettingsMenu();
      await gamePage.takeScreenshot("screenshots/2-open-settings-menu.png");
    });


    // 3. Open "Game Info".
    await test.step("Open Game Info", async () => {
      await gamePage.openGameInfo();
      await gamePage.takeScreenshot("screenshots/3-open-game-info.png");
    });


    // 4. Scroll to the bottom of the page.
    await test.step("Scroll to the bottom of Game Info", async () => {
      await gamePage.scrollToBottomOfGameInfo();
      await gamePage.takeScreenshot(
        "screenshots/4-scroll-bottom-game-info.png"
      );
    });


    // 5. Close "Game Info".
    await test.step("Close Game Info", async () => {
      await gamePage.closeGameInfo();
      await gamePage.takeScreenshot("screenshots/5-close-game-info.png");
    });


    // 6. Open "Game Rules".
    await test.step("Open Game Rules", async () => {
      await gamePage.waitForCanvas();
      await gamePage.openGameRules();
     // await gamePage.waitForAction();
      await gamePage.takeScreenshot("screenshots/6-open-game-rules.png");
    });

    
    // 7. scrolls to  game rules bottom page 
    await test.step("Scroll to the bottom of Game Rules", async () => {
      await gamePage.scrollToBottomOfGameRules();
      await gamePage.takeScreenshot(
        "screenshots/7-scroll-bottom-game-rules.png"
      );
    });


    // 8. closes "Game Rules"
    await test.step("Close Game Rules", async () => {
      await gamePage.closeGameRules();
      await gamePage.takeScreenshot("screenshots/8-close-game-rules.png");
    });


    // 9. closes the settings menu
    await test.step("Close the Settings Menu", async () => {
      await gamePage.closeSettingsMenu();
      await gamePage.takeScreenshot("screenshots/9-close-settings-menu.png");
    });
  });
});
