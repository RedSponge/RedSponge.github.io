var fps = 10;
var frps = 100;

function Frame() {
    var canvas;
    var ctx;
    var width;
    var height;
    this.time = "morning";
    this.INIT = (canvasID) => {
        canvas = document.getElementById(canvasID);
        ctx = canvas.getContext('2d');
    }
    this.getContext = () => {
        return ctx;
    }
    this.getCanvas = () => {
        return canvas
    }
    this.setBounds = (newWidth, newHeight) => {
        canvas.width = newWidth;
        canvas.style.width = newWidth + "px";
        canvas.height = newHeight;
        canvas.style.height = newHeight + "px";
    }
    this.setBorder = (weight, method, color) => {
        var weight = (weight || 1) + "px";
        var method = method || 'solid';
        var color = color || 'black';
        var fullString = weight + ' ' + method + ' ' + color;
        
        //console.log(fullString)
        canvas.style.border = fullString;
    }
}

var frame;
//var player;

window.onload = setup;

var firework_colors = ['red', 'blue', 'yellow', 'green', 'lime', 'purple', 'gold', 'magenta', 'lightblue', 'white', 'orange', 'pink', 'violet', 'skyblue', 'aqua']
var timeRGBs = {
    dawn: {
        r:160,
        g:255,
        b:226 
    },
    morning: {
        r:135,
        g:181,
        b:255
    },
    evening: {
        r:255,
        g:223,
        b:135
    },
    night: {
        r:6,
        g:5,
        b:35
    },
    midnight: {
        r:0,
        g:0,
        b:0
    },
    getRGB: (daytime) => {
        return "rgba(%r,%g,%b,0.1)".replace('%r', daytime.r).replace('%g', daytime.g).replace('%b', daytime.b);
    }
}


function setup() {
        frame = new Frame();
        frame.INIT('canvas');
        frame.setBounds(500, 500);
        frame.setBorder(1, 'solid', 'black');
        frame.getContext().clear = () => {
            frame.getContext().fillStyle = timeRGBs.getRGB(timeRGBs[frame.time]);
            frame.getContext().fillRect(0, 0, 500, 500)
        };
        updateTimes();
        changeDaytime();
    console.log("%cThe Random Game Was INITed", 'background-color:rgba(198, 178, 135, 0.5)')
}

function generateFirework() {
    var id = Math.random();
    fireworks[id] = new FireworkBase(id);
}

function generateSparks(data) {
    var ids = [];
    for(var i = 0; i < 6; i++) {
        ids.push(Math.random());
    }
    firework_sparks[ids[0]] = new FireworkSpark(data.pos.x, data.pos.y, -1, 1, data.color, ids[0], -1);
    firework_sparks[ids[1]] = new FireworkSpark(data.pos.x, data.pos.y, 1, 1, data.color, ids[1], 1);
    firework_sparks[ids[2]] = new FireworkSpark(data.pos.x, data.pos.y, 1.1, .1, data.color, ids[2], 1)
    firework_sparks[ids[3]] = new FireworkSpark(data.pos.x, data.pos.y, -1.1, .1, data.color, ids[3], -1)
    firework_sparks[ids[4]] = new FireworkSpark(data.pos.x, data.pos.y, 1.1, -.5, data.color, ids[4], 1)
    firework_sparks[ids[5]] = new FireworkSpark(data.pos.x, data.pos.y, -1.1, -.5, data.color, ids[5], -1)
}

function FireworkBase(index) {
    var x = Math.random() * 500;
    var y = 500;
    var speed = Math.random() * 5 + 5;
    var color = firework_colors[Math.round(Math.random() * firework_colors.length)]
    var index = index;
    var heightToGo = Math.random() * 300 + 25;

    this.updatePos = () => {
        y -= speed;
        if(y < heightToGo) {
            generateSparks({pos:{x:x,y:y},color:color})
            delete fireworks[index];
        }
    }

    this.draw = () => {
        frame.getContext().beginPath();
        frame.getContext().arc(x, y, 5, 0, Math.PI * 2);
        frame.getContext().fillStyle = color;
        frame.getContext().fill();
    }

    this.update = () => {
        this.updatePos();
        this.draw();
    }
}

var fireworks = {};
var firework_sparks = {};
var mainInterval;


var firework_gen;

function FireworkSpark(x, y, speedX, speedY, color, id, waveMulty) {
    var x = x;
    var y = y;
    var speedX = speedX * 1.1;
    var speedY = speedY * 1.1;
    var color = color;
    var id = id;
    var waveMulty = waveMulty;
    var lifeTime = 0;
    var wave = 0.01 * waveMulty;

    this.updatePos = () => {
        wave += 0.011 * waveMulty;
        x += speedX - wave;
        y += speedY + wave * waveMulty;
        lifeTime++;
        if(lifeTime > 50) {
            delete firework_sparks[id];
        }
    }
    this.draw = () => {
        frame.getContext().beginPath();
        frame.getContext().arc(x, y, 2, 0, Math.PI * 2);
        frame.getContext().fillStyle = color;
        frame.getContext().fill();                
    }
    this.update = () => {
        this.updatePos();
        this.draw();
    }
}

function setIntervals() {
    clearInterval(mainInterval)
    clearInterval(firework_gen)
    mainInterval = setInterval(()=>{
        frame.getContext().clear()
        for(var i in fireworks) {
            fireworks[i].update();
        }
        for(var i in firework_sparks) {
            firework_sparks[i].update();
        }
    },1000/frps)
    firework_gen = setInterval(()=>{
        generateFirework();
    },
    1000/fps)
}

function updateTimes() {
    fps = parseFloat(document.getElementById('firepersec').value);
    frps = parseFloat(document.getElementById('spd').value);
    setIntervals();
}

function changeDaytime() {
    frame.time = document.getElementById('timeSelect').value;
}
