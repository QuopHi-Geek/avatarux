# AvatarUX Games Coverage Test

# Git Repo : https://github.com/QuopHi-Geek/avatarux.git

The repository contains the automated test script to validate the games coverage test on the Avatarux website. The test script performs required functions to open the game, execute test steps and captures screenshots at each step to visually for verification. 

<br>

- Test is capable of running on multiple browsers and language versions
- Test was performed on multiple browsers(chrome,firefox)

<br>

## Prerequisites for Test
-   **Node.js:** Make sure Node.js is installed
-   **npm:** Must install npm is running.
-   **Playwright:** Install Playwright for automation
-   **Browser:** Supports Playwright installation for browsers Chromium, Firefox, and WebKit(Edge)


## Setup

1.  **Clone the Repo:**

  git clone https://github.com/QuopHi-Geek/avatarux.git 
  
This command clones the project from github

2.  **Install Dependencies:**

    npm install  

This command installs node packages needed

3.  **Install Playwright Browsers:**

    npx playwright install
    
This command downloads and install playwright and the necessary browsers for the test.


## Running the Test Script

1.  **Execute the Test:**
    
-   npx playwright test --headed --project=firefox (chromium,firefox) 

-   npx playwright test (all tests)
    
This command executes the "games.spec.ts" file containing test logic.

2.  **View Screenshots:**
    After the test completes, screenshots are generated and saved in the "screenshots/" folder.  Screenshots are named as to the test step(e.g, 1-launch-game.png)


## Future Improvements

The project can be improved in the future like:

1. **Add more test steps and assertions:**
    - Add more steps to the test script to cover more UI elements
    - Add more assertions to check the functionality of the game
    - Add more verification for language dependent elements. 
    

2.  **Implement Data-Driven Approach:**
    -   Add data-driven attributes to cater for multiple games.
    -   Add assertions to check the text content of specific elements.
    -   Create a data-driven approach where expected translations are stored in a separate file (JSON/CSV) for each game.


3. **Run on different games:**
    - Add a loop in the test script to iterate through different games in the website
    - Update the screenshot naming convention to include the game names after tests


4. **Run on different devices and viewports:**
    -  Add tests to simulate different device viewports and parallel execution
    -  Add tests to ensure the game's UI and functionality are responsive and work correctly across various screen sizes and device types (mobile,tablets,desktops)


## Test Script Description

The "games.spec.ts" file contains the core test logic and steps.And "pages" contains the page objects.

1.  **Launch the Game:** Navigates to the avatarUX website, accepts cookies and age verification, selects a game, and launches the game demo
2.  **Open Settings Menu:** Opens the in-game settings menu
3.  **Open "Game Info":** Navigates to the "Game Info" section
4.  **Scroll to Bottom of Game Info:** Scrolls to the bottom of the "Game Info" page
5.  **Close "Game Info":** Closes the "Game Info" section
6.  **Open "Game Rules":** Navigates to the "Game Rules" section
7.  **Scroll to Bottom of Game Rules:** Scrolls to the bottom of the "Game Rules" page
8.  **Close "Game Rules":** Closes the "Game Rules" section
9.  **Close Settings Menu:** Closes the in-game settings menu

The screenshots are generated and saved in the "screenshots/" folder after every test as requested for verification.