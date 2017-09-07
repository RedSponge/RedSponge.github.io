function Frame() {
    var canvas;
    var context;

    this.init = function(id) {
        canvas = document.getElementById(id);
        context = canvas.getContext('2d');
        canvas.addEventListener('click', canvasClicked);
    }
    this.setBounds = function(width, height) {
        canvas.width = width;
        canvas.style.width = width.toString() + 'px';
        canvas.height = height;
        canvas.style.height = height.toString() + 'px';
    }
    this.getContext = function() {
        return context;
    }
    this.getCanvas = function() {
        return canvas;
    }
    var fade = false;
    var fadePower = '0.09'
    this.setFade = function(bool) {
        fade = bool;
    }
    this.getFade = function() {
        return fade;
    }
    this.getFadePower = function() {
        return fadePower;
    }
    this.setFadePower = function(newFadePower) {
        fadePower = newFadePower
    }
    this.color = 'white';
    
    this.goBackBackground = false;

    this.defaultColor = [0, 0, 0];

    this.rgbR = this.defaultColor[0];
    this.rgbG = this.defaultColor[1];
    this.rgbB = this.defaultColor[2];

    

    var rainbow = false;

    this.setRainbow = function(bool) {
        rainbow = bool
    }
    this.getRainbow = function() {
        return rainbow;
    }
    var text = "";
    var textSize = 50;
    var textColor = "white";
    var textFont = "comic sans ms";
    var HPText = "HP: "

    this.setText = function(textInput, size, color, font, style) {
        textFont = font || textFont;
        textSize = size || textSize;
        textColor = color || textColor;
        this.getContext().textAlign = "center";
        text = textInput || text;
        this.getContext().font = textSize + "px " + textFont;
    }
    this.displayHP = function() {
        //console.log("Hi");
        this.getContext().fillStyle = 'lightgray';
        this.getContext().font = "30px Comic sans ms";
        this.getContext().fillText(HPText, 30, 25);
        this.getContext().fillStyle = 'green';
        this.getContext().fillText(player.HP, 80, 25);

    }

    this.fillText = function() {
        this.getContext().fillStyle = textColor;
        this.getContext().font = textSize + "px " + textFont;
        this.getContext().fillText(text, this.getCanvas().width / 2, this.getCanvas().height / 2);
    }
    this.resetColorFade = function() {
        if(this.rgbR != this.defaultColor[0]) {
                    if(this.rgbR > this.defaultColor[0]) {
                        this.rgbR--;
                    }
                    else {
                        this.rgbR++;
                    }
                }
                if(this.rgbG != this.defaultColor[1]) {
                    if(this.rgbG > this.defaultColor[1]) {
                        this.rgbG--;
                    }
                    else {
                        this.rgbG++;
                    }
                }
                if(this.rgbB != this.defaultColor[2]) {
                    if(this.rgbB > this.defaultColor[2]) {
                        this.rgbB--;
                    }
                    else {
                        this.rgbB++;
                    }
                }
                this.updateColors();
    }
    this.goBackToDefaultBackground = function() {
        this.goBackBackground = true;
    }

    this.isColorReset = function() {
        return this.rgbB == this.defaultColor[2] && this.rgbG == this.defaultColor[1] && this.rgbR == this.defaultColor[0];
    }

    this.rgbColor = 'rgba(' + this.rgbR + ',' + this.rgbG + ',' + this.rgbB + ',' + this.getFadePower() + ')';

    this.updateColors = function() {
        this.rgbColor = 'rgba(' + this.rgbR + ',' + this.rgbG + ',' + this.rgbB + ',' + this.getFadePower() + ')';
        this.color = 'rgba(' + this.rgbR + ',' + this.rgbG + ',' + this.rgbB + ',' + 1 + ')';
    }
    
    this.updateColors();
    
    this.getRandomColor = function()  {
        
        //var i = Math.random() * 5;

        
        this.rgbR += Math.floor(Math.random() * 20);
        this.rgbG += Math.floor(Math.random() * 20);
        this.rgbB += Math.floor(Math.random() * 20);

        if(this.rgbR > 330)
            this.rgbR = 0;
        if(this.rgbG > 330)
            this.rgbG = 0;
        if(this.rgbB > 330)
            this.rgbB = 0;

        this.updateColors();
    }
    this.displayGameOver = function() {
        if(running) {
            console.log("%cThe Game is still running!", "color:orange");
            return;
        }
        var ctx = context;
        var opacity = 0;
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        var opacityInterval = setInterval(function(){
            opacity += 0.01;
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0,canvas.width,canvas.height);
            frame.setText("Game Over", 80, "rgba(255,255,255,%o)".replace('%o', opacity));
            frame.fillText();
            if(opacity >= 1) {
                clearInterval(opacityInterval);
            }
        }, 1000/60);
        var waitUntilWaveBreak = setInterval(()=>{
            var success = false;
            if(beginTesting) {
                console.log(beginTesting);
                if(!success) {
                    success = true;
                    setTimeout(function(){
                        frame.displayTryAgain();
                        canRestart = true;
                        clearInterval(waitUntilWaveBreak);
                        return;
                    },1000)
                }
            }
        }, 1000);
    }
    this.displayTryAgain = () => {
        var ctx = context;
        ctx.font = "30px impact";
        ctx.fillStyle = "green";
        ctx.fillText("Click to try again", 250, 400);
    }
}