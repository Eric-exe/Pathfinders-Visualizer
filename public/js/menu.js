const MENU_BG_COLOR = [13, 17, 23];
const MENU_BORDER_COLOR = [213, 217, 223];
const MENU_TEXT_COLOR = [255, 255, 255];

const MENU_WIDTH = 325;
const MENU_HEIGHT = 250;
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
let mazeGenDropdown;
let mazeSolverDropdown;
// ======================================================================

const mazeGenAlgorithms = {
    "Non-perfect Prim" : "primImperfect",
    "Prim" : "prim"
}

const mazeSolverAlgorithms = {
    "A*" : "aStar",
    "Breadth First Search" : "bfs",
    "Depth First Search" : "dfs"
}

function menuInit() {
    menuX = windowWidth - MENU_WIDTH - MENU_OFFSET;
    menuY = windowHeight - MENU_HEIGHT - MENU_OFFSET;

    mazeGenDropdown = new Dropdown(mazeGenAlgorithms);
    mazeSolverDropdown = new Dropdown(mazeSolverAlgorithms);
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
    
    // ===========================================================================================
    menuElementPositionY += MENU_ELEMENT_OFFSET_Y;
    textAlign(LEFT);
    fill(MENU_TEXT_COLOR);
    text("Maze Generation Algorithm: ", menuElementPositionX, menuElementPositionY);
    mazeGenDropdown.draw(menuElementPositionX + MENU_WIDTH - 165, menuElementPositionY - 13);

    // ===========================================================================================
    menuElementPositionY += MENU_ELEMENT_OFFSET_Y;
    fill(MENU_TEXT_COLOR);
    text("Maze Solver Algorithm: ", menuElementPositionX, menuElementPositionY);
    mazeSolverDropdown.draw(menuElementPositionX + MENU_WIDTH - 165, menuElementPositionY - 13);

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
    if (mazeGenDropdown.mousePressed()) return;
    if (mazeSolverDropdown.mousePressed()) return;
    
    if (overMenu) locked = true;
    else locked = false;

    xOffset = mouseX - menuX;
    yOffset = mouseY - menuY;
}

function mouseDragged() {
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
    locked = false;
}

// this function hides the menu whenever HIDE_MENU_KEY is pressed
function keyPressed() {
    if (key == HIDE_MENU_KEY) menuHidden = !menuHidden;
}