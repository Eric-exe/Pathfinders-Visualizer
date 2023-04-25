let FRAMERATE = 60 // some browsers might not support framerates. Max framerate: 60

const BG_COLOR = [153, 157, 163]

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    canvas.style('display', 'block')

    frameRate(FRAMERATE)
    menuInit()
}

// ============================================================================================
function draw() {
    background(BG_COLOR)
    drawMaze()
    drawMenu()
}
