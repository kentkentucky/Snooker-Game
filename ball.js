// X pos for top of triangle for red balls
var firstRedBallStartPos = (tableWidth / 4 + ballD) - 40;
// Array for red balls
var redBallStartPos = [];
// Array for coloured balls
var defaultColourBallPos = [{colour: 'green', x: baulkLineX, y: -tableHeight / 6},
                            {colour: 'brown', x: baulkLineX, y: 0},
                            {colour: 'yellow', x: baulkLineX, y: tableHeight / 6},
                            {colour: 'blue', x: 0, y: 0},
                            {colour: 'pink', x: (tableWidth / 4) - 40, y: 0},
                            {colour: 'black', x: tableWidth / 2 - tableWidth / 11 + 5, y: 0}];

function generateColourBalls()
{
    // Remove any coloured balls first before generating them
    for(var i = 0; i < colourBalls.length; i++)
    {
        World.remove(engine.world, colourBalls[i]);
    }
    // Initialise colourBalls into empty array
    colourBalls = [];
    // Push coloured balls into array after creating 
    for(var i = 0; i < 6; i++)
    {
        var colourBall = Bodies.circle(ballStartPos[i].x, 
                                       ballStartPos[i].y, 
                                       ballD / 2, 
                                       {restitution: 0.9, friction: 0.005, density: 0.002, render: {fillStyle: ballStartPos[i].colour}});
        colourBalls.push(colourBall);
    }
    // Add array into world
    World.add(engine.world, colourBalls);
}

// Function to regenerate potted balls
function regenerateColourBall(colour)
{
    for(var i = 0; i < defaultColourBallPos.length; i++)
    {
        // Get pos of ball
        if(colour == defaultColourBallPos[i].colour)
        {
            var pos = defaultColourBallPos[i];
        }
    }
    // Create new ball
    var newBall = Bodies.circle(pos.x, 
                                pos.y, 
                                ballD / 2, 
                                {restitution: 0.9, friction: 0.005, density: 0.002, render: {fillStyle: pos.colour}});
    // Push into array
    colourBalls.push(newBall);
    ballStartPos.push(pos);
    // Add into world
    World.add(engine.world, newBall);
}

function drawColourBalls()
{
    // Traverse through array and draw balls
    for(var i = 0; i < colourBalls.length; i++)
    {
        push();
        translate(width / 2, height / 2);
        noStroke();
        fill(ballStartPos[i].colour);
        drawVertices(colourBalls[i].vertices);
        pop();
    }
}

function generateRedBalls()
{
    // Remove any red balls from world
    for(var i = 0; i < redBalls.length; i++)
    {
        World.remove(engine.world, redBalls[i]);
    }
    // Initialise redBalls into empty array
    redBalls = [];
    // Create red ball and push into array
    for(var i = 0; i < redBallStartPos.length; i++)
    {
        var redBall = Bodies.circle(redBallStartPos[i].x, 
                                    redBallStartPos[i].y, ballD / 2, 
                                    {restitution: 0.9, friction: 0.005, density: 0.002, render: {fillStyle: 'red'}});
        redBalls.push(redBall);
    }
    // Add into world
    World.add(engine.world, redBalls);
}

function drawRedBalls()
{
    // Traverse through array and draw balls
    for(var i  = 0; i < redBalls.length; i++)
    {
        push();
        translate(width / 2, height / 2);
        noStroke();
        fill(255, 0, 0);
        drawVertices(redBalls[i].vertices);
        pop();
    }
}

// Draw cue ball
function drawCueBall()
{
    push();
    translate(width / 2, height / 2);
    fill(255);
    noStroke();
    drawVertices(cueBall.vertices);
    pop();
}

function generateCueBall() 
{
    // Generate cue ball only when "w" key is pressed
    if (keyIsDown(87)) 
    {
        // Check if mouse is in D
        var d = dist(mouseX - width / 2, mouseY - height / 2, baulkLineX, 0);
        if (mouseX - width / 2 <= baulkLineX && d < tableHeight / 6) 
        {
            // Ensure no overlap with other balls
            var canPlaceCueBall = true;
            for (var i = 0; i < redBalls.length; i++) 
            {
                var distToRedBall = dist(mouseX - width / 2, mouseY - height / 2, redBalls[i].position.x, redBalls[i].position.y);
                if (distToRedBall < ballD) 
                {
                    canPlaceCueBall = false;
                    break;
                }
            }
            for (var i = 0; i < colourBalls.length; i++) 
            {
                var distToColourBall = dist(mouseX - width / 2, mouseY - height / 2, colourBalls[i].position.x, colourBalls[i].position.y);
                if (distToColourBall < ballD) 
                {
                    canPlaceCueBall = false;
                    break;
                }
            }

            // Add balls only if no other balls are close/blocking
            if (canPlaceCueBall) 
            {
                if (cueBall) 
                {
                    World.remove(engine.world, cueBall);
                }
                cueBall = Bodies.circle(mouseX - width / 2, 
                                        mouseY - height / 2, 
                                        ballD / 2, 
                                        {restitution: 0.9, friction: 0.005, density: 0.002});
                World.add(engine.world, cueBall);
                cueBallG = true;
            }
        }
    }
}

// Check key stroke to determine pos of balls
function checkGameMode()
{
    // Initialise empty arrays
    redBallStartPos = [];
    ballStartPos = [];
    order = [];
    // Keycode = 1
    if(keyCode == 49)
    {
        rules = true;
        // Push pos and colour of ball into array accordingly
        redBallStartPos.push({x: firstRedBallStartPos, y: 0},
                             {x: firstRedBallStartPos + ballD, y: -ballD / 2},
                             {x: firstRedBallStartPos + ballD, y: ballD / 2}, 
                             {x: firstRedBallStartPos + ballD * 2, y: 0},
                             {x: firstRedBallStartPos + ballD * 2, y: ballD},
                             {x: firstRedBallStartPos + ballD * 2, y: -ballD},
                             {x: firstRedBallStartPos + ballD * 3, y: -ballD / 2},
                             {x: firstRedBallStartPos + ballD * 3, y: ballD / 2},
                             {x: firstRedBallStartPos + ballD * 3, y: -ballD * 1.5},
                             {x: firstRedBallStartPos + ballD * 3, y: ballD * 1.5},
                             {x: firstRedBallStartPos + ballD * 4, y: 0},
                             {x: firstRedBallStartPos + ballD * 4, y: ballD},
                             {x: firstRedBallStartPos + ballD * 4, y: -ballD},
                             {x: firstRedBallStartPos + ballD * 4, y: ballD * 2},
                             {x: firstRedBallStartPos + ballD * 4, y: -ballD * 2});
        ballStartPos.push({colour: 'green', x: baulkLineX, y: -tableHeight / 6},
                          {colour: 'brown', x: baulkLineX, y: 0},
                          {colour: 'yellow', x: baulkLineX, y: tableHeight / 6},
                          {colour: 'blue', x: 0, y: 0},
                          {colour: 'pink', x: (tableWidth / 4) - 40, y: 0},
                          {colour: 'black', x: tableWidth / 2 - tableWidth / 11 + 5, y: 0});
    }
    // Keycode = 2
    else if(keyCode == 50)
    {
        rules = true
        // Push pos and colour of ball into array accordingly
        for(var i = 0; i < 15; i++)
        {
            redBallStartPos.push({x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                                  y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)});
        }
        ballStartPos.push({colour: 'green', x: baulkLineX, y: -tableHeight / 6},
                          {colour: 'brown', x: baulkLineX, y: 0},
                          {colour: 'yellow', x: baulkLineX, y: tableHeight / 6},
                          {colour: 'blue', x: 0, y: 0},
                          {colour: 'pink', x: (tableWidth / 4) - 40, y: 0},
                          {colour: 'black', x: tableWidth / 2 - tableWidth / 11 + 5, y: 0});
    }
    // Keycode = 3
    else if(keyCode == 51)
    {
        rules = true;
        // Push pos and colour of ball into array accordingly
        for(var i = 0; i < 15; i++)
        {
            redBallStartPos.push({x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD),
                                  y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)});
        }
        ballStartPos.push({colour: 'green', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)},
                          {colour: 'brown', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)},
                          {colour: 'yellow', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)},
                          {colour: 'blue', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)},
                          {colour: 'pink', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)},
                          {colour: 'black', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)});
    }
    // Keycode = 4
    else if(keyCode == 52)
    {
        rules = false;
        seven = true;
        // Push pos and colour of ball into array accordingly
        redBallStartPos.push({x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD),
                                  y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)});
        ballStartPos.push({colour: 'green', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)},
                          {colour: 'brown', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)},
                          {colour: 'yellow', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)},
                          {colour: 'blue', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)},
                          {colour: 'pink', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)},
                          {colour: 'black', 
                           x: random(-tableWidth / 2 + ballD, tableWidth / 2 - ballD), 
                           y: random(-tableHeight / 2 + ballD, tableHeight / 2 - ballD)});
        generateRandomOrder();
    }
    // Generate the balls
    generateRedBalls();
    generateColourBalls();
}