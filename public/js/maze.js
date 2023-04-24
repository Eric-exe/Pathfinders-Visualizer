const BG_COLOR = [153, 157, 163];
const LINE_COLOR = [173, 177, 183];

const WALL_COLOR = [0, 0, 0];
const PATH_COLOR = [153, 157, 163];
const BEGIN_COLOR = [0, 100, 0];
const END_COLOR = [139, 0, 0];
const EXPLORED_COLOR = [112, 128, 144];
const RES_COLOR = [0, 76, 153];

let CELL_PIXELS = 25;

let MAZE_GEN = "primImperfect";
let WALL_DELETION_PERCENT = 25; // to make an imperfect maze, delete a random amount of walls

let MAZE_SOLVER = "aStar";

let SKIP_GEN_ANIM = false;
let SKIP_SOLVER_ANIM = false;

let maze;
let beginCell; // [x position][y position]
let endCell; // [x position][y position]

// Statistics
let pathLength;
let cellsExplored;

function mazeInit() {

    pathLength = 0;
    cellsExplored = 0;

    maze = [];
    beginCell = [];
    endCell = [];

    // generate the maze
    switch (MAZE_GEN) {
        case "prim":
            prim();
            break;
        case "primImperfect":
            primImperfect();
            break;
    }
    genAnim = false; // the animation did not run yet

    // solve the maze
    switch (MAZE_SOLVER) {
        case "bfs":
            bfs();
            break;
        case "dfs":
            dfs();
            break;
        case "aStar":
            aStar();
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
// Generator animation

// these variables help us visualize the maze being built
let mazeGenSteps = [];
let mazeGenCounter = 0;

function animateMazeGen() {
    // animate the building of the maze
    if (mazeGenCounter < mazeGenSteps.length) {

        let coords = mazeGenSteps[mazeGenCounter];

        if (SKIP_GEN_ANIM) {
            for (; mazeGenCounter < mazeGenSteps.length; mazeGenCounter++) {
                coords = mazeGenSteps[mazeGenCounter];
                maze[coords[0]][coords[1]][0] = maze[coords[0]][coords[1]][1];
            }
            return true;
        }
        else {
            maze[coords[0]][coords[1]][0] = maze[coords[0]][coords[1]][1];
            mazeGenCounter++;
            return false;
        }
    }
    return true;
}

// ===========================================================================================
// Solver animation

// these variables help visualize the maze being solved
let mazeSolverSteps = [];
let mazeSolverCounter = 0;

function animateMazeSolver() {
    // animate the solving
    // Note: we are using the state, not the original state since animateMazeGen() will executed
    if (mazeSolverCounter < mazeSolverSteps.length) {
        if (SKIP_SOLVER_ANIM) {
            for (; mazeSolverCounter < mazeSolverSteps.length; mazeSolverCounter++) {
                let step = mazeSolverSteps[mazeSolverCounter];
                // we ignore cells marked as begin and end
                if (maze[step[0]][step[1]][0] == "begin" || maze[step[0]][step[1]][0] == "end") continue;
                maze[step[0]][step[1]][0] = step[2];
            }
            return true;
        }
        else {
            let step = mazeSolverSteps[mazeSolverCounter];
            // we ignore cells marked as begin and end
            if (maze[step[0]][step[1]][0] == "begin" || maze[step[0]][step[1]][0] == "end") {
                mazeSolverCounter++;
                return false;
            }
            maze[step[0]][step[1]][0] = step[2];
            mazeSolverCounter++;
            return false;
        }
    }
    return true;
}

// ===========================================================================================

function drawMaze() {
    drawGrid();

    if (!genAnim) genAnim = animateMazeGen();
    else if (!solverAnim) solverAnim = animateMazeSolver();
    
    drawCells();
}