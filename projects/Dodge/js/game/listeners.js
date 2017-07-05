document.onkeydown = function() {
    var key = event.keyCode;
    //console.log(key);
    switch(key) {
        case 37:
            player.keyLeft = true;
            break;
        case 38:
            player.keyUp = true;
            break;
        case 39:
            player.keyRight = true;
            break;
        case 40:
            player.keyDown = true;
            break;
        case 220:
            skipWave = true;
            break;

    }
}

document.onkeyup = function() {
    var key = event.keyCode;

    switch(key) {
        case 37:
            player.keyLeft = false;
            break;
        case 38:
            player.keyUp = false;
            break;
        case 39:
            player.keyRight = false;
            break;
        case 40:
            player.keyDown = false;
            break;
        case 220:
            skipWave = false;
            break;
        case 49:
            wave1();
            break;
        case 50:
            wave2();
            break;
        case 51:
            wave3();
            break;
        case 52:
            wave4();
            break;
        case 53:
            wave5();
            break;
        case 54:
            wave6();
            break;
        case 55:
            wave7();
            break;
        case 56:
            wave8();
            break;
        case 57:
            wave9_1();
            break;
        case 48:
            wave10();
            break;
    }
}

window.onload = function() {
    //console.log("Hi");
    INIT();
}
