window.quest = null;
window.acceptQuest = function(index) {
    let keys = Object.keys(window.map);
    let cellSheet = {};
    keys.forEach(key => {
        if (!cellSheet.hasOwnProperty(key)) {
            cellSheet[key] = [];
        }
        let entrances = Object.keys(window.map[key].entrances);
        entrances.forEach(ekey => {
            if (cellSheet[key].indexOf(ekey) < 0) {
                if (key != "TEMPLATE") {
                    cellSheet[key].push(ekey);
                }
            }
        });
    });

    let goal = "";
    if (index == "D9") {
        goal = "F7"
    }

    /*
    console.warn(cellSheet);
    console.warn(Object.keys(cellSheet));
    console.warn(cellSheet['D9']);
    */
    let rp = new window.RoadPath(cellSheet, PF);
    //console.warn(rp);
    let next = rp.nextDirection(index, goal);//"E9");
    window.quest = goal;
    window.pointCompassDir(next);
    //console.warn(next);
};
