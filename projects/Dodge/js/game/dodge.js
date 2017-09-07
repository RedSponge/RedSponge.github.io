const fps = 60;

var running = true;

var HPSystem = false;

var frame;

var player;

var game;

var canRestart = false;

function INIT() {
    frame = new Frame();
    frame.init('canvas');
    frame.setBounds(500, 500);
    frame.setText(" ");
    player = Player(frame.getCanvas().width / 2 - 10, frame.getCanvas().height / 2 - 10, 20, 20, 'rgba(0, 255, 0, 1)', 1);
    game = new Game("Dodge", "1.0", ["RedSponge"]);
    game.startMessage();
    mainLoop = setInterval(update, 1000/fps);
    setTimeout(wave1, 500);
}

function Stop() {
    if(HPSystem) {
        player.HP = 0;
        createBackground();
    }
    running = false;
    createBackground();
    clearInterval(mainLoop);
    setTimeout(frame.displayGameOver(), 1000);
    
}



var mainLoop;

function createBackground() {
    
    //BACK TO NORMAL BACKGROUND
    if(frame.goBackBackground) {
        frame.goBackBackground = false;
        var interval = setInterval(function(){
            frame.resetColorFade();
            if(frame.isColorReset()) {
                clearInterval(interval);
            }
        }) 
    }

    // RAINBOW

    if(frame.getRainbow()) {
        frame.getRandomColor();
    }

    //FADE OR CLEAR (SCREEN RESET)
    if(frame.getFade()) {
        frame.getContext().fillStyle = frame.rgbColor;
        frame.getContext().fillRect(0, 0, frame.getCanvas().width, frame.getCanvas().height);
    }
    else {
        frame.getContext().fillStyle = frame.color;
        frame.getContext().fillRect(0, 0, frame.getCanvas().width, frame.getCanvas().height);
    }
    
    // STUFF TO DISPLAY

    if(HPSystem) {
        frame.displayHP();
    }
}

function restart() {
    if(running) {
        console.log("%cThe game is still running!", "color:red");
        return;
    }
    if(!beginTesting) {
        console.log("%cStill finishing a wave!", "color:red");
        return;
    }
    player.reset();
    frame.goBackToDefaultBackground();
    frame.setText(" ");
    createBackground();
    nextWave = wave1;
    frame.setFade(false);
    frame.setRainbow(false);
    enemyList = {};
    beginTesting = false;
    running = true;
    canRestart = false;
    HPSystem = false;
    mainLoop = setInterval(update, 1000/fps);
    setTimeout(wave1, 500);
}

function update() {
    if(running) {
        createBackground();
        frame.fillText();
        player.update();

        for(var i in enemyList) {
            enemyList[i].update();
        }
        for(var i in healingPointsList) {
            healingPointsList[i].update();
        }
    }
}
