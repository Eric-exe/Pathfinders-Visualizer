const LINE_COLOR = [173, 177, 183]

const WALL_COLOR = [0, 0, 0]
const PATH_COLOR = [153, 157, 163]
const BEGIN_COLOR = [0, 100, 0]
const END_COLOR = [139, 0, 0]
const EXPLORED_COLOR = [112, 128, 144]
const RES_COLOR = [0, 76, 153]

let CELL_PIXELS = 25

let MAZE_GEN = 'primImperfect'
let WALL_DELETION_PERCENT = 10 // to make an imperfect maze, delete a random amount of walls

let MAZE_SOLVER = 'aStar'

let SKIP_GEN_ANIM = false
let SKIP_SOLVER_ANIM = false
let FANCY_ANIM = true

let ROWS
let COLS

let maze
let beginCell // [x position][y position]
let endCell // [x position][y position]

// Statistics
let pathLength
let cellsExplored

function solveMaze() {
    // reset stats
    menuCellsExplored = 0
    menuPathLength = 0

    // solve the maze
    switch (MAZE_SOLVER) {
        case 'bfs':
            bfs()
            break
        case 'dfs':
            dfs()
            break
        case 'aStar':
            aStar()
            break
    }
    solverAnimated = true
}

function mazeInit() {
    ROWS = Math.ceil(windowHeight / (CELL_PIXELS + 1))
    COLS = Math.ceil(windowWidth / (CELL_PIXELS + 1))

    pathLength = 0
    cellsExplored = 0

    maze = []
    beginCell = []
    endCell = []

    // generate the maze
    switch (MAZE_GEN) {
        case 'prim':
            prim()
            break
        case 'primImperfect':
            primImperfect()
            break
    }
    genAnimated = true

    return maze
}

function resetMaze() {
    // reset menu stats
    menuCellsExplored = 0
    menuPathLength = 0

    if (typeof maze === 'undefined' || !genAnimated) return // if we don't even have a maze, don't run the rest

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            maze[i][j][0] = maze[i][j][1]
        }
    }
}

function drawGrid() {
    strokeWeight(1)
    stroke(LINE_COLOR)

    let x = 0
    while (x <= windowWidth) {
        line(x, 0, x, windowHeight)
        x += CELL_PIXELS
        x += 1 // offset for grid lines
    }

    let y = 0
    while (y <= windowHeight) {
        line(0, y, windowWidth, y)
        y += CELL_PIXELS
        y += 1 // offset for grid lines
    }
}

function getColor(cellType) {
    let fillColor
    switch (cellType) {
        case 'wall':
            fillColor = WALL_COLOR
            break
        case 'path':
            fillColor = PATH_COLOR
            break
        case 'begin':
            fillColor = BEGIN_COLOR
            break
        case 'end':
            fillColor = END_COLOR
            break
        case 'explored':
            fillColor = EXPLORED_COLOR
            break
        case 'res':
            fillColor = RES_COLOR
            break
    }
    return fillColor
}

function drawCells() {
    noStroke()

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (FANCY_ANIM && maze[i][j][4]) { // fancy animations
                // draw the old cell
                fill(getColor(maze[i][j][5]))
                square(maze[i][j][2], maze[i][j][3], CELL_PIXELS)

                // draw new cell
                push()
                noStroke()
                fill(getColor(maze[i][j][0]))

                square(
                    maze[i][j][2] + maze[i][j][6],
                    maze[i][j][3] + maze[i][j][6],
                    CELL_PIXELS - 2 * maze[i][j][6],
                    maze[i][j][7]
                )

                pop()

                // update values
                // centering
                maze[i][j][6] -= 1
                maze[i][j][6] = Math.max(maze[i][j][6], 0)

                // radius
                maze[i][j][7] -= 1
                maze[i][j][7] = Math.max(maze[i][j][7], 0)

                // check if it is done animating
                if (maze[i][j][6] == 0 && maze[i][j][7] == 0)
                    maze[i][j][4] = false
            }

            else {
                fill(getColor(maze[i][j][0]))
                square(maze[i][j][2], maze[i][j][3], CELL_PIXELS)
            }
        }
    }
}

// ===========================================================================================
// Animation states
let genAnimated = false
let solverAnimated = true
// ===========================================================================================
// Generator animation

// these variables help us visualize the maze being built
let mazeGenSteps = []
let mazeGenCounter = 0

function animateMazeGen() {
    // animate the building of the maze
    if (mazeGenCounter < mazeGenSteps.length) {
        let coords = mazeGenSteps[mazeGenCounter]

        if (SKIP_GEN_ANIM) {
            for (; mazeGenCounter < mazeGenSteps.length; mazeGenCounter++) {
                coords = mazeGenSteps[mazeGenCounter]
                maze[coords[0]][coords[1]][0] = maze[coords[0]][coords[1]][1]
            }
            return true
        } else {
            if (FANCY_ANIM) {
                maze[coords[0]][coords[1]][4] = true
                maze[coords[0]][coords[1]][5] = maze[coords[0]][coords[1]][0]
                maze[coords[0]][coords[1]][6] = Math.floor(CELL_PIXELS / 2)
                maze[coords[0]][coords[1]][7] = 10
            }
            maze[coords[0]][coords[1]][0] = maze[coords[0]][coords[1]][1]
            mazeGenCounter++
            return false
        }
    }
    return true
}

// ===========================================================================================
// Solver animation

// these variables help visualize the maze being solved
let mazeSolverSteps = []
let mazeSolverCounter = 0

// these variables are for menu statistics
let menuCellsExplored = 0
let menuPathLength = 0

function animateMazeSolver() {
    // animate the solving
    // Note: we are using the state, not the original state since animateMazeGen() will executed
    if (mazeSolverCounter < mazeSolverSteps.length) {
        if (SKIP_SOLVER_ANIM) {
            for (
                ;
                mazeSolverCounter < mazeSolverSteps.length;
                mazeSolverCounter++
            ) {
                let step = mazeSolverSteps[mazeSolverCounter]
                if (step[2] == 'res') menuPathLength++
                // we ignore cells marked as begin and end
                if (
                    maze[step[0]][step[1]][0] == 'begin' ||
                    maze[step[0]][step[1]][0] == 'end'
                )
                    continue
                maze[step[0]][step[1]][0] = step[2]
                menuCellsExplored++
            }
            return true
        } else {
            let step = mazeSolverSteps[mazeSolverCounter]
            if (step[2] == 'res') menuPathLength++
            // we ignore cells marked as begin and end
            if (
                maze[step[0]][step[1]][0] == 'begin' ||
                maze[step[0]][step[1]][0] == 'end'
            ) {
                mazeSolverCounter++
                menuCellsExplored++
                return false
            }
            if (FANCY_ANIM) {
                maze[step[0]][step[1]][4] = true
                maze[step[0]][step[1]][5] = maze[step[0]][step[1]][0]
                maze[step[0]][step[1]][6] = Math.floor(CELL_PIXELS / 2)
                maze[step[0]][step[1]][7] = 10
            }
            maze[step[0]][step[1]][0] = step[2]
            mazeSolverCounter++
            menuCellsExplored++
            return false
        }
    }
    return true
}

// ===========================================================================================

function drawMaze() {
    drawGrid()

    if (!genAnimated) genAnimated = animateMazeGen()
    else if (!solverAnimated) solverAnimated = animateMazeSolver()

    drawCells()
}
