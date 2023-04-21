// ===========================================================================================
// maze vars
let maze;
let beginCell; // [xCoord][yCoord]
let endCell; // [xCoord][yCoord]

// Creates the maze with simplified Prim's algorithm. Also sets the start and end cells
function mazeInit() {
    maze = [];

    for (let i = 0; i < ROWS; i++) {
        maze[i] = [];
        for (let j = 0; j < COLS; j++) {
            maze[i][j] = [ 
                "wall", // state
                "wall", // original state, we will need it when the user wants to reset the maze
                CELL_PIXELS * j + j, // x coord
                CELL_PIXELS * i + i, // y coord
            ];
        }
    }

    // now generate the maze
    prim();
    primAnim = false; // the animation did not run yet

    // now solve the maze
    bfs();
    solverAnim = false;
    

    return maze;
}

function drawGrid() {
    strokeWeight(1);
    stroke(LINE_COLOR);

    let x = 0;
    while (x <= windowWidth) {
        line(x, 0, x, windowHeight);
        x += CELL_PIXELS;
        x += 1; // offset for grid lines
    }

    let y = 0;
    while (y <= windowHeight) {
        line(0, y, windowWidth, y);
        y += CELL_PIXELS;
        y += 1; // offset for grid lines
    }
}

function drawCells() {
    noStroke();

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            
            let fillColor;

            switch (maze[i][j][0]) {
                case "wall":
                    fillColor = WALL_COLOR;
                    break;
                case "path":
                    fillColor = PATH_COLOR;
                    break;
                case "begin":
                    fillColor = BEGIN_COLOR;
                    break;
                case "end":
                    fillColor = END_COLOR;
                    break;
                case "explored":
                    fillColor = EXPLORED_COLOR;
                    break;
                case "res":
                    fillColor = RES_COLOR;
                    break;
            }

            fill(fillColor);
            square(maze[i][j][2], maze[i][j][3], CELL_PIXELS);
        }
    }
}

// ===========================================================================================
// Animation states
let primAnim = false;
let solverAnim = false;
// ===========================================================================================
function drawMaze() {
    drawGrid();
    if (!primAnim) primAnim = animatePrim();
    else if (!solverAnim) solverAnim = animateBFS();
    drawCells();
}