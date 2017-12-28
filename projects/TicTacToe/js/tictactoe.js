const settings = {
    tileSize: 200,
    XColor:"red",
    OColor:"blue",
    GridColor:"black",
    normLineWidth:10,
    winLineWidth:5
}

var gameObjects = {
    frame: null,
    board : [
        new Array(3),
        new Array(3),   
        new Array(3)
    ],
    turn: 1,
    playing: true
}

var generalMethods = {
    getTileByCoords: (x, y) => {
        console.log(document.getElementById('container').style.marginRight);
        for(var i = 0 ; i < gameObjects.board.length; i++) {
            for(var j = 0; j < gameObjects.board[i].length; j++) {
                var testedTile = gameObjects.board[i][j];
                if(!testedTile.occupied) {
                    if(
                        testedTile.row * settings.tileSize < x   
                        && testedTile.row * settings.tileSize + settings.tileSize > x
                        && testedTile.col * settings.tileSize < y
                        && testedTile.col * settings.tileSize + settings.tileSize > y
                    ) {
                        return {success:true,tile:testedTile}
                    }
                }
            }
        }
        return false;
    },
    getColArray: (i) => {
        return [gameObjects.board[0][i],gameObjects.board[1][i],gameObjects.board[2][i]]
    },
    turn: (event) => {
        if(!gameObjects.playing) {
            return;
        }
        var x = event.clientX -(window.innerWidth / 2 - settings.tileSize * 1.5);
        var y = event.clientY;
        console.log(x, event.clientX);
        var tileData = generalMethods.getTileByCoords(x, y);
        if(!tileData.success) {
            return;
        }
        var tile = tileData.tile;
        tile.occupied = true;
        tile.type = gameObjects.turn;
        if(gameObjects.turn == 1)
            gameObjects.turn = 2;
        else
            gameObjects.turn = 1;
        generalMethods.render();
        var winData = generalMethods.detectWin();
        if(winData.win) {
            gameObjects.playing = false;
            drawingMethods.drawWinLine(winData.type,winData.startTile,winData.stopTile);
        }
    },
    render: () => {
        gameObjects.frame.getContext().clearScreen();
        drawingMethods.drawGrid();
        drawingMethods.drawTiles();
    },
    detectWin: () => {
        // ROWS AND COLS CHECK
        for(var i = 0; i < gameObjects.board.length; i++) {
            var row = gameObjects.board[i];
            var col = generalMethods.getColArray(i);
            //console.log(col);
            if(row[0].type == row[1].type && row[1].type == row[2].type && row[0].type != 0) {
                return {win:true,type:row[0].type,startTile:row[0],stopTile:row[2]};
            }
            else if(col[0].type == col[1].type && col[1].type == col[2].type && col[0].type != 0) {
                return {win:true,type:col[0].type,startTile:col[0],stopTile:col[2]};
            }
            else if(gameObjects.board[0][0].type == gameObjects.board[1][1].type && gameObjects.board[1][1].type == gameObjects.board[2][2].type && gameObjects.board[0][0].type != 0) {
                return {win:true,type:gameObjects.board[0][0].type,startTile:gameObjects.board[0][0],stopTile:gameObjects.board[2][2]};
            }
            else if(gameObjects.board[2][0].type == gameObjects.board[1][1].type && gameObjects.board[1][1].type == gameObjects.board[0][2].type && gameObjects.board[2][0].type != 0) {
                return {win:true,type:gameObjects.board[2][0].type,startTile:gameObjects.board[2][0],stopTile:gameObjects.board[0][2]};
            }
        }
        return false;
    }
}

var drawingMethods = {
    drawTiles: () => {
        for(var i = 0; i < gameObjects.board.length; i++) {
            for(var j = 0; j < gameObjects.board[i].length; j++) {
                gameObjects.board[i][j].draw();
            }
        }
    },
    drawGrid: () => {
        var ctx = gameObjects.frame.getContext();
        ctx.strokeStyle = settings.GridColor;
        ctx.beginPath();
        ctx.moveTo(0, settings.tileSize);
        ctx.lineTo(settings.tileSize * 3, settings.tileSize);
        ctx.moveTo(0, settings.tileSize * 2);
        ctx.lineTo(settings.tileSize * 3, settings.tileSize * 2);
        ctx.moveTo(settings.tileSize, 0);
        ctx.lineTo(settings.tileSize, settings.tileSize * 3);
        ctx.moveTo(settings.tileSize * 2, 0);
        ctx.lineTo(settings.tileSize * 2, settings.tileSize * 3);
        ctx.stroke();
    },
    drawWinLine: (type, startTile, endTile) => {
        var ctx = gameObjects.frame.getContext();
        ctx.lineWidth = settings.winLineWidth;
        if(type == 1) {
            ctx.strokeStyle = settings.XColor;
        }
        else {
            ctx.strokeStyle = settings.OColor;
        }

        ctx.beginPath();
        ctx.moveTo(startTile.midX, startTile.midY);
        ctx.lineTo(endTile.midX, endTile.midY);
        ctx.stroke();

        ctx.lineWidth = settings.normLineWidth;
    }
}

var initMethods = {
    setBoard: () => {
        for(var i = 0; i < gameObjects.board.length; i++) {
            for(var j = 0; j < gameObjects.board[i].length; j++) {
                gameObjects.board[i][j] = new Tile(i,j);
            }
        }
    },
    fullINIT: () => {
        gameObjects.frame = new Frame({doInit:true,id:"canvas",dimensions:{width:settings.tileSize * 3,height:settings.tileSize * 3}});
        gameObjects.frame.toggleBorder();
        gameObjects.frame.setBorderStyle(10);
        gameObjects.frame.getContext().lineWidth = settings.normLineWidth;
        document.getElementById('container').addEventListener('click', function(){generalMethods.turn(event)}, false);
        initMethods.setBoard();
        generalMethods.render();
    },
}


function Tile(col, row) {
    this.col = col;
    this.row = row;
    this.occupied = false;

    this.type = 0;
    this.midX = this.row * settings.tileSize + settings.tileSize / 2;
    this.midY = this.col * settings.tileSize + settings.tileSize / 2;
    this.r = settings.tileSize / 5;
    this.draw = () => {
        var ctx = gameObjects.frame.getContext();
        ctx.beginPath();
        if(this.type == 0) {
            return;
        }
        else if(this.type == 1) { // if tile is X
            ctx.strokeStyle = settings.XColor;
            ctx.drawX(this.midX, this.midY, this.r);
        }
        else if(this.type == 2) { // if tile is O
            ctx.strokeStyle = settings.OColor;
            ctx.circle(this.midX, this.midY, this.r);
        }
        ctx.stroke();
    }
}


setTimeout(initMethods.fullINIT, 10)