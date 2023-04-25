/*
Depth first search
*/
function dfs() {
    // reset variables
    mazeSolverSteps = []
    mazeSolverCounter = 0

    paths = {}
    endCellFound = false

    dfsHelper(beginCell)
    cellsExplored++ // include the beginning cell as explored

    // The code below assumes that there is always at least one valid path.
    // Thus, iterate backwards from endCell to beginCell to create the resulting path.
    let answerPath = []

    let currentCell = endCell
    while (
        !(currentCell[0] == beginCell[0] && currentCell[1] == beginCell[1])
    ) {
        pathLength += 1
        currentCell = paths[currentCell.toString()]
        answerPath.push([currentCell[0], currentCell[1], 'res'])
    }
    pathLength += 1 // include the beginning cell

    answerPath.reverse()
    mazeSolverSteps = mazeSolverSteps.concat(answerPath)
}

let paths = {}
let endCellFound = false

function dfsHelper(currentCell) {
    // check if we are at the end cell
    if (currentCell[0] == endCell[0] && currentCell[1] == endCell[1]) {
        endCellFound = true
        return
    }

    // check left
    if (
        !endCellFound &&
        !paths.hasOwnProperty([currentCell[0], currentCell[1] - 1]) &&
        currentCell[1] > 0 &&
        (maze[currentCell[0]][currentCell[1] - 1][1] == 'path' ||
            maze[currentCell[0]][currentCell[1] - 1][1] == 'end')
    ) {
        paths[[currentCell[0], currentCell[1] - 1]] = currentCell

        mazeSolverSteps.push([currentCell[0], currentCell[1] - 1, 'explored'])
        cellsExplored++

        dfsHelper([currentCell[0], currentCell[1] - 1])
    }

    // check up
    if (
        !endCellFound &&
        !paths.hasOwnProperty([currentCell[0] - 1, currentCell[1]]) &&
        currentCell[0] > 0 &&
        (maze[currentCell[0] - 1][currentCell[1]][1] == 'path' ||
            maze[currentCell[0] - 1][currentCell[1]][1] == 'end')
    ) {
        paths[[currentCell[0] - 1, currentCell[1]]] = currentCell

        mazeSolverSteps.push([currentCell[0] - 1, currentCell[1], 'explored'])
        cellsExplored++

        dfsHelper([currentCell[0] - 1, currentCell[1]])
    }

    // check right
    if (
        !endCellFound &&
        !paths.hasOwnProperty([currentCell[0], currentCell[1] + 1]) &&
        currentCell[1] < COLS - 1 &&
        (maze[currentCell[0]][currentCell[1] + 1][1] == 'path' ||
            maze[currentCell[0]][currentCell[1] + 1][1] == 'end')
    ) {
        paths[[currentCell[0], currentCell[1] + 1]] = currentCell

        mazeSolverSteps.push([currentCell[0], currentCell[1] + 1, 'explored'])
        cellsExplored++

        dfsHelper([currentCell[0], currentCell[1] + 1])
    }

    // check down
    if (
        !endCellFound &&
        !paths.hasOwnProperty([currentCell[0] + 1, currentCell[1]]) &&
        currentCell[0] < ROWS - 1 &&
        (maze[currentCell[0] + 1][currentCell[1]][1] == 'path' ||
            maze[currentCell[0] + 1][currentCell[1]][1] == 'end')
    ) {
        paths[[currentCell[0] + 1, currentCell[1]]] = currentCell

        mazeSolverSteps.push([currentCell[0] + 1, currentCell[1], 'explored'])
        cellsExplored++

        dfsHelper([currentCell[0] + 1, currentCell[1]])
    }
}
