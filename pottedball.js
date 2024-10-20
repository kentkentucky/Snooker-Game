// Function to remove potted balls
function checkPockets()
{
    // For red balls
    if(rules)
    for(var i = 0; i < pockets.length; i++)
    {
        for(var j = 0; j < redBalls.length; j++)
        {
            if(checkBallOverPocket(redBalls[j], pockets[i]))
            {
                World.remove(engine.world, redBalls[j]);
                pottedBalls.push(redBalls[j]);
                redBalls.splice(j, 1);
                j--;
            }
        }
    }
    
    // For coloured balls
    if(rules)
    {
        for(var i = 0; i < pockets.length; i++)
        {
            for(var j = 0; j < colourBalls.length; j++)
            {
                if(checkBallOverPocket(colourBalls[j], pockets[i]))
                {
                    World.remove(engine.world, colourBalls[j]);
                    pottedBalls.push(colourBalls[j]);
                    regenerateColourBall(ballStartPos[j].colour);
                    colourBalls.splice(j, 1);
                    ballStartPos.splice(j, 1);
                }
            }
        }
    }
    
    // For coloured balls
    if(!rules)
    {
        for(var i = 0; i < pockets.length; i++)
        {
            for(var j = 0; j < colourBalls.length; j++)
            {
                if(checkBallOverPocket(colourBalls[j], pockets[i]))
                {
                    pottedBalls.push(colourBalls[j]);
                    World.remove(engine.world, colourBalls[j]);
                    colourBalls.splice(j, 1);
                    ballStartPos.splice(j, 1);
                }
            }
        }
    }
    
    // For red balls
    if(!rules)
    for(var i = 0; i < pockets.length; i++)
    {
        for(var j = 0; j < redBalls.length; j++)
        {
            if(checkBallOverPocket(redBalls[j], pockets[i]))
            {
                pottedBalls.push(redBalls[j]);
                World.remove(engine.world, redBalls[j]);
                redBalls.splice(j, 1);
                j--;
            }
        }
    }
    
    
    // For cue ball
    if(cueBallG)
    {
        for(var i = 0; i < pockets.length; i++)
        {
            if(checkBallOverPocket(cueBall, pockets[i]))
            {
                World.remove(engine.world, cueBall);
                cueBallG = false;
                break;
            }
        }
    }
}

// Check if ball is over pocket
function checkBallOverPocket(ball, pocket)
{
    var d = dist(ball.position.x, ball.position.y, pocket.position.x, pocket.position.y);
    if(d < pocketD / 1.5)
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Function to check if potted balls are consecutively coloured balls
function checkPottedBall()
{
    if(rules)
    {
        // Hex codes for colors
        var colours = ["blue", "brown", "pink", "yellow", "green", "black"];

        if(pottedBalls.length < 2) 
        {
            return false;
        }

        var lastBall = pottedBalls[pottedBalls.length - 1];
        var secondLastBall = pottedBalls[pottedBalls.length - 2];

        var lastBallColor = lastBall.render.fillStyle;
        var secondLastBallColor = secondLastBall.render.fillStyle;

        // Check if both the last and second last balls are in the colours array
        return colours.includes(lastBallColor) && colours.includes(secondLastBallColor);
    }
    else
    {
        if (pottedBalls.length > 0 && order.length > 0) 
        {
            var lastBall = pottedBalls[pottedBalls.length - 1];
            var lastBallColour = lastBall.render.fillStyle;

            // Compare last potted ball color with the first color in the order array
            if(lastBallColour == order[0] && order.length > 1)
            {
                // Remove the first color from the order array
                order.splice(0, 1); 
                // Remove potted ball
                pottedBalls.splice(0, 1);
                // If there is ony one colour left
                if(order.length == 1)
                {
                    // Enable pocket selection
                    selectingPocket = true;
                }
            }
            // If potted ball does not match colour order
            else if(lastBallColour != order[0])
            {
                // End game
                gameOver = true;
                console.log("You did not follow the order");
            }
        }
    }
}