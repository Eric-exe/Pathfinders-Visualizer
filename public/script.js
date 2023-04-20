const CELL_PIXELS = 20;

let ROWS;
let COLS;

// colors
const BG_COLOR = [33, 37, 43];
const LINE_COLOR = [53, 57, 63];
const WALL_COLOR = [0, 0, 0];
const PATH_COLOR = [33, 37, 43];

function init() {
    ROWS = Math.ceil((windowHeight - windowHeight / CELL_PIXELS) / CELL_PIXELS);
    COLS = Math.ceil((windowWidth - windowWidth / CELL_PIXELS) / CELL_PIXELS);

    mazeInit();
}

function setup() {
    init();
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block');
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
