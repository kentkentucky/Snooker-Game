// Function to draw cue
function drawCue()
{
    // Check for any ball movement
    if(checkAllBallMovement())
    {
        
    }
    // Draw cue when all balls are not moving
    else
    {
        // Check is cue ball is generated
        if(cueBallG)
        {
            push();
            translate(width / 2, height / 2);

            // Calculate the direction vector from the mouse position to the cue ball
            var dir = createVector(cueBall.position.x - (mouseX - width / 2), cueBall.position.y - (mouseY - height / 2));
            // Calculate the angle of the cue
            var angle = atan2(dir.y, dir.x);

            // Set cue properties
            var cueLength = 500;
            var cueWidth = 10;
            var cueOffset = 0;

            if(sliderMoving)
            {
                cueOffset = forceSlider.value() / 2;
            }
            else
            {
                cueOffset = 0;
            }

            // Draw the cue
            fill(196, 99, 22);
            noStroke();
            rectMode(CENTER);

            push();
            // Move to cue ball position
            translate(cueBall.position.x, cueBall.position.y);
            // Rotate to align with the direction
            rotate(angle);
            // Move the cue with slider
            translate(-cueOffset, 0);
            rect(-cueLength / 2 - 40, 0, cueLength, cueWidth);
            fill(65, 105, 225);
            rect(-40, 0, 10, cueWidth);
            fill(110, 38, 14);
            rect(-cueLength - 40, 0, 230, cueWidth);
            pop();

            pop();
        }
    }
}