document.addEventListener('DOMContentLoaded', function() {
    const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('myCanvas'))
    const ctx = canvas.getContext('2d')

    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    const radiusCircle = 10;
    let xCircle = radiusCircle * -1;

    function drawBackground(){
    ctx.fillStyle = "#008000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawCircle(){
        ctx.beginPath()
        ctx.fillStyle = "#eee";
        ctx.arc(xCircle, canvasHeight/2, radiusCircle, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    function animate(){
        xCircle +=2
        if(xCircle>canvasWidth+radiusCircle){
            xCircle = radiusCircle * -1;
        }
        drawBackground()
        drawCircle()
        requestAnimationFrame(animate)
    }

    animate()
})