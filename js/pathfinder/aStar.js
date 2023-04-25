/*
A* Algorithm
*/

function manhattenDist(currentCellX, currentCellY) {
    return (
        Math.abs(endCell[0] - currentCellX) +
        Math.abs(endCell[1] - currentCellY)
    )
}

function aStar() {
    // This function should solve the maze.

    // reset variables
    mazeSolverSteps = []
    mazeSolverCounter = 0

    let paths = {} // the key is traversed to from the value

    // JS doesn't have priority queue so instead, we can use a object
    // The key will be the score and the value will be an array of coordinates relating
    // to cells with the score.
    let pq = {}

    pq[0] = []
    pq[0].push(beginCell) // push the beginning cell to pq
    cellsExplored++

    while (Object.keys(pq).length !== 0) {
        let score = Math.min(...Object.keys(pq).map((key) => parseInt(key))) // get the smallest score

        // get a cell from the smallest score
        let currentCell = pq[score][0]

        // remove the cell from pq
        pq[score].splice(0, 1)

        // if there is an empty array, remove the key
        if (pq[score].length === 0) delete pq[score]

        // check if node is at end cell
        if (currentCell[0] == endCell[0] && currentCell[1] == endCell[1]) break

        // Note: we are using original state because we will not have animated prim which will update the maze
        // AStar uses 2 additional variables, distance from source (+ 1) and manhatten distance

        // check left
        if (
            !paths.hasOwnProperty([currentCell[0], currentCell[1] - 1]) &&
            currentCell[1] > 0 &&
            (maze[currentCell[0]][currentCell[1] - 1][1] == 'path' ||
                maze[currentCell[0]][currentCell[1] - 1][1] == 'end')
        ) {
            paths[[currentCell[0], currentCell[1] - 1]] = currentCell

            let dist = manhattenDist(currentCell[0], currentCell[1] - 1)
            if (!pq[score + 1 + dist]) pq[score + 1 + dist] = []
            pq[score + 1 + dist].push([currentCell[0], currentCell[1] - 1])

            mazeSolverSteps.push([
                currentCell[0],
                currentCell[1] - 1,
                'explored',
            ])
            cellsExplored++
        }

        // check up
        if (
            !paths.hasOwnProperty([currentCell[0] - 1, currentCell[1]]) &&
            currentCell[0] > 0 &&
            (maze[currentCell[0] - 1][currentCell[1]][1] == 'path' ||
                maze[currentCell[0] - 1][currentCell[1]][1] == 'end')
        ) {
            paths[[currentCell[0] - 1, currentCell[1]]] = currentCell

            let dist = manhattenDist(currentCell[0] - 1, currentCell[1])
            if (!pq[score + 1 + dist]) pq[score + 1 + dist] = []
            pq[score + 1 + dist].push([currentCell[0] - 1, currentCell[1]])

            mazeSolverSteps.push([
                currentCell[0] - 1,
                currentCell[1],
                'explored',
            ])
            cellsExplored++
        }

        // check right
        if (
            !paths.hasOwnProperty([currentCell[0], currentCell[1] + 1]) &&
            currentCell[1] < COLS - 1 &&
            (maze[currentCell[0]][currentCell[1] + 1][1] == 'path' ||
                maze[currentCell[0]][currentCell[1] + 1][1] == 'end')
        ) {
            paths[[currentCell[0], currentCell[1] + 1]] = currentCell

            let dist = manhattenDist(currentCell[0], currentCell[1] + 1)
            if (!pq[score + 1 + dist]) pq[score + 1 + dist] = []
            pq[score + 1 + dist].push([currentCell[0], currentCell[1] + 1])

            mazeSolverSteps.push([
                currentCell[0],
                currentCell[1] + 1,
                'explored',
            ])
            cellsExplored++
        }

        // check down
        if (
            !paths.hasOwnProperty([currentCell[0] + 1, currentCell[1]]) &&
            currentCell[0] < ROWS - 1 &&
            (maze[currentCell[0] + 1][currentCell[1]][1] == 'path' ||
                maze[currentCell[0] + 1][currentCell[1]][1] == 'end')
        ) {
            paths[[currentCell[0] + 1, currentCell[1]]] = currentCell

            let dist = manhattenDist(currentCell[0] + 1, currentCell[1])
            if (!pq[score + 1 + dist]) pq[score + 1 + dist] = []
            pq[score + 1 + dist].push([currentCell[0] + 1, currentCell[1]])

            mazeSolverSteps.push([
                currentCell[0] + 1,
                currentCell[1],
                'explored',
            ])
            cellsExplored++
        }
    }

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
