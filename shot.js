// Intialise direction to move slider
var sliderDir = 1;

function cueForce(force)
{
    // Check if cue ball is generated
    if(cueBallG)
    {
        // Calculate the direction vector from cue ball to mouse
        var dir = createVector(cueBall.position.x - (mouseX - width / 2), cueBall.position.y - (mouseY - height / 2));
        // Calculate angle from direction vector
        var angleToBall = atan2(dir.y, dir.x);
        // Normalise direction vector to get unit vector
        dir.normalize();
        // Scale the slider value
        var forceMagnitude = force / 1000;

        //Calculate applied force in x and y direction
        var appliedForce = {x: forceMagnitude * Math.cos(angleToBall), y: forceMagnitude * Math.sin(angleToBall)};

        // Apply force
        Body.applyForce(cueBall, cueBall.position, {x: appliedForce.x, y:appliedForce.y});
    }
}

// Function to move slider to get force
function sliderMovement()
{
    // Check if slider is moving, no balls are moving and cue ball is generated
    if(sliderMoving && !checkAllBallMovement() && cueBallG)
    {
        // Get current slider value
        var sliderValue = forceSlider.value();
        // Update slider value
        sliderValue += sliderDir * 5;
        
        // Check slider value has reach max
        if(sliderValue >= 120)
        {
            // Set to max
            sliderValue = 120;
            // Change direction
            sliderDir = -1;
        }
        // Check slider value has reach min
        else if(sliderValue <= 0)
        {
            // Set to min
            sliderValue = 0;
            // Change direction
            sliderDir = 1;
        }
        // Set new slider value
        forceSlider.value(sliderValue);
    }
}