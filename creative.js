function generateRandomOrder()
{
    order = [];
    // Hex codes for colors
    var colours = ["blue", "red", "brown", "pink", "yellow", "green", "black"];
    
    // Shuffle the colors array using Fisher-Yates algorithm
    for (let i = colours.length - 1; i > 0; i--) 
    {
        const j = Math.floor(Math.random() * (i + 1));
        [colours[i], colours[j]] = [colours[j], colours[i]];
    }
    
    // Assign colours to order
    order = colours;
}

// Draw order of colours on the top right of the screen
function drawColours()
{
    for(var i  = 0; i < order.length; i++)
    {
        push();
        translate(width / 2, height / 2);
        fill(order[i]);
        rectMode(CENTER);
        rect(300 + (i * 30), -tableHeight / 2 - 130, 20, 20);
        pop();
    }
}

// Print choose pocket
function callPocket()
{
    console.log("Choose pocket");
}

// Highlight all the pockets 
function highlightPockets()
{
    fill(0, 255, 0, 100);
    noStroke();
    for(var i = 0; i < pockets.length; i++)
    {
        ellipse(pockets[i].position.x + width / 2, pockets[i].position.y + height / 2, pocketD);
    }
}

// Get pocket to pot the last ball in
function potLastBallInPocket(pocket, number) 
{   
    console.log("Potting last ball at pocket: " +getPocketByNumber(number));
    chosenPocket = pocket;
}

// Map number to specific pocket
function getPocketByNumber(number) 
{
    switch(number) 
    {
        case 0:
            return "top-left pocket"; // Top-right corner pocket
        case 1:
            return "top-middle pocket" // Top-left corner pocket
        case 2:
            return "top-right pocket" // Top-middle pocket
        case 3:
            return "bottom-left pocket"; // Bottom-left corner pocket
        case 4:
            return "bottom-middle pocket"; // Bottom-middle pocket
        case 5:
            return "bottom-right pocket"; // Bottom-right corner pocket
        default:
            return null; // Invalid number
    }
}

// Check if last ball is potted into selected pocket
function checkLastBallInPocket() 
{
    // Check pottedBalls have 1 ball inside and chosenPocket is not null
    if (pottedBalls.length == 1 && chosenPocket) 
    {
        var lastBall = pottedBalls[0];
        // Get distance of ball position and pocket position
        var d = dist(lastBall.position.x, lastBall.position.y, chosenPocket.position.x, chosenPocket.position.y);
        // Check if ball went through chosen pocket
        if (d < pocketD / 1.5) 
        {
            // Player won
            console.log("Ball entered the chosen pocket!");
            console.log("You won!");
            order.pop();
            World.remove(engine.world, lastBall);
            pottedBalls.pop();
            chosenPocket = null;
        } 
        // Ball did not go through chosen pocket
        else 
        {
            // Player lost 
            console.log("Game Over: Ball did not enter the chosen pocket.");
            gameOver = true;
        }
    }
}