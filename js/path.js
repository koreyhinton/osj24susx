// PATH GRID
window.pathG = { id: null, value: null };
window.PathGrid = class {
    constructor({w, h}) {
        this.grid = new PF.Grid(w, h);
    }
    clear() {
        for (var x=0; x<this.grid.width; x++)
        for (var y=0; y<this.grid.height; y++)
            this.grid.setWalkableAt(x, y, true);
    }
    addObstacleSets(obstacleSets) {
        for (var i=0; i<obstacleSets.length; i++)
        for (var j=0; j<obstacleSets[i].length; j++)
        {
            var obs = obstacleSets[i][j];
            /* if (obs.x == null || obs.x > 1280 || obs.y == null || this.grid.height == null || this.grid.height - obs.y > 720 || this.grid.height - obs.y < 0) {
                console.warn('setWalkable error, obs:, grid.height:', obs, this.grid.height);
            }*/
            if (obs.x > 1280 || obs.x < 0 || obs.y > 720 || obs.y < 0) {
                // data error (on transition from cell D9 to cell D8)
                continue;
            }
            this.grid.setWalkableAt(obs.x, this.grid.height - obs.y, false);
        }
    }
    clone() {
        return this.grid.clone();
    }
};

// PATH QUEUE
window.pathQ = { values: [] };

// PATH FIND
window.pathFind = function(id, w, h, from, to, obstacleSets) {

    // step 1 - sync up path grid
    let firstCall = (window.pathG.id == null);
    let obstacleSwap = (window.pathG.id !== id);
    if (firstCall) {
        window.pathG.value = new PathGrid({w, h});
    } else if (obstacleSwap) {
        window.pathG.value.clear();
    }
    window.pathG.id = id;
    if (firstCall || obstacleSwap) {
        window.pathG.value.addObstacleSets(obstacleSets);
    }

    if (obstacleSwap) return;

    // step 2 - re-assign path queue
    window.pathQ.values = new PF.AStarFinder()
        .findPath(from.x, from.y, to.x, to.y, window.pathG.value.clone());
    // todo: need to fix the B8, doesn't properly avoid the road barrier on
    // clicking to move the full length of the road.
    // Either the code or the road points need to cover every outline point
    // somehow
};
