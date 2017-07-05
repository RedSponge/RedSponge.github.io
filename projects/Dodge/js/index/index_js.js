var display_image = document.getElementById('displayImg');

var div_button = document.getElementById('startButton');
var start_text = document.getElementById('startText');

function fadeIn() {
    div_button.style.opacity = 0;
    start_text.style.opacity = 0;
    div_button.className = "fade-in";
    start_text.className = "fade-in-full";

}
function fadeOut() {
    div_button.style.opacity = 0.5;
    start_text.style.opacity = 1;
    div_button.className = "fade-out";
    start_text.className = "fade-out";
}