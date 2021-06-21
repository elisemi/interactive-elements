// Dudley Storey on CodePen

var nature = document.getElementById("nature"),
    natureCanvas = nature.getContext('2d'),
    brushRadius = (nature.width / 900) * 5,
    img = new Image();

if (brushRadius < 15) { brushRadius = 15 } // changes eraser size

img.onload = function() {
    natureCanvas.drawImage(img, 0, 0, nature.width, nature.height);
}
img.loc = 'https://i.postimg.cc/vZLT1CWd/2.png'; // image upload
img.filename = '2.png'; // top image from folder
if (window.devicePixelRatio >= 50) {
    var nameParts = img.filename.split('.');
    img.src = img.loc + nameParts[0] + "" + "." + nameParts[1];
} else {
    img.src = img.loc + img.filename;
}

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}

function getBrushPos(xRef, yRef) {
    var natureRect = nature.getBoundingClientRect();
    return {
        x: Math.floor((xRef - natureRect.left) / (natureRect.right - natureRect.left) * nature.width),
        y: Math.floor((yRef - natureRect.top) / (natureRect.bottom - natureRect.top) * nature.height)
    };
}

function drawDot(mouseX, mouseY) {
    natureCanvas.beginPath();
    natureCanvas.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
    natureCanvas.fillStyle = '#fff';
    natureCanvas.globalCompositeOperation = "destination-out";
    natureCanvas.fill();
}

nature.addEventListener("mousemove", function(e) {
    var brushPos = getBrushPos(e.clientX, e.clientY);
    var leftBut = detectLeftButton(e);
    if (leftBut == 1) {
        drawDot(brushPos.x, brushPos.y);
    }
}, false);

nature.addEventListener("touchmove", function(e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
        var brushPos = getBrushPos(touch.pageX, touch.pageY);
        drawDot(brushPos.x, brushPos.y);
    }
}, false);