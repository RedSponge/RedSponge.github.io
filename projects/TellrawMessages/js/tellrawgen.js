function print(text) {
    document.getElementById('code_display').innerHTML = text;
}

var currentAction = null;

function updateAction() {
    currentAction = document.getElementById('selectaction').value;
    var actions = document.getElementsByClassName('actions');
    for(var i in actions) {
        try {
            actions[i].style.display = "none";
        } catch (e) {
            continue;
        }
    }
    console.log(currentAction)
    try {
        var elements = document.getElementsByClassName(currentAction);
        for(var e in elements) {
            elements[e].style.display = "block"; 
        }
    } catch(e) {
        return;
    }
    if(currentAction == "faketp") {
        updateSelect("faketp");
    }
}

function updateEntries() {
    var playerNames = document.getElementsByClassName('playerName');
    for(var i in playerNames) {
        playerNames[i].innerHTML = getPlayer('player');
    }
}

function getPlayer(id) {
    var name = document.getElementById(id).value;
    return (name == NaN || name == undefined || name == null || name == "") ? "PlayerName" : name;
}

function updateSelect(select) {
    if(select == "target") {
        var value = document.getElementById('selecttarget').value;
        var p = document.getElementById('targetdatap');
        var msg = 
            (value == "selector") ? "Please enter selector rules: " : 
            (value == "name") ? "Please enter player name (to send to): " :
            null;
        if(msg == null) {
            p.style.display = "none";
            document.getElementById('targetdata').style.display = "none";
            return;
        }
        p.style.display = "block";
        document.getElementById('targetdata').style.display = "block";
        p.innerHTML = msg;
    }
    else if(select == "faketp") {
        var value = document.getElementById('faketpselect').value;
        document.getElementById(value).style.display = "block";
        document.getElementById((value == "faketpcoords")?"faketpplayer":"faketpcoords").style.display = "none";
        currentAction = value;
    }
}

function generate() {
    var playerName = document.getElementById('player').value;
    var target;
    switch(document.getElementById("selecttarget").value) {
        case "caster":
            target = "@s"   
            break;
        case "closest":
            target = "@p"
            break;
        case "random":
            target = "@r"
            break;
        case "all":
            target = "@a"
            break;
        case "name":
            target = getPlayer('targetdata');
            break;
        case "selector":
            target = "@e[" + document.getElementById('targetdata').value + "]"
            break;
    }
    var command = "/tellraw %t %json";
    command = command.replace('%t', target);
    command = command.replace('%json', getJson(getPlayer('player')));
    document.getElementById('code_display').innerHTML = command;
    return command;
}

function getJson(playerName) {
    if(currentAction == "joinleave") {
        var json = "{\"text\":\"%p %a the game\",\"color\":\"yellow\"}"
        json = json.replace('%p', playerName)
        .replace('%a', document.getElementById('selectjoinleave').value);
    }
    else if(currentAction == "killed") {
        var json = "{\"text\":\"%p1 was %a by %p2\"}"
        json = json.replace('%p1', playerName)
        .replace('%a', document.getElementById('killedaction').value || "killed")
        .replace('%p2', document.getElementById('killedby').value || "RedSpongeYT");
    }
    else if(currentAction == "fakemsg") {
        var json = "{\"text\":\"&lt;%p&gt; %msg\"}"
        json = json.replace('%p', getPlayer('player'))
        .replace('%msg', document.getElementById('fakemsginput').value);
    }
    else if(currentAction == "faketpcoords" || currentAction == "faketp") {
        var json = "{\"text\":\"Teleported %p to %x.5, %y.0, %z.5\"}"
        json = json.replace('%p', getPlayer('player'))
        .replace('%x', document.getElementById('faketpX').value || 0)
        .replace('%y', document.getElementById('faketpY').value || 0)
        .replace('%z', document.getElementById('faketpZ').value || 0);
    }
    else if(currentAction == "faketpplayer") {
        var json = "{\"text\":\"Teleported %p to %t\"}"
        json = json.replace('%p', getPlayer('player'))
        .replace('%t', document.getElementById('faketpplayername').value || "PlayerName");
    }
    return json;
}


var updateInterval;
window.onload = () => {
    currentAction = "joinleave";
    updateSelect("target");
    updateSelect("faketp");
    updateAction();
    updateInterval = setInterval(()=>{
        updateEntries();
        generate();
    },1000/60);
}

function copyCommand() {
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNodeContents(document.getElementById('code_display'));
    
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
}