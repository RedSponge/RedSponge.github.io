function rect(ctx, x, y, width, height, fill, stroke, fillColor, strokeColor) {
    var x = x;
    var y = y;
    var width = width;
    var height = height;
    var fill = fill || true;
    var stroke = stroke || false;
    var fillColor = fillColor || 'black';
    var strokeColor = strokeColor || 'black';
    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.rect(x, y, width, height);
    if(fill) ctx.fill();
    if(stroke) ctx.stroke();
}

function getCollisionTwoRects(rect1, rect2) {
    return (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isObjectEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function isNull(obj) {
    return obj == null || obj == undefined || obj == NaN;
}

function Game(gameName, gameVersion, gameAuthors) {
    const name = gameName;
    const version = gameVersion;
    const authors = gameAuthors;

    this.getName = function() {
        return name;
    }
    this.getVersion = function() {
        return version;
    }
    this.getAuthors = function() {
        return authors;
    }
    this.startMessage = function() {
        var authorsList = "";
        for(var author in this.getAuthors()) {
            authorsList += this.getAuthors()[author];
            if(this.getAuthors().length > (parseInt(author) + 1))
                authorsList += " and ";
        }
        //authorsList -= " and "
        //authorsList -= " and "
        console.log("%c Game " + this.getName() + " in version " + this.getVersion() + " by " +  authorsList + " was started", 'background: rgba(244, 194, 66, 0.5);');
    }
}