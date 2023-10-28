
//window.pnc_q = [];

window.clickTarget = null;

window.dxy = function(angle, dist) {
    var dx = 0; var dy = 0;
    if (true) {
        var inc_x = angle > 90 && angle < 270 ? -1 : 1;

        dx /*+=*/= inc_x;

        // tan(th) = opp / adj;
        // adj is x or the run
        var rise = Math.tan(angle*Math.PI/180.0);// * 180.0/Math.PI;// * dx;
        var m = rise; //Math.tan(angle);
        var b = 0; // player is origin, angle crossing origin

        dx = /*2*/dist*Math.cos(angle*Math.PI/180.0);  // SOH [CAH] TOA
        dy = (m*(/*x+*/dx) + b);
        //dy *= -1;
    }
    //console.log(dx,dy);
    return { dx: dx, dy: dy };
};

window.deg_0_359 = function(a, b) {
    var ang=Math.atan2(b.y-a.y,b.x-a.x);//*(180.0/Math.PI);
    ang *= 180 / Math.PI;
    if (ang<0) ang = 360+ang;
    return ang;   
};

window.nearest_45 = function(a, b, deg) {
//    console.log('a,b', a,b);
    var angles=[0,45,90,135,180,225,270,315]
    var ang = deg;
//    console.log('non-normalized angle', ang);

    var nearest_angle=angles[0];//900;
    for (var i=0;i<angles.length;i++) {
        if (Math.abs(angles[i]-ang)<Math.abs(nearest_angle-ang)) nearest_angle=angles[i];
    }
    //if (nearest_angle!=0)
//    console.log('nearest', nearest_angle)    
    return nearest_angle;
};

window.pnc = function(x, y) {
    window.clickTarget = { x: x, y: y };
    var playerX = parseInt(
        window.getComputedStyle(player)
            .left
            .replace("px", "")
    );
    var playerY = parseInt(
        window.getComputedStyle(player)
            .top
            .replace("px", "")
    );
    var w= plyrsz[window.nearest_45(0,0,angle)+""].w;//use variable to improve performance
    var h=plyrsz[window.nearest_45(0,0,angle)+""].h;//use variable to improve performance

    playerX += (w/2.0);
    playerY += (h/2.0);

    var [a, b] = [{x: playerX, y: 720-playerY}, {x: x, y: 720-y}];
    angle = deg_0_359(a, b);

    speedf = 1; // speedf = (speedf + 1) % 4; // 0 thru 3 speeds
    // 48 x 43
    //playerX += 24; // player center x
    //playerY += 22; // player center y
    var ang45 = window.nearest_45(a, b, angle);

    var el=document.getElementById("player");
    el.src="images/player"+ang45+".png";

//gameloop();
    //pnc_q.push({a: {x: playerX, y: 720-playerY}, b: {x: x, y: 720-playerY}});
    //pnc_q.push({a: {x: x, y: playerY}, b: {x: x, y: y}});
};
