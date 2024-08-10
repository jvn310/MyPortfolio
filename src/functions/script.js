document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("loading-spinner").style.display = "flex";
    setTimeout(function() {
        window.location.href = "about.html";
    }, 100); 
});
