var title_text = document.getElementById('main_title');
var project_title_text = document.getElementById('projects_title');
var currentGId = 10;
var GChange = 5;
var colorInterval = setInterval(function(){updateColor(title_text);updateColor(project_title_text)}, 40);

function updateColor(element) {
    
    element.style.color = 'rgb(255, ' + currentGId + ', 0)';
    if(currentGId > 250 || currentGId == 0)
        GChange *= -1;
    currentGId += GChange;
}