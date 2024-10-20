// Function to check for collision with cue ball
function checkCollisions() 
{
    // Check if cue ball is generated
    if(cueBallG)
    {
        // Collision for cue ball and red ball
        for(var i = 0; i < redBalls.length; i++)
        {
            var collision = Matter.Collision.collides(cueBall, redBalls[i]);
            if(collision)
            {
                console.log('cue-red');
            }
        }

        // Collision for cue ball and coloured ball
        for(var i = 0; i < colourBalls.length; i++)
        {
            var collision = Matter.Collision.collides(cueBall, colourBalls[i]);
            if(collision)
            {
                console.log('cue-colour');
            }
        }

        // Collision for cue ball and cushion
        for(var i = 0; i < cushions.length; i++)
        {
            var collision = Matter.Collision.collides(cueBall, cushions[i]);
            if(collision)
            {
                console.log('cue-cushion');
            }
        }
    }
}