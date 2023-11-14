document.addEventListener('DOMContentLoaded', function(){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;

    ctx.fillStyle = "#008000";
    ctx.fillRect = (0,0,canvasWidth,canvasHeight);
})