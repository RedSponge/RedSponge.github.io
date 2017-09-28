var title_text = document.getElementById('main_title');
var project_title_text = document.getElementById('projects_title');
var currentGId = 10;
var GChange = 5;
var colorInterval = setInterval(function(){
    var elements = document.getElementsByClassName('glowing');
    for(var i in elements) {
        updateColor(elements[i]);
    }
}, 40);

function updateColor(element) {
    
    element.style.color = 'rgb(255, ' + currentGId + ', 0)';
    if(currentGId > 250 || currentGId == 0)
        GChange *= -1;
    currentGId += GChange;
}