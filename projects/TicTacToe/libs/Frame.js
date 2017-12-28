/**
 * 
 * @param {{}} doInitInfo syntax: {doInit:true/false,id:"canvas",dimensions:{width:<WIDTH>,height:<HIEGHT>}
 */
function Frame(doInitInfo) {
    var canvas;
    var ctx;
    var inited = false;
    var border_style = {px:1,method:"solid",color:"black",getString:()=>{
        return border_style.px + "px " + border_style.method + " " + border_style.color;
    }};
    var has_border = false;
    this.Init = (canvasID, dimensions) => {
        if(inited) {
            console.log("This frame object was already Inited");
            return;
        }
        inited = true;
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        this.setBounds(dimensions);
        ctx.clear = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        ctx.circle = (x, y, rad) => {
            ctx.arc(x, y, rad, 0, Math.PI * 2)
        }
        ctx.triangle = (x1, y1, x2, y2, x3, y3) => {
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x1, y1);
        }
        ctx.clearScreen = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawX = (x, y, r) => {
            ctx.moveTo(x - r, y - r);
            ctx.lineTo(x + r, y + r);
            ctx.moveTo(x + r, y - r);
            ctx.lineTo(x - r, y + r);
        }
    }

    this.setBounds = (dimensions) => {
        canvas.width = dimensions.width;
        canvas.style.width = dimensions.width + "px";
        canvas.height = dimensions.height;
        canvas.style.height = dimensions.height + "px";
    }

    this.getDimensions = () => {
        return {width:canvas.width, height:canvas.height}
    }

    this.getCanvas = () => {
        return canvas;
    }

    this.getContext = () => {
        return ctx;
    }

    this.setBorderStyle = (weight, method, color) => {
        var newStyle = {px:weight,method:method,color:color};
        for(var i in newStyle) {
            if(newStyle[i] == undefined) {
                newStyle[i] = border_style[i];
            }
            border_style[i] = newStyle[i];
        }
        //console.log(border_style.getString());
        canvas.style.border = border_style.getString();
    }

    this.toggleBorder = () => {
        has_border = !has_border
        if(has_border)
            canvas.style.border = border_style.getString();
        else
            canvas.style.border = null;
    }

    this.setBackgroundColor = (color) => {
        canvas.style.backgroundColor = color;
    }

    if(doInitInfo != undefined) {
        if(doInitInfo.doInit) {
            this.Init(doInitInfo.id, doInitInfo.dimensions);
        }
    }


}

function Frame_js_Help() {
    console.log("To create a frame, use the %cFrame()%c constructor. the constructor takes one parameter which has to be an object.", 'color:gold;font-size:20px; font-weight:bold;background-color:rgba(198, 102, 67, .1)', 'color:black');
    console.log("the optional parameter has to look like that:");
    console.log("{doInit:true,id:<Canvas Element ID [String]>,dimensions:{width:<Width [Number]>,height:<Height [Number]>}}");
    console.log("For example: {doInit:true,id:\"canvas\",dimensions:{width:640,height:480}}");
    console.log("If you fill this parameter, the frame object will auto-init, if you don't fill it, just use the Init(<Canvas Element ID [String]>, {width: <Width [Number]>, height: <Height [Number]>}) Method");
    console.log("After created, you can use the following methods: setBounds({width:<Width [Number]>, height:<Height [Number]>}), getContext(), getCanvas(), setBackgroundColor(<Color [Number]>), toggleBorder(), setBorderStyle(<Weight [Number]>, <Method (eg. solid) [String]>, <Color [String]>)");
    console.log("In addition, the frame gives the context object (accessed by getContext()) the clear() method which clears the screen and also the circle(<X [Number]>,<Y [Number]>,<Radius [Number]>) method which creates a circle")
}

const Info = {
    Version: "1.0b",
    Author: "RedSponge"
}

window.onload = function() {
    var welcome_message = "Frame.js on version %ver by %auth was loaded, do %fullhelpfunc if you don't know what to do";
    welcome_message = welcome_message.replace('%ver', Info.Version).replace('%auth', Info.Author).replace('%fullhelpfunc', "Frame_js_Help()");
    console.log("%c" + welcome_message ,"background-color:rgba(255, 0, 80, .12)")
}