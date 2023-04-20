const CELL_PIXELS = 20;
ROWS = -1;
COLS = -1;

function init() {
    ROWS = Math.floor(windowWidth / CELL_PIXELS); // how many cells are in a row
    COLS = Math.floor(windowHeight / CELL_PIXELS); // how many cells are in a column
}

function setup() {
    init();
    canvas = createCanvas(ROWS * CELL_PIXELS, COLS * CELL_PIXELS);
    canvas.style('display', 'block');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    init();
}

// ============================================================================================
// all functions pertaining to the maze
function displayMaze() {
    drawGrid();
}

function draw() {
    background(220);
    displayMaze();
}
