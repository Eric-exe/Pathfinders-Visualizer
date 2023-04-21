let ROWS;
let COLS;

// ======================================================================================
const CELL_PIXELS = 20;
const BG_COLOR = [153, 157, 163];
const LINE_COLOR = [BG_COLOR[0] + 20, BG_COLOR[1] + 20, BG_COLOR[2] + 20];
const WALL_COLOR = [0, 0, 0];
const PATH_COLOR = BG_COLOR;
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
