/*
Depth first search
*/
function dfs() {
    // reset variables
    dfsSteps = [];
    dfsStepCounter = 0;
    
    paths = {};
    endCellFound = false;
    
    dfsHelper(beginCell);
    cellsExplored++; // include the beginning cell as explored

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
    dfsSteps = dfsSteps.concat(answerPath);
}

let paths = {};
let endCellFound = false;

function dfsHelper(currentCell) {
    // check if we are at the end cell
    if (currentCell[0] == endCell[0] && currentCell[1] == endCell[1]) {
        endCellFound = true;
        return;
    }

    // check left
    if (!endCellFound && !paths.hasOwnProperty([currentCell[0], currentCell[1] - 1]) && currentCell[1] > 0 && (maze[currentCell[0]][currentCell[1] - 1][1] == "path" || maze[currentCell[0]][currentCell[1] - 1][1] == "end")) {
        paths[[currentCell[0], currentCell[1] - 1]] = currentCell;
        dfsSteps.push([currentCell[0], currentCell[1] - 1, "explored"]);
        cellsExplored++;
        dfsHelper([currentCell[0], currentCell[1] - 1]);
    }

    // check up
    if (!endCellFound && !paths.hasOwnProperty([currentCell[0] - 1, currentCell[1]]) && currentCell[0] > 0 && (maze[currentCell[0] - 1][currentCell[1]][1] == "path" || maze[currentCell[0] - 1][currentCell[1]][1] == "end")) {
        paths[[currentCell[0] - 1, currentCell[1]]] = currentCell;
        dfsSteps.push([currentCell[0] - 1, currentCell[1], "explored"]);
        cellsExplored++;
        dfsHelper([currentCell[0] - 1, currentCell[1]]);
    }

    // check right
    if (!endCellFound && !paths.hasOwnProperty([currentCell[0], currentCell[1] + 1]) && currentCell[1] < COLS - 1 && (maze[currentCell[0]][currentCell[1] + 1][1] == "path" || maze[currentCell[0]][currentCell[1] + 1][1] == "end")) {
        paths[[currentCell[0], currentCell[1] + 1]] = currentCell;
        dfsSteps.push([currentCell[0], currentCell[1] + 1, "explored"]);
        cellsExplored++;
        dfsHelper([currentCell[0], currentCell[1] + 1]);
    }

    // check down
    if (!endCellFound && !paths.hasOwnProperty([currentCell[0] + 1, currentCell[1]]) && currentCell[0] < ROWS - 1 && (maze[currentCell[0] + 1][currentCell[1]][1] == "path" || maze[currentCell[0] + 1][currentCell[1]][1] == "end")) {
        paths[[currentCell[0] + 1, currentCell[1]]] = currentCell;
        dfsSteps.push([currentCell[0] + 1, currentCell[1], "explored"]);
        cellsExplored++;
        dfsHelper([currentCell[0] + 1, currentCell[1]]);
    }
}

// ===========================================================================================
// these variables help visualize the maze being solved
let dfsSteps = [];
let dfsStepCounter = 0;
// ===========================================================================================


function animateDFS() {
    // animate the solving

    // Note: we are using the state, not the original state since prim will have been animated
    if (dfsStepCounter < dfsSteps.length) {
        if (SKIP_SOLVER_ANIM) {
            for (; dfsStepCounter < dfsSteps.length; dfsStepCounter++) {
                let step = dfsSteps[dfsStepCounter];
                // we ignore cells marked as begin and end
                if (maze[step[0]][step[1]][0] == "begin" || maze[step[0]][step[1]][0] == "end") continue;
                maze[step[0]][step[1]][0] = step[2];
            }
        }
        else {
            let step = dfsSteps[dfsStepCounter];
            // we ignore cells marked as begin and end

            if (maze[step[0]][step[1]][0] == "begin" || maze[step[0]][step[1]][0] == "end") {
                dfsStepCounter++;
                return false;
            }

            maze[step[0]][step[1]][0] = step[2];
            dfsStepCounter++;
            return false;
        }
    }
    return true;
}