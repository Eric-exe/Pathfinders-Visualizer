/*
Simplified Prim's Algorithm
*/

function primInit() {
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
}

function prim() {
    primInit();
    // edge case
    if (ROWS == 0 || COLS == 0) return;

    let x = Math.floor(Math.random() * (ROWS));
    let y = Math.floor(Math.random() * (COLS));

    primSteps = [];
    generateMaze(x, y);
    
    if (primSteps.length < 2) return;
    // choose two random steps to be the begin and end cells
    let beginIdx = Math.floor(Math.random() * primSteps.length);
    beginCell = primSteps[beginIdx];
    maze[beginCell[0]][beginCell[1]][1] = 'begin';
    
    // in the rare case beginIdx equals to endIdx
    let endIdx = Math.floor(Math.random() * primSteps.length);
    while (beginIdx == endIdx) endIdx = Math.floor(Math.random() * primSteps.length);
    endCell = primSteps[endIdx];
    maze[endCell[0]][endCell[1]][1] = 'end';

    primStepCounter = 0;
}

let unexplored = [];

function generateMaze(x, y) {
    maze[x][y][1] = "path";
    primSteps.push([x, y]);

    if (x >= 2 && maze[x - 2][y][1] == "wall") unexplored.push([x - 1, y, x - 2, y]);
    if (y >= 2 && maze[x][y - 2][1] == "wall") unexplored.push([x, y - 1, x, y - 2]);
    if (x < ROWS - 2 && maze[x + 2][y][1] == "wall") unexplored.push([x + 1, y, x + 2, y]);
    if (y < COLS - 2 && maze[x][y + 2][1] == "wall") unexplored.push([x, y + 1, x, y + 2]);

    while (unexplored.length != 0) {
        let idx = Math.floor(Math.random() * unexplored.length);
        let coords = unexplored[idx];
        unexplored.splice(idx, 1);

        if (maze[coords[2]][coords[3]][1] == "wall") {
            maze[coords[0]][coords[1]][1] = "path";
            primSteps.push([coords[0], coords[1]]);
            generateMaze(coords[2], coords[3]);
        }
    }
}

// ===========================================================================================
// these variables help visualize the maze being built
let primSteps = [];
let primStepCounter = 0;
// ===========================================================================================

function animatePrim() {
    // animate the building of the maze
    if (primStepCounter < primSteps.length) {

        let coords = primSteps[primStepCounter];

        if (SKIP_PRIM_ANIM) {
            for (; primStepCounter < primSteps.length; primStepCounter++) {
                coords = primSteps[primStepCounter];
                maze[coords[0]][coords[1]][0] = maze[coords[0]][coords[1]][1];
            }
        }
        else {
            maze[coords[0]][coords[1]][0] = maze[coords[0]][coords[1]][1];
            primStepCounter++;
            return false;
        }
    }
    return true;
}