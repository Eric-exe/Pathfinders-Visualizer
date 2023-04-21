let maze;

// these two variables help us visualize the maze being built
let primSteps = [];
let primStepCounter = 0;

function mazeInit() {
    maze = [];
    for (let i = 0; i < ROWS; i++) {
        maze[i] = [];
        for (let j = 0; j < COLS; j++) {
            maze[i][j] = [ 
                "wall", // type
                "wall", // original state
                CELL_PIXELS * j + j, // x coord
                CELL_PIXELS * i + i, // y coord
            ];
        }
    }
    
    primStepCounter = 0;
    primSteps = prim();

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
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {

            noStroke();
            
            let fillColor;

            switch (maze[i][j][0]) {
                case "wall":
                    fillColor = WALL_COLOR;
                    break;
                case "path":
                    fillColor = PATH_COLOR;
                    break;
            }

            fill(fillColor);
            square(maze[i][j][2], maze[i][j][3], CELL_PIXELS);
        }
    }
}

function drawMaze() {
    drawGrid();

    // is the maze being built?
    if (primStepCounter < primSteps.length) {
        let coords = primSteps[primStepCounter];
        maze[coords[0]][coords[1]][0] = maze[coords[0]][coords[1]][1];
        primStepCounter++;
        console.log("Prim: " + primStepCounter + " / " + primSteps.length);
    }

    drawCells();
}