const TRANSPARENCY = 200;

const MENU_BG_COLOR = [13, 17, 23, TRANSPARENCY];
const MENU_BORDER_COLOR = [213, 217, 223, TRANSPARENCY];
const MENU_TEXT_COLOR = [255, 255, 255, TRANSPARENCY];
const MENU_BAR_COLOR = [255, 255, 255, TRANSPARENCY];

const MENU_WIDTH = 325;
const MENU_HEIGHT = 350;
const MENU_RADIUS = 5; // for rounded edges
const MENU_OFFSET = 25; // for initial position

const MENU_ELEMENT_OFFSET_X = 10;
const MENU_ELEMENT_OFFSET_Y = 25;

const HIDE_MENU_KEY = "m";

let menuX;
let menuY;

let overMenu = false; // make menu draggable
let menuHidden = false; // make menu hidden

// ======================================================================
// Menu elements
let frameRateSlider;
let gridSizeSlider;
let mazeGenDropdown;
let mazeSolverDropdown;
let percentWallDeletionSlider;
let skipGenAnimationCheckbox;
let skipSolverAnimationCheckbox;
// ======================================================================

const mazeGenAlgorithms = {
    "Non-perfect Prim" : "primImperfect",
    "Prim" : "prim"
}

const imperfectMazes = ["primImperfect"]; 

const mazeSolverAlgorithms = {
    "A*" : "aStar",
    "Breadth First Search" : "bfs",
    "Depth First Search" : "dfs"
}

function menuInit() {
    menuX = windowWidth - MENU_WIDTH - MENU_OFFSET;
    menuY = windowHeight - MENU_HEIGHT - MENU_OFFSET;

    frameRateSlider = new Slider(20, 60, FRAMERATE);
    mazeGenDropdown = new Dropdown(mazeGenAlgorithms);
    mazeSolverDropdown = new Dropdown(mazeSolverAlgorithms);
    wallDeletionPercentSlider = new Slider(0, 100, WALL_DELETION_PERCENT);
    gridSizeSlider = new Slider(2, 100, CELL_PIXELS);
    skipGenAnimationCheckbox = new Checkbox("Skip maze generation animation", false);
    skipSolverAnimationCheckbox = new Checkbox("Skip maze solver animation", false);
}

function drawMenu() {
    if (mouseX > menuX &&
        mouseY > menuY &&
        mouseX < menuX + MENU_WIDTH &&
        mouseY < menuY + MENU_HEIGHT) overMenu = true;
    else overMenu = false;

    if (menuHidden) return; 
    
    stroke(MENU_BORDER_COLOR);
    fill(MENU_BG_COLOR);

    rect(menuX, menuY, MENU_WIDTH, MENU_HEIGHT, MENU_RADIUS);

    // ===========================================================================================
    let menuElementPositionX = menuX + MENU_ELEMENT_OFFSET_X;
    let menuElementPositionY = menuY + MENU_ELEMENT_OFFSET_Y;

    fill(MENU_TEXT_COLOR);
    textAlign(CENTER);
    text("MENU", menuX + MENU_WIDTH / 2, menuElementPositionY);
    textAlign(LEFT);

    // ===========================================================================================
    // create a horizontal bar to separate sections
    menuElementPositionY += 12;
    fill(MENU_BAR_COLOR);
    stroke(MENU_BAR_COLOR);
    rect(menuElementPositionX, menuElementPositionY, MENU_WIDTH - MENU_ELEMENT_OFFSET_X * 2, 1);
    menuElementPositionY += 1;

    // ===========================================================================================
    menuElementPositionY += MENU_ELEMENT_OFFSET_Y;
    fill(MENU_TEXT_COLOR);
    text("Frame rate:", menuElementPositionX, menuElementPositionY);
    frameRateSlider.draw(menuElementPositionX + MENU_WIDTH - 170, menuElementPositionY - 6);

    // ===========================================================================================
    menuElementPositionY += MENU_ELEMENT_OFFSET_Y;
    fill(MENU_TEXT_COLOR);
    text("Grid cell size:", menuElementPositionX, menuElementPositionY);
    gridSizeSlider.draw(menuElementPositionX + MENU_WIDTH - 170, menuElementPositionY - 6);
    
    // ===========================================================================================
    menuElementPositionY += MENU_ELEMENT_OFFSET_Y;
    fill(MENU_TEXT_COLOR);
    text("Maze generation algorithm:", menuElementPositionX, menuElementPositionY);
    mazeGenDropdown.draw(menuElementPositionX + MENU_WIDTH - 170, menuElementPositionY - 13);

    // ===========================================================================================
    menuElementPositionY += MENU_ELEMENT_OFFSET_Y;
    fill(MENU_TEXT_COLOR);
    text("Maze solver algorithm:", menuElementPositionX, menuElementPositionY);
    mazeSolverDropdown.draw(menuElementPositionX + MENU_WIDTH - 170, menuElementPositionY - 13);

    // ===========================================================================================
    // For non-perfect mazes, we should display a slider on what percent of cells to delete
    // (deleting walls from a perfect maze creates a non-perfect maze)
    if (imperfectMazes.includes(mazeGenDropdown.value())) {
        menuElementPositionY += MENU_ELEMENT_OFFSET_Y;
        fill(MENU_TEXT_COLOR);
        text("% of walls to delete:", menuElementPositionX, menuElementPositionY);
        wallDeletionPercentSlider.draw(menuElementPositionX + MENU_WIDTH - 170, menuElementPositionY - 6);
    }

    // ===========================================================================================
    // create a horizontal bar to separate sections
    menuElementPositionY += 12;
    fill(MENU_BAR_COLOR);
    stroke(MENU_BAR_COLOR);
    rect(menuElementPositionX, menuElementPositionY, MENU_WIDTH - MENU_ELEMENT_OFFSET_X * 2, 1);
    menuElementPositionY += 1;
    
    // ===========================================================================================
    // Skip animations
    menuElementPositionY += 7;
    skipGenAnimationCheckbox.draw(menuElementPositionX, menuElementPositionY);

    menuElementPositionY += MENU_ELEMENT_OFFSET_Y;
    skipSolverAnimationCheckbox.draw(menuElementPositionX, menuElementPositionY);

    // ===========================================================================================
    // create a horizontal bar to separate sections
    menuElementPositionY += MENU_ELEMENT_OFFSET_Y;
    fill(MENU_BAR_COLOR);
    stroke(MENU_BAR_COLOR);
    rect(menuElementPositionX, menuElementPositionY, MENU_WIDTH - MENU_ELEMENT_OFFSET_X * 2, 1);
    menuElementPositionY += 1;

    // ===========================================================================================
    // we should only have one dropdown active at a time so that they do not lay over each other
    let dropdownActive = false;
    if (!dropdownActive) dropdownActive = mazeGenDropdown.drawDropdown();
    if (!dropdownActive) dropdownActive = mazeSolverDropdown.drawDropdown();
}

// Taken from https://p5js.org/examples/input-mouse-functions.html
let xOffset;
let yOffset;
let locked = false;

function mousePressed() {
    if (menuHidden) return; // no functionalities if menu is hidden

    if (frameRateSlider.mousePressed()) return;
    if (gridSizeSlider.mousePressed()) return;
    if (mazeGenDropdown.mousePressed()) return;
    if (mazeSolverDropdown.mousePressed()) return;
    if (wallDeletionPercentSlider.mousePressed()) return;
    if (skipGenAnimationCheckbox.mousePressed()) return;
    if (skipSolverAnimationCheckbox.mousePressed()) return;
    // ===========================================================================================
    if (overMenu) locked = true;
    else locked = false;

    xOffset = mouseX - menuX;
    yOffset = mouseY - menuY;
}

function mouseDragged() {
    if (menuHidden) return; // no functionalities if menu is hidden

    if (frameRateSlider.mouseDragged()) return;
    if (gridSizeSlider.mouseDragged()) return;
    if (wallDeletionPercentSlider.mouseDragged()) return;

    // ===========================================================================================
    if (locked) {
        menuX = mouseX - xOffset;
        menuY = mouseY - yOffset;

        // reposition so that the menu is always fully on screen
        menuX = Math.max(menuX, 0);
        menuX = Math.min(menuX, windowWidth - MENU_WIDTH);

        menuY = Math.max(menuY, 0);
        menuY = Math.min(menuY, windowHeight - MENU_HEIGHT);
    }
}

function mouseReleased() {
    if (menuHidden) return; // no functionalities if menu is hidden
    
    if (frameRateSlider.mouseReleased()) return;
    if (gridSizeSlider.mouseReleased()) return;
    if (wallDeletionPercentSlider.mouseReleased()) return;

    // ===========================================================================================
    locked = false;
}

// this function hides the menu whenever HIDE_MENU_KEY is pressed
function keyPressed() {
    if (key == HIDE_MENU_KEY) menuHidden = !menuHidden;
}