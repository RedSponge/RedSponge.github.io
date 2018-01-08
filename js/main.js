var pages = []
var currentPage = 0;
var maxPage = 1;

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
window.onload = init;
function init() {
   currentDisplayed = document.getElementById('id');
   pages = document.getElementsByClassName("projects_page");
   setDisplayedPage(currentPage);
}

function pageLeft() {
    currentPage--;
    if(currentPage < 0) {
        currentPage = maxPage;
    }
    setDisplayedPage(currentPage);
}

function pageRight() {
    currentPage++;
    if(currentPage > maxPage) {
        currentPage = 0;
    }
    setDisplayedPage(currentPage);
}