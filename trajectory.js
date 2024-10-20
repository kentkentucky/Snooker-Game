// Draw shot guideline
function drawShotLine()
{
    // Check if any ball is moving
    if(checkAllBallMovement())
    {
    
    }
    else
    {
        // Check if cue ball is generated
        if(cueBallG)
        {
            push();
            translate(width / 2, height / 2);

            // Calculate direction vector
            var dir = createVector(cueBall.position.x - (mouseX - width / 2), cueBall.position.y - (mouseY - height / 2));
            // Normalise the vector
            dir.normalize();

            // Calculate trajectory point
            var endTrajectory = createVector(cueBall.position.x + dir.x * 800, cueBall.position.y + dir.y * 800);

            // Check if any ball is in the shot line
            var targetBall = null;
            for(var i = 0; i < redBalls.length; i++) 
            {
                var ball = redBalls[i];
                if(isBallInShotLine(cueBall.position.x, cueBall.position.y, endTrajectory.x, endTrajectory.y, ball.position.x, ball.position.y, ballD / 2)) 
                {
                    targetBall = ball;
                    break;
                }
            }
            for(var i = 0; i < colourBalls.length; i++)
            {
                var ball = colourBalls[i];
                if(isBallInShotLine(cueBall.position.x, cueBall.position.y, endTrajectory.x, endTrajectory.y, ball.position.x, ball.position.y, ballD / 2))
                {
                    targetBall = ball;
                    break;
                }
            }

            
            // If there is a ball in line
            if (targetBall) 
            {
                // Adjust the endTrajectory to the edge of the ball
                // Radius of the ball
                var distanceToEdge = ballD / 2;
                var targetDir = createVector(targetBall.position.x - cueBall.position.x, targetBall.position.y - cueBall.position.y);
                targetDir.normalize();
                endTrajectory = createVector(targetBall.position.x - targetDir.x * distanceToEdge, targetBall.position.y - targetDir.y * distanceToEdge);
            }

            // Draw the main trajectory line
            stroke(255);
            line(cueBall.position.x, cueBall.position.y, endTrajectory.x, endTrajectory.y);

            noStroke();
            pop();
        }
    }
}

function isBallInShotLine(x1, y1, x2, y2, cx, cy, radius) 
{
    // Calculate the distance from the ball center to the line segment
    var dist = pointLineDistance(cx, cy, x1, y1, x2, y2);

    // Check if the distance is less than or equal to the ball's radius
    return dist <= radius;
}

// Calculate shortest distance from ball center to line segment
function pointLineDistance(px, py, x1, y1, x2, y2) 
{
    // Vector from point to first endpoint
    var A = px - x1;
    var B = py - y1;
    // Vector from first endpoint to second endpoint
    var C = x2 - x1;
    var D = y2 - y1;

    // // Calculate the dot product of vectors A and C and the squared length of vector C
    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = -1;
    
    // Calculate the projection of the point onto the line segment
    if (len_sq != 0) param = dot / len_sq;

    // Determine the closest point on the line segment to the point
    var xx, yy;

    if(param < 0) 
    {
        xx = x1;
        yy = y1;
    } 
    else if(param > 1) 
    {
        xx = x2;
        yy = y2;
    } 
    else 
    {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    // Calculate the distance from the point to the closest point on the line segment
    var dx = px - xx;
    var dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
}