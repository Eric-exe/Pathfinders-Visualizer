let ROWS;
let COLS;

// ======================================================================================
const BG_COLOR = [153, 157, 163];
const LINE_COLOR = [BG_COLOR[0] + 20, BG_COLOR[1] + 20, BG_COLOR[2] + 20];
const WALL_COLOR = [0, 0, 0];
const PATH_COLOR = BG_COLOR;
const BEGIN_COLOR = [0, 100, 0];
const END_COLOR = [139, 0, 0];

let CELL_PIXELS = 20;
let SKIP_PRIM_ANIM = false;
// ======================================================================================

function init() {
    ROWS = Math.ceil((windowHeight - windowHeight / CELL_PIXELS) / CELL_PIXELS);
    COLS = Math.ceil((windowWidth - windowWidth / CELL_PIXELS) / CELL_PIXELS);

    mazeInit();
}

function setup() {
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
    background(BG_COLOR);
    drawMaze();
}
