let maze;

function mazeInit() {
    maze = [];
    for (let i = 0; i < ROWS; i++) {
        maze[i] = [];
        for (let j = 0; j < COLS; j++) {
            maze[i][j] = { 
                type : "path",
                x : CELL_PIXELS * j + j,
                y : CELL_PIXELS * i + i
            };
        }
    }

    // place walls on the border
    for (let i = 0; i < COLS; i++) {
        maze[0][i].type = "wall";
        maze[ROWS - 1][i].type = "wall";
    }

    for (let j = 0; j < ROWS; j++) {
        maze[j][0].type = "wall";
        maze[j][COLS - 1].type = "wall";
    }

    return maze;
}

function drawGrid() {
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

            stroke(LINE_COLOR);
            
            let fillColor;

            switch (maze[i][j].type) {
                case "wall":
                    fillColor = WALL_COLOR;
                    break;
                case "path":
                    fillColor = PATH_COLOR;
                    break;
            }

            fill(fillColor);
            square(maze[i][j].x, maze[i][j].y, CELL_PIXELS);
        }
    }
}

function drawMaze() {
    drawGrid();
    drawCells();
}