/*
Template Algorithm
This is a template JS file for a maze generator algorithm.

Replace all "template" with your algorithm name.
Fill out the functions as needed.

NOTE: Your maze generator should always have at least one solution.
*/

function template() {
    /*
    This function should generate the maze.
    */

    /*
    Variables that you should CONSIDER when running your algorithm:
    ============================================================================================
    CELL_PIXELS   - Number of pixels in a length of a square cell.

    ROWS          - Number of rows in maze.

    COLS          - Number of columns in maze.
    ============================================================================================
    */

    /*
    Variables that you should UPDATE when running your algorithm:
    ============================================================================================
    templateSteps - 2D array with each element containing [x position, y position] of a cell.
                    Update templateSteps to visualize the maze being built in animateTemplate().
                    
    maze          - 2D array representing each cell.
                    Each element/cell contains:
                    [state, original state, x coordinate, y coordinate].

                    See example of maze being initialized in primInit() located in prim.js.

    beginCell     - Array [x position, y position] of the begin cell.

    endCell       - Array [x position, y position] of the end cell.
    ============================================================================================
    */

    /*
    NOTE: When generating the maze after initialization, modify the original state of an element 
    in maze instead of state. 
    This allows the animation of your algorithm, seen in animateTemplate().
    */

    // reset variables
    templateSteps = [];
    templateStepCounter = 0;
}

// ===========================================================================================
// these variables help visualize the maze being built
let templateSteps = [];
let templateStepCounter = 0;
// ===========================================================================================

function animateTemplate() {
    // animate the building of the maze
    if (templateStepCounter < templateSteps.length) {

        let coords = templateSteps[templateStepCounter];

        if (SKIP_GEN_ANIM) {
            for (; templateStepCounter < templateSteps.length; templateStepCounter++) {
                coords = templateSteps[templateStepCounter];
                maze[coords[0]][coords[1]][0] = maze[coords[0]][coords[1]][1];
            }
        }
        else {
            maze[coords[0]][coords[1]][0] = maze[coords[0]][coords[1]][1];
            templateStepCounter++;
            return false;
        }
    }
    return true;
}