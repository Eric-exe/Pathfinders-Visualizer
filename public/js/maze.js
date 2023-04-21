// ===========================================================================================
// maze vars
let maze;
let beginCell; // [xCoord][yCoord]
let endCell; // [xCoord][yCoord]

// Statistics
let pathLength;
let cellsExplored;

// Creates the maze with simplified Prim's algorithm. Also sets the start and end cells
function mazeInit() {

    pathLength = 0;
    cellsExplored = 0;

    maze = [];

    // generate the maze
    switch (MAZE_GEN) {
        case "prim":
            prim();
            break;
    }
    solverAnim = false; // the animation did not run yet

    // solve the maze
    switch (SOLVER) {
        case "bfs":
            bfs();
            break;
        case "dfs":
            dfs();
            break;
    }
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
let genAnim = false;
let solverAnim = false;
// ===========================================================================================
function drawMaze() {
    drawGrid();

    if (!genAnim) {
        switch (MAZE_GEN) {
            case "prim":
                genAnim = animatePrim();
                break;
        }
    }

    else if (!solverAnim) {
        switch (SOLVER) {
            case "bfs":
                solverAnim = animateBFS();
                break;
            case "dfs":
                solverAnim = animateDFS();
                break;
        }
    }
    
    drawCells();
}