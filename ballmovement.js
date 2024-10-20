// Function to check if any ball is moving
function checkAllBallMovement()
{
    if(cueBallG)
    {
        if(checkBallMovement(cueBall))
        {
            return true;
        }

        for(var i = 0; i < redBalls.length; i++)
        {
            if(checkBallMovement(redBalls[i]))
            {
                return true;
            }
        }

        for(var i = 0; i < colourBalls.length; i++)
        {
            if(checkBallMovement(colourBalls[i]))
            {
                return true;
            }
        }
        return false;
    }
}

function checkBallMovement(ball)
{
    var speed = Math.sqrt(ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y);
    return speed > 0.1;
}