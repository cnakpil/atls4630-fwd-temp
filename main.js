document.body.classList.toggle("hidden"); 

function doStuff (callback) {
    // do all app scripts here...

    callback();
}

doStuff(function () {
    document.body.classList.toggle("visible"); 
});