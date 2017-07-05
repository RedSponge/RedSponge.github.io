var activeWave;
var nextWave;

var skipWave = false;
var isSkippable = false;

var beginTesting = false;

var waveInterval = setInterval(function(){
    /*if(isSkippable && skipWave) {
        beginTesting = false;
        isSkippable = false;
        nextWave();
    }*/
    if(beginTesting) {
        if(isObjectEmpty(enemyList)) {
            beginTesting = false;
            nextWave();
        }
    }
}, 1000/60)

async function wave1() {
    player.speed = 2;
    var waveDelay = 1000;
    activeWave = wave1;
    nextWave = wave2;
    for(var i = 0; i <= 5; i++) {
        var y = i * 100;
        if(i == 5)
            y = 480;
        generateEnemy(0, y, 20, 20, 'red', 1, 0, 480);
        await sleep(waveDelay);
    }
    beginTesting = true;

}


var wave2 = async function() { 
        player.speed = 2;
        var waveDelay = 500;
        nextWave = wave3;
        for(var i = 0; i <= 5; i++) {
            var y = i * 100;
            var x;
            if(i % 2 == 0) {
                x = 0;
            }
            else {
                x = 480;
            }
            if(i == 5) {
                y = 480
            }
        generateEnemy(x, y, 20, 20, 'red', 2, 0, 1000);
       await sleep(waveDelay);
    }
    beginTesting = true;

}

var wave3 = async function() {
    player.speed = 3;
    var waveDelay = 500;
    nextWave = wave4;
    bulletRoll(waveDelay, 2, 1);

    beginTesting = true;
}

var wave4 = async function() {
    player.speed = 4;
    var waveDelay = 250;
    nextWave = wave5;
    bulletRoll(10, 10, 5);
    await sleep(500);
    beginTesting = true;
}

var wave5 = async function() {
    player.speed = 5;
    var waveDelay = 300;
    frame.setFade(true);
    frame.setRainbow(true);
    await sleep(waveDelay);
    for(var i = 0 ; i < 5 ; i++) {
        spawnStrongPurple(generateLocation(20),generateLocation(20), 3, 5, 1000);
        await sleep(100);
    }
    nextWave = wave6;
    beginTesting = true;
}

var wave6 = async function() {
    player.speed = 5;
    frame.setFade(false);
    frame.setRainbow(false);
    nextWave = wave7;
    frame.goBackToDefaultBackground();
    await sleep(1000);
    bulletRoll(100, 2, 3);
    for(var i = 0; i < 100; i+= 10) {
        var x = i * 5;
        if(x > 490) {
            x = 490;
        }
        generateEnemy(x, 0, 10, 10, 'yellow', 0, 5, (240 / 5) * 2) ;
    }
    for(var i = 0; i < 100; i+= 10) {
        var y = i * 5;
        if(y > 490) {
            y = 490;
        }
        generateEnemy(0, y, 10, 10, 'yellow', 5, 0, (240 / 5) * 2) ;
    }

    beginTesting = true;
}

var wave7 = async function() {
    var waveDelay = 300;
    var repeat = 10;
    player.speed = 3;
    TwoSidesBullets(waveDelay, 5);
    await sleep(500);
    TwoSidesBullets(waveDelay, 5);
    for(var i = 0; i < repeat; i++) {
        enemyX('pink', 20, 20, 20);
        await sleep(waveDelay);
        enemyCross('pink', 20, 20, 20);
        await sleep(waveDelay);
    }
    nextWave = wave8;
    beginTesting = true;
}

var wave8 = async function() {
    player.speed = 3;
    nextWave = wave9_1;
    var waveDelay = 300;
    var splitting = 2;
    for(var i = 0; i < splitting; i++) {
        generateSplitter(generateLocation(20), generateLocation(20), 20, 20, 3, 500, 500);
    }
    beginTesting = true;
}

var wave9_1 = async function() {
    nextWave = wave9_2;
    isSkippable = true;
    await sleep(5000);
    //console.log("Hello");
    frame.setText("So...", 100);
    await sleep(2000);
    frame.setText("I see you made it here...", 30);
    await sleep(2000);
    frame.setText("You must be proud of yourself..");
    await sleep(2000);
    frame.setText("Thinking you're amazing in this game don't you?", 20);
    await sleep(2000);
    frame.setText("Well.. I think we should make you stop feeling so good about yourself", 15);
    await sleep(3500);
    frame.setText("Guess Making you fail.", 40);
    await sleep(1000);
    frame.setText("Guess Making you fail..");
    await sleep(1000);
    frame.setText("Guess Making you fail...");
    await sleep(5000);
    frame.setText("IS THE ONLY WAY", 50, "Red");
           

    player.speed = 0;
    player.goToCenter();
    await sleep(2000);
    enemyX('red', 20, 20, 0.5, false);
    await sleep(500)
    frame.setText(" ");
    beginTesting = true;
}

var wave9_2 = async function() {
    player.y += 50;
    isSkippable = true;
    frame.setText(" ");
    await sleep(2000);
    frame.setText("...", 60);
    await sleep(1500);
    frame.setText("What?");
    await sleep(1500);
    frame.setText("No.. No Way...");
    await sleep(1500);
    frame.setText("How.. How'd You...");
    await sleep(1500);
    frame.setText("Nevermind, well, let me introduce you to a new element of the game", 15, "lightblue");
    await sleep(2000);
    frame.setText("HP!", 60, "");
    await sleep(5000);
    nextWave = wave9_3
    beginTesting = true;
}

var wave9_3 = async function() {
    player.x -= 100;
    isSkippable = true;
    frame.setText(" ");
    await sleep(2000);
    frame.setText("Ok, so this is how it works", 30, "green");
    await sleep(2000);
    HPSystem = true;
    frame.setText("See the HP text in the high left corner?", 20);
    await sleep(2000);
    frame.setText("this is your HP! now, look what happens when an enemy touches you:", 15);
    await sleep(1000);
    generateEnemy(player.x, 0, 20, 20, 'red', 0, 2, 240);
    nextWave = wave9_4;
    beginTesting = true;
}

var wave9_4 = async function() {
    isSkippable = true;
    await sleep(1500);
    frame.setText("as you can see, your HP just dropped down, and you became invincible..", 15);
    await sleep(1500);
    frame.setText("well.. this is how it is in most games, why am I even explaining?");
    await sleep(1500);
    frame.setText("Anyways, good luck!");
    await sleep(1500);
    frame.setText(" ");
    player.HP = 10;
    nextWave = wave10;
    beginTesting = true;
}

var wave10 = async function() {
    HPSystem = true;
    player.HP = 10;
    player.goToCenter();
    player.speed = 5;
    await sleep(3000);
    frame.setRainbow(true);
    frame.setFade(true);
    for(var i = 0 ; i < 8 ; i++) {
        spawnStrongPurple(generateLocation(20),generateLocation(20), 3, 5, 1000);
        await sleep(100);
    }
    await sleep(200);
    generateSplitter(generateLocation(20), generateLocation(20), 20, 20, 3, 200, 500);
    await sleep(200);
    generateSplitter(generateLocation(20), generateLocation(20), 20, 20, 3, 200, 500);
    await sleep(200);
    generateSplitter(generateLocation(20), generateLocation(20), 20, 20, 3, 200, 500);
    await sleep(200);
    generateSplitter(generateLocation(20), generateLocation(20), 20, 20, 3, 200, 500);
    nextWave = wave11;
    beginTesting = true;
}

var wave11 = async function() {
    frame.setRainbow(false);
    frame.setFade(false);
    frame.goBackToDefaultBackground();
    await sleep(1000);
    frame.setText("I know.. HP is super op");
    await sleep(1500);
    frame.setText("BTW, if you see any green dots, take them");
    await sleep(3000);
    frame.setText("They'll heal you! :)");
    await sleep(2000);
    frame.setText(" ");
    for(var i = 0; i < 10 - player.HP; i++) {
        generateHealingPoint();
    }
    nextWave = wave12;
    await sleep(5000);
    beginTesting = true;
}

var wave12 = async function() {
    for(var i = 0; i < 10; i++) {
        generateSplitter();
        
    }   
}

function generateLocation(enemyWidth) {
    var playerSpaceRad = 30;
    var foundLoc = false;
    var loc;
    while(!foundLoc) {
        loc = Math.random() * 500;
        if((loc > player.x + playerSpaceRad || loc < player.x - playerSpaceRad ) && (loc > player.y + playerSpaceRad || loc < player.y - playerSpaceRad) && loc >= 0 && loc < frame.getCanvas().width - enemyWidth)
            foundLoc = true;
    }
    return loc;
}

function enemyX(color, width, height, speed, isHurting) {
    generateEnemy(0, 0, width, height, color, speed, speed, (240 / speed) * 2, isHurting);
    generateEnemy(frame.getCanvas().width - width, 0, width, height, color, -speed, speed, (240 / speed) * 2, isHurting);
    generateEnemy(frame.getCanvas().width - width, frame.getCanvas().height - height, width, height, color, -speed, -speed, (240 / speed) * 2, isHurting);
    generateEnemy(0, frame.getCanvas().height - height, width, height, color, speed, -speed, (240 / speed) * 2, isHurting);
}

function enemyCross(color, width, height, speed, isHurting) {
    generateEnemy(frame.getCanvas().width / 2 - width / 2, 0, width, height, color, 0, speed, (240 / speed) * 2, isHurting);
    generateEnemy(frame.getCanvas().width / 2 - width / 2, frame.getCanvas().height - height, width, height, color, 0, -speed, (240 / speed) * 2, isHurting);
    generateEnemy(0, frame.getCanvas().height / 2 - height / 2, width, height, color, speed, 0, (240 / speed) * 2, isHurting);
    generateEnemy(frame.getCanvas().width - width, frame.getCanvas().height / 2 - height / 2, width, height, color, -speed, 0, (240 / speed) * 2, isHurting);
}

function spawnStrongPurple(x, y, speedMin, speedMax, lifeTime)  {
    var spdIsValid;
    var vx;
    var vy;
    if(Math.random() > 0.5) {
        vx = getSpdBetweenValues(speedMin, speedMax);
        console.log('x');
        vy = (Math.random() * speedMax * 2) - speedMax;
    }
    else {
        vy = getSpdBetweenValues(speedMin, speedMax);
        console.log('y');
        vx = (Math.random() * speedMax * 2) - speedMax;
    }


    generateEnemy(x, y, 20, 20, 'magenta', vx, vy, lifeTime);

    //debugger;
}

async function TwoSidesBullets(waveDelay, speed) {
    for(var i = 0; i <= 5; i++) {
            var y = i * 100;
            var x;
            if(i % 2 == 0) {
                x = 0;
            }
            else {
                x = 480;
            }
            if(i == 5) {
                y = 480
            }
        generateEnemy(x, y, 20, 20, 'red', speed, 0, 1000);
       await sleep(waveDelay);
    }
}

function getSpdBetweenValues(val1, val2) {
    var spdIsValid = false;
    var spd = (Math.random() * val2 * 2) - val2;

    var negative = spd < 0;

    if(val1 == val2) {
        return val1;
    }

    while(!spdIsValid) {
        if((negative && spd <= -val1) || (!negative && spd >= val1)) {
            spdIsValid = true;
        }        
        else {
            spd = (Math.random() * val2 * 2) - val2;
        }
   }
   return spd;

}

async function generateSplitter(x, y, width, height, speed, timeTillSplit, splittedLifeTime) {
    var id = generateEnemy(x, y, width, height, 'rgba(66, 69, 244, 0.1)', 0, 0, 999999);
    for(var i = 2; i < 10; i++) {
        enemyList[id].color = 'rgba(66, 69, 244,' + (i*0.1) + ')';
        await sleep(20);
    }
    //console.log(id);
    await sleep(splittedLifeTime);
    delete enemyList[id];
    generateEnemy(x, y, width / 2, height / 2, 'rgba(66, 69, 244, 1)', -speed, -speed, splittedLifeTime);
    generateEnemy(x + width / 2, y, width / 2, height / 2, 'rgba(66, 69, 244, 1)', speed, -speed, splittedLifeTime);
    generateEnemy(x, y + height / 2, width / 2, height / 2, 'rgba(66, 69, 244, 1)', -speed, speed, splittedLifeTime);
    generateEnemy(x + width / 2, y + height / 2, width / 2, height / 2, 'rgba(66, 69, 244, 1)', speed, speed, splittedLifeTime);
}

async function bulletRoll(waveDelay, bulletSpeed, times) {
    //player.speed = 3;
    var waveDelay = waveDelay;
    var bulletSpeed = bulletSpeed;
    var bulletLifeTime = (240 / bulletSpeed) * 2;
    for(var i = 0; i < times; i++) { 
        generateEnemy(0, 0, 20, 20, 'red', bulletSpeed, bulletSpeed, bulletLifeTime);
        await sleep(waveDelay);
        generateEnemy(240, 0, 20, 20, 'red', 0, bulletSpeed, bulletLifeTime);
        await sleep(waveDelay);
        generateEnemy(480, 0, 20, 20, 'red', -bulletSpeed, bulletSpeed, bulletLifeTime);
        await sleep(waveDelay);
        generateEnemy(480, 240, 20, 20, 'red', -bulletSpeed, 0, bulletLifeTime);
        await sleep(waveDelay);
        generateEnemy(480, 480, 20, 20, 'red', -bulletSpeed, -bulletSpeed, bulletLifeTime);
        await sleep(waveDelay);
        generateEnemy(240, 480, 20, 20, 'red', 0, -bulletSpeed, bulletLifeTime);
        await sleep(waveDelay);
        generateEnemy(0, 480, 20, 20, 'red', bulletSpeed, -bulletSpeed, bulletLifeTime);
        await sleep(waveDelay);
        generateEnemy(0, 240, 20, 20, 'red', bulletSpeed, 0, bulletLifeTime);
        await sleep(waveDelay);
    }
}