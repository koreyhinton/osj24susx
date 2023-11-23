window.pointCompassDir = function(dir) {
    var c = document.getElementById("compass");
    if (dir == null) {
        c.src = `images/estrella.png`;
        return;
    }
    c.src = `images/point_${dir}.png`;
};
window.pointCompass = function(currentKey, entranceKeys) {
    var c = document.getElementById("compass");
    var n = "";
    var s = "";
    var w = "";
    var e = "";
    var from = currentKey;
    var fromX = from.charCodeAt(0);
    var fromY = parseInt(from.substring(1));
    for (var i=0; i<entranceKeys.length; i++) {
        var to = entranceKeys[i];
        var toX = to.charCodeAt(0);
        var toY = parseInt(to.substring(1));
        if (toY < fromY) n="n";
        if (toY > fromY) s="s";
        if (toX < fromX) w="w";
        if (toX > fromX) e="e";
    }
    c.src = `images/${n}${s}${w}${e}.png`;
};
