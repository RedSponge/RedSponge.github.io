var pages = []
var currentPage = 0;
var maxPage = 1;

const pageChangeAnimationDuration = 250;

/**
 * @param {Number} page
 */
function setDisplayedPage(page) {
    for(p in pages) {
        try {
            pages[p].style.display = "none";
        } catch(e) {
            //console.log("SKIPPED")
        }
    }
    pages[page].style.display = "block";
}

function playHideAnimation(element, movePercent) {
    var currentElement = element;
    currentElement.style.transform = "translate(" + movePercent + "%, 0)";
    currentElement.style.opacity = "0";
    setTimeout(() => backToDefault(element), pageChangeAnimationDuration)
}

function backToDefault(element) {
    var currentElement = element;
    currentElement.style.transform = "";
    currentElement.style.opacity = "1";
}

window.onload = init;
function init() {
   currentDisplayed = document.getElementById('id');
   pages = document.getElementsByClassName("projects_page");
   setDisplayedPage(currentPage);
}

function pageLeft() {
    playHideAnimation(pages[currentPage], -100);
    currentPage--;
    if(currentPage < 0) {
        currentPage = maxPage;
    }
    setTimeout(() => setDisplayedPage(currentPage), pageChangeAnimationDuration);
}

function pageRight() {
    playHideAnimation(pages[currentPage], 100);
    currentPage++;
    if(currentPage > maxPage) {
        currentPage = 0;
    }
    setTimeout(() => setDisplayedPage(currentPage), pageChangeAnimationDuration);
}