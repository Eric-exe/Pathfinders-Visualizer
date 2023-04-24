let ROWS;
let COLS;

// ======================================================================================

const BG_COLOR = [153, 157, 163];
const LINE_COLOR = [173, 177, 183];

const WALL_COLOR = [0, 0, 0];
const PATH_COLOR = BG_COLOR;
const BEGIN_COLOR = [0, 100, 0];
const END_COLOR = [139, 0, 0];
const EXPLORED_COLOR = [112, 128, 144];
const RES_COLOR = [0, 76, 153];

const MENU_BG_COLOR = [13, 17, 23];
const MENU_BORDER_COLOR = [213, 217, 223];
const MENU_TEXT_COLOR = [255, 255, 255];

let FRAMERATE = 60; // some browsers might not support framerates. Max framerate: 60
let CELL_PIXELS = 25;

let MAZE_GEN = "primImperfect";
let WALL_DELETION_PERCENT = 25; // to make an imperfect maze, delete a random amount of walls

let MAZE_SOLVER = "aStar";

let SKIP_GEN_ANIM = false;
let SKIP_SOLVER_ANIM = false;
// ======================================================================================

function init() {
    ROWS = Math.ceil(windowHeight / (CELL_PIXELS + 1));
    COLS = Math.ceil(windowWidth  / (CELL_PIXELS + 1));

    mazeInit();
    menuInit();
}

function setup() {
    frameRate(FRAMERATE);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block');
    init();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    init();
}

// ============================================================================================
function draw() {
    // console.log(getFrameRate());
    background(BG_COLOR);
    drawMaze();
    drawMenu();
}
