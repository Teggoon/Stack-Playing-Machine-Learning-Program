
    var sketchProc = function(processingInstance) {
     with (processingInstance) {
        size(400, 400);
        frameRate(30);var machineActDistance = random(-1, 1);
var trials = 0;



var distanceX;
var distanceY;
var beginGradient = 20;

var centerX = 200;
var centerY = 200;
var stackMove = 0;
var sWidth = 100;
var sHeight = 100;
var stackMoves=[-1,0,0,-1,1,0,0,1];
var stackPositions = [450,200,200,450,-50,200,200,-50];
var stackX = stackPositions[stackMove];
var stackY = stackPositions[stackMove+1];
var stackV = 4;
var score = 0;

rectMode(CENTER);

var table = [];
var scores = [];

var advanceStack = function() {
    var distX = abs(stackX - centerX);
    var distY = abs(stackY - centerY);
    if (distX < 5){
        distX = 0;
    }
    if (distY < 5){
        distY = 0;
    }
    stackV+=0.1;
    sWidth -= distX;
    sHeight -= distY;
    stackMove = floor(random(4)) * 2;
    stackX = 200 + -stackMoves[stackMove] * 200;
    stackY = 200 + -stackMoves[stackMove + 1] * 200;
    score++;
};

var restartGame = function() {
    stackV = 4;
    stackMove = floor(random(4)) * 2;
    stackX = 200 + -stackMoves[stackMove] * 200;
    stackY = 200 + -stackMoves[stackMove + 1] * 200;
    score = 0;
    sWidth = 100;
    sHeight = 100;
};

var maxIndex = 0;
var secondMaxIndex = 0;
var gradientGapSquare = 1;
var gradientPrevious = -1000;
var setNewDistance = function() {
if (scores[maxIndex] === scores[secondMaxIndex]){
    machineActDistance = random(-1, 1);
    for (var i = 0; i < scores.length; i++){
        if (scores[i] >= scores[maxIndex]){
            secondMaxIndex = maxIndex;
            maxIndex = i;
        } else if (scores[i] >= scores[secondMaxIndex] && scores[i] !== scores[maxIndex]) {
            secondMaxIndex = i; 
        }
    }
    var distanceFromMax = abs(machineActDistance - table[maxIndex]);
    for (var i = 0; i < scores.length; i++){
        if (scores[i] === 0 && abs(machineActDistance - table[i]) < distanceFromMax  / 5) {
            machineActDistance = (machineActDistance + table[maxIndex])/2;
        }
    }
} else {
    maxIndex = 0;
    secondMaxIndex = 0;
    for (var i = 0; i < scores.length; i++){
        if (scores[i] >= scores[maxIndex]){
            secondMaxIndex = maxIndex;
            maxIndex = i;
        } else if (scores[i] >= scores[secondMaxIndex] && scores[i] !== scores[maxIndex]) {
            secondMaxIndex = i; 
        }
    }
    
    var rise = scores[maxIndex] - scores[secondMaxIndex];
    var run = table[maxIndex] - table[secondMaxIndex];
    var gap = run;
    var slope = rise/run;
    if (trials > 1 && scores[trials - 1] <= scores[secondMaxIndex]) {
        gap *= Math.pow(0.5,gradientGapSquare);
        gradientGapSquare++;
    } else {
        gradientGapSquare = 1;
    }
    var newDistance = table[maxIndex] + gap;
    println(newDistance);
    machineActDistance = newDistance;
}
};

var updateData = function() {
table.push(machineActDistance);
scores.push(score);
trials++;
setNewDistance();
};

var die = function() {
updateData();
restartGame();
};

var cut = function() {
    if (abs(stackX - centerX) <= sWidth && abs(stackX - centerX) <= sHeight){
        advanceStack();
    } else {
        die();
    }
};
var offsetX;
var offsetY;
var choices = [];
var dists = [];
var machineDecide = function() {
var convertedDistance = abs((machineActDistance * 100));
offsetX = stackMoves[stackMove] * stackV;
offsetY = stackMoves[stackMove + 1] * stackV;
dists[0] = dist(stackX - offsetX,stackY - offsetY,centerX,centerY);
dists[1] = dist(stackX,stackY,centerX,centerY);
dists[2] = dist(stackX + offsetX,stackY + offsetY,centerX,centerY);

choices[0] = abs(dists[0] - convertedDistance);
choices[1] = abs(dists[1] - convertedDistance);
choices[2] = abs(dists[2] - convertedDistance);


if (choices[1] <= choices[2]){
    cut();
}

};

draw = function() {
    background(245, 245, 245);
    
    fill(136, 219, 169);
    noStroke();
    
    rect(centerX,centerY,sWidth,sHeight);
    
    fill(137, 196, 217);
    rect(stackX,stackY,sWidth,sHeight);
    stackX += stackV*stackMoves[stackMove];
    stackY += stackV*stackMoves[stackMove + 1];
    
    if (stackX < -100 || stackX > 500 || stackY < -100 || stackY > 500){
        die();
    }
    machineDecide();
    
    strokeWeight(5);
    for (var i = 0; i < scores.length; i++){
    stroke(0, 0, 0);
        if (i === maxIndex){
            stroke(255, 0, 0);
        }
        if (i === secondMaxIndex){
            stroke(213, 0, 255);
        }
        point(200 + table[i] * 160, 378 - scores[i] * 2);
    }
    stroke(0, 255, 17);
        point(200 + machineActDistance * 160, 200);
    text(score,20,20);
};


mouseClicked = function() {
    cut();
    
    
};
    }};

    // Get the canvas that Processing-js will use
    var canvas = document.getElementById("mycanvas");
    // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    var processingInstance = new Processing(canvas, sketchProc);
