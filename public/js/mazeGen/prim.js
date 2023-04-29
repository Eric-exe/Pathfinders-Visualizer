/*
Simplified Prim's Algorithm
*/

// Note: It always generates a perfect maze.
// This means that

function primInit() {
    for (let i = 0; i < ROWS; i++) {
        maze[i] = []
        for (let j = 0; j < COLS; j++) {
            maze[i][j] = [
                'wall', // state
                'wall', // original state, we will need it when the user wants to reset the maze
                CELL_PIXELS * j + j, // x coord
                CELL_PIXELS * i + i, // y coord
                false, // is it being animated right now? (for fancy animations)
                'wall', // old state (we set these later)
                0, // centering (we set these later)
                0, // radius (we set these later)
            ]
        }
    }
}

function prim() {
    primInit()
    // edge case
    if (ROWS === 0 || COLS === 0) return

    let x = Math.floor(Math.random() * ROWS)
    let y = Math.floor(Math.random() * COLS)

    mazeGenSteps = []
    mazeGenCounter = 0

    generatePrimMaze(x, y)

    if (mazeGenSteps.length < 2) return
    // choose two random steps to be the begin and end cells
    let beginIdx = Math.floor(Math.random() * mazeGenSteps.length)
    beginCell = mazeGenSteps[beginIdx]
    maze[beginCell[0]][beginCell[1]][1] = 'begin'

    // in the rare case beginIdx equals to endIdx
    let endIdx = Math.floor(Math.random() * mazeGenSteps.length)
    while (beginIdx == endIdx)
        endIdx = Math.floor(Math.random() * mazeGenSteps.length)
    endCell = mazeGenSteps[endIdx]
    maze[endCell[0]][endCell[1]][1] = 'end'
}

function generatePrimMaze(x, y) {
    maze[x][y][1] = 'path'
    mazeGenSteps.push([x, y])

    let unexplored = []

    while (true) {
        if (x >= 2 && maze[x - 2][y][1] == 'wall')
            unexplored.push([x - 1, y, x - 2, y])
        if (y >= 2 && maze[x][y - 2][1] == 'wall')
            unexplored.push([x, y - 1, x, y - 2])
        if (x < ROWS - 2 && maze[x + 2][y][1] == 'wall')
            unexplored.push([x + 1, y, x + 2, y])
        if (y < COLS - 2 && maze[x][y + 2][1] == 'wall')
            unexplored.push([x, y + 1, x, y + 2])

        if (unexplored.length === 0) break

        let idx = Math.floor(Math.random() * unexplored.length)
        let coords = unexplored[idx]
        unexplored.splice(idx, 1)

        if (maze[coords[2]][coords[3]][1] == 'wall') {
            maze[coords[0]][coords[1]][1] = 'path'
            mazeGenSteps.push([coords[0], coords[1]])

            maze[coords[2]][coords[3]][1] = 'path'
            mazeGenSteps.push([coords[2], coords[3]])

            x = coords[2]
            y = coords[3]
        }
    }
}
