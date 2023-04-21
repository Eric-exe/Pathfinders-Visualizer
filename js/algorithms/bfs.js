/*
Breadth first search
*/

// Statistics
let pathLength;
let cellsExplored;

function bfs() {
    // reset
    bfsStepCounter = 0;
    bfsSteps = [];

    pathLength = 0;
    cellsExplored = 0;

    let q = [];
    let paths = {};

    q.push(beginCell);
    cellsExplored++;
    // Note: we are using original state because we will not have animated prim which will update the maze

    while (q.length != 0) {
        let currentCell = q[0];
        q.splice(0, 1);

        // check if node is at end cell
        if (currentCell[0] == endCell[0] && currentCell[1] == endCell[1]) break;

        // check left
        if (!paths.hasOwnProperty([currentCell[0], currentCell[1] - 1]) && currentCell[1] > 0 && (maze[currentCell[0]][currentCell[1] - 1][1] == "path" || maze[currentCell[0]][currentCell[1] - 1][1] == "end")) {
            paths[[currentCell[0], currentCell[1] - 1]] = currentCell;
            q.push([currentCell[0], currentCell[1] - 1]);
            bfsSteps.push([currentCell[0], currentCell[1] - 1, "explored"]);
            cellsExplored++;
        }

        // check right
        if (!paths.hasOwnProperty([currentCell[0], currentCell[1] + 1]) && currentCell[1] < COLS - 1 && (maze[currentCell[0]][currentCell[1] + 1][1] == "path" || maze[currentCell[0]][currentCell[1] + 1][1] == "end")) {
            paths[[currentCell[0], currentCell[1] + 1]] = currentCell;
            q.push([currentCell[0], currentCell[1] + 1]);
            bfsSteps.push([currentCell[0], currentCell[1] + 1, "explored"]);
            cellsExplored++;
        }

        // check up
        if (!paths.hasOwnProperty([currentCell[0] - 1, currentCell[1]]) && currentCell[0] > 0 && (maze[currentCell[0] - 1][currentCell[1]][1] == "path" || maze[currentCell[0] - 1][currentCell[1]][1] == "end")) {
            paths[[currentCell[0] - 1, currentCell[1]]] = currentCell;
            q.push([currentCell[0] - 1, currentCell[1]]);
            bfsSteps.push([currentCell[0] - 1, currentCell[1], "explored"]);
            cellsExplored++;
        }

        // check down
        if (!paths.hasOwnProperty([currentCell[0] + 1, currentCell[1]]) && currentCell[0] < ROWS - 1 && (maze[currentCell[0] + 1][currentCell[1]][1] == "path" || maze[currentCell[0] + 1][currentCell[1]][1] == "end")) {
            paths[[currentCell[0] + 1, currentCell[1]]] = currentCell;
            q.push([currentCell[0] + 1, currentCell[1]]);
            bfsSteps.push([currentCell[0] + 1, currentCell[1], "explored"]);
            cellsExplored++;
        }
    }

    // Because we are using prim's algorithm to generate our maze, we can assume that there is always a path
    // Thus, we can iterate backwards to get the shortest path
    let answerPath = [];

    let currentCell = endCell;
    while (!(currentCell[0] == beginCell[0] && currentCell[1] == beginCell[1])) {
        pathLength += 1;
        currentCell = paths[currentCell.toString()];
        answerPath.push([currentCell[0], currentCell[1], "res"]);
    }
    pathLength += 1; // include the beginning cell

    answerPath.reverse();
    bfsSteps = bfsSteps.concat(answerPath);
}

// ===========================================================================================
// these variables help visualize the maze being solved
let bfsSteps = [];
let bfsStepCounter = 0;
// ===========================================================================================

function animateBFS() {
    // animate the solving

    // Note: we are using the state, not the original state since prim will have been animated
    if (bfsStepCounter < bfsSteps.length) {
        if (SKIP_SOLVER_ANIM) {
            for (; bfsStepCounter < bfsSteps.length; bfsStepCounter++) {
                let step = bfsSteps[bfsStepCounter];
                // we ignore cells marked as begin and end
                if (maze[step[0]][step[1]][0] == "begin" || maze[step[0]][step[1]][0] == "end") continue;
                maze[step[0]][step[1]][0] = step[2];
            }
        }
        else {
            let step = bfsSteps[bfsStepCounter];
            // we ignore cells marked as begin and end

            if (maze[step[0]][step[1]][0] == "begin" || maze[step[0]][step[1]][0] == "end") {
                bfsStepCounter++;
                return false;
            }

            maze[step[0]][step[1]][0] = step[2];
            if (step[2] == "res") console.log("HI");
            bfsStepCounter++;
            return false;
        }
    }
    return true;
}