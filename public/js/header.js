window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("small-header").style.display = "flex";
        document.getElementById("large-header").style.display = "none";
    } else {
        document.getElementById("small-header").style.display = "none";
        document.getElementById("large-header").style.display = "block";
    }
}


