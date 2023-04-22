/*
Template Algorithm
This is a template JS file for a pathfinder algorithm.

Replace all "template" with your algorithm name.
Fill out the functions as needed.
*/

function template() {
    // This function should solve the maze.

    /*
    Variables that you should CONSIDER when running your algorithm:
    ============================================================================================
    maze          - 2D array representing each cell.
                    Each element/cell contains:
                    [state, original state, x coordinate, y coordinate].

    ROWS          - Number of rows in maze.

    COLS          - Number of columns in maze.

    beginCell     - Array [x position, y position] of the begin cell.

    endCell       - Array [x position, y position] of the end cell.
    ============================================================================================
    */

    /*
    Variables that you should UPDATE when running your algorithm:
    ============================================================================================
    templateSteps - 2D array representing the steps taken by your algorithm.
                    Each element should contain [x position, y position, new state].
                    Example: [1, 2, "visited"]

                    Update templateSteps to visualize the maze being built in animateTemplate().
                    
                    Note: templateSteps should also contain "res" state if you want
                    to visualize the resulting path. Example: [2, 3, "res"]
    
    cellsExplored - Integer counting the number of cells explored. Be sure to include
                    the beginning and end cells.
    
    pathLength    - Integer counting the length of the resulting path.
    ============================================================================================
    */

    // reset variables
    templateSteps = [];
    templateStepCounter = 0;


}

// ===========================================================================================
// these variables help visualize the maze being solved
let templateSteps = [];
let templateStepCounter = 0;
// ===========================================================================================

function animateTemplate() {
    // animate the solving

    // Note: we are using the state, not the original state since maze gen will have been animated
    if (templateStepCounter < templateSteps.length) {
        if (SKIP_SOLVER_ANIM) {
            for (; templateStepCounter < templateSteps.length; templateStepCounter++) {
                let step = templateSteps[templateStepCounter];
                // we ignore cells marked as begin and end
                if (maze[step[0]][step[1]][0] == "begin" || maze[step[0]][step[1]][0] == "end") continue;
                maze[step[0]][step[1]][0] = step[2];
            }
        }
        else {
            let step = templateSteps[templateStepCounter];
            // we ignore cells marked as begin and end
            if (maze[step[0]][step[1]][0] == "begin" || maze[step[0]][step[1]][0] == "end") {
                templateStepCounter++;
                return false;
            }

            maze[step[0]][step[1]][0] = step[2];
            templateStepCounter++;
            return false;
        }
    }
    return true;
}