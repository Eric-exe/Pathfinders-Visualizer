/*
Template Algorithm
This is a template JS file for a pathfinder algorithm.

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
    mazeSolverSteps - 2D array representing the steps taken by your algorithm.
                      Each element should contain [x position, y position, new state].
                      Example: [1, 2, "visited"]
                      
                      Update mazeSolverSteps to visualize the maze being built in 
                      animateMazeSolver().
                    
                      Note: templateSteps should also contain "res" state if you want
                      to visualize the resulting path. Example: [2, 3, "res"]
    
    cellsExplored   - Integer counting the number of cells explored. Be sure to include
                      the beginning and end cells.
    
    pathLength      - Integer counting the length of the resulting path.
    ============================================================================================
    */

    // Afterwords, update the menu in menu.js to display your pathfinder algorithm.

    // reset variables
    mazeSolverSteps = []
    mazeSolverCounter = 0
}
