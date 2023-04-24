let ROWS;
let COLS;

let FRAMERATE = 60; // some browsers might not support framerates. Max framerate: 60

function init() {
    frameRate(FRAMERATE);

    ROWS = Math.ceil(windowHeight / (CELL_PIXELS + 1));
    COLS = Math.ceil(windowWidth  / (CELL_PIXELS + 1));

    mazeInit();
    menuInit();
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
    // console.log(getFrameRate());
    background(BG_COLOR);
    drawMaze();
    drawMenu();
}
