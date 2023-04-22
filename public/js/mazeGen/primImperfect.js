/*
Simplified Prim's Algorithm
but we delete random number of walls to make the maze imperfect

We delete between 0 and MAX_WALL_DELETION_PERCENT % of walls
*/

function primImperfect() {
    prim(); // run the default prim

    // iterate through the maze, storing all wall coords
    let wallCoords = [];

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            // check if it is wall and if it is, add it to wall coords

            // we are using original state (idx: 1) as the current state hasn't been updated yet
            if (maze[i][j][1] == "wall") wallCoords.push([i, j]);
        }
    }

    // calculate a random number of walls to delete
    let numCellsToDelete = Math.floor(Math.random() * (wallCoords.length * (MAX_WALL_DELETION_PERCENT / 100)));

    for (let i = 0; i < numCellsToDelete; i++) {
        // choose a random index from the wallCoords array
        let idx = Math.floor(Math.random() * wallCoords.length);
        let coords = wallCoords[idx];
        
        // update the original state
        maze[coords[0]][coords[1]][1] = "path";

        // update the primSteps to animate
        primSteps.push(coords);

        // remove the wall from wallCoords
        wallCoords.splice(idx, 1);
    }
}

function animatePrimImperfect() {
    // same animations as animatePrim
    return animatePrim();
}