// Import matter.js modules
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;

// Declare variables for matter.js engine and world
var engine;

// Declare variables for game elements
var cushions;
var pockets;
var colourBalls;
var redBalls;
var cueBall;
var cueBallG = false;

// Flag for standard rules
var rules = true;
// Flag for 4th game mode
var gameOver;
// Flag for selecting pocket
var selectingPocket = false;
// Last pocket
var chosenPocket = null;
// Array to store random generated colours
var order = [];

// Message
var messageTimer = 0;
var messageDuration = 20;

var ballStartPos = [];

// Create array to store potted balls
var pottedBalls = [];

// Declare table dimensions
var tableWidth = 1000;
var tableHeight = tableWidth / 2;
var ballD = tableWidth / 36;
var pocketD = ballD * 1.5;

// Position for baulk line
var baulkLineX = -tableWidth / 2 + tableWidth / 5;
var wPressed = false;

// Variables for force slider
var forceSlider;
var forceValue;
var sliderMoving = false;

function setup()
{
    createCanvas(1500, 1000);
    
    // Create matter.js engine
    engine = Engine.create();
    engine.world.gravity.y = 0;
    
    // Initialise array for game elements
    cushions = [];
    pockets = [];
    colourBalls = [];
    redBalls = [];
    
    // Setup cushions and pockets
    setupCushions();
    setupPockets();
    
    // Create a force slider
    push();
    translate(width / 2, height / 2);
    forceSlider = createSlider(0, 120, 40);
    forceSlider.position(tableWidth + 50, tableHeight / 2 - 80);
    forceSlider.style('width', '200px');
    pop();
    
    var gameOver = false;
}

function draw()
{
    background(125);
    // Update matter.js engine
    Engine.update(engine);

    // Draw table and balls
    drawTable();
    drawColourBalls();
    drawRedBalls();
    drawColours();
    generateCueBall();
    if(cueBallG)
    {
        drawCueBall();
    }
    drawCue();
    drawShotLine();

    // Handle slider movement
    sliderMovement();

    // Check for collisions
    checkCollisions();

    // Check potted balls
    checkPockets();

    // Check if coloured balls have been potted consecutively
    {
        if(checkPottedBall())
        {
            console.log("Two coloured balls are plotted consecutively!")
        }
    }
    
    // Message if game is paused
    if(gameOver)
    {
        console.log("Game Over!");
    }
    
    // Check if selecting pocket is true
    if(selectingPocket)
    {
        // Call functions
        callPocket();
        highlightPockets();
    }
    
    // Check if chosenPocket is not null
    if(chosenPocket)
    {
        // Call function
        checkLastBallInPocket();
    }
}

function resetGame() 
{
    // Reset game over state
    gameOver = false; 
}

function drawVertices(vertices) 
{
    beginShape();
    for(var i = 0; i < vertices.length; i++) 
    {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape();
}

// Handle key press event
function keyPressed()
{
    // Check if keys 1, 2, 3, 4 are pressed to change game modes
    if(keyCode == 49 || keyCode == 50 || keyCode == 51 || keyCode == 52)
    {
        pottedBalls = [];
        resetGame();
        cueBallG = false;
        checkGameMode();
    }
    
    // Check if space bar is pressed to control slider and apply force
    if(keyCode == 32)
    {
        if(!sliderMoving)
        {
            sliderMoving = true;
        }
        else if(sliderMoving)
        {
            sliderMoving = false;
            forceValue = forceSlider.value();
            cueForce(forceValue);
        }
    }
}

//let selectedBall = null;

function mousePressed() 
{
    // If selectingPocket is true
    if(selectingPocket) 
    {
        // Traverse pockets array
        for (var i = 0; i < pockets.length; i++) 
        {
            // Check dist from mouse to pocket when mouse is clicked
            var d = dist(mouseX - width / 2, mouseY - height / 2, pockets[i].position.x, pockets[i].position.y);
            if (d < pocketD / 1.5) 
            {
                // Print and get selected pocket
                console.log("Pocket selected:", i);
                // Push pocket and number into function
                potLastBallInPocket(pockets[i], i);
                // End pocket selection
                selectingPocket = false; 
                break;
            }
        }
    }
    

/*  Function to allow balls to be dragged using mouse for video demonstration */
//    let mousePos = { x: mouseX - width / 2, y: mouseY - height / 2 };
//    for (let i = 0; i < colourBalls.length; i++) 
//    {
//        let ball = colourBalls[i];
//        let distance = dist(mousePos.x, mousePos.y, ball.position.x, ball.position.y);
//        if (distance < ballD / 2) 
//        {
//            selectedBall = ball;
//            break;
//        }
//    }
//    for (let i = 0; i < redBalls.length; i++) 
//    {
//        let ball = redBalls[i];
//        let distance = dist(mousePos.x, mousePos.y, ball.position.x, ball.position.y);
//        if (distance < ballD / 2) 
//        {
//            selectedBall = ball;
//            break;
//        }
//    }
//    if(cueBallG)
//    {
//        let ball = cueBall;
//        let distance = dist(mousePos.x, mousePos.y, ball.position.x, ball.position.y);
//        if (distance < ballD / 2) 
//        {
//            selectedBall = ball;
//        }
//    }
//    
}
//
//function mouseDragged() 
//{
//    if (selectedBall) 
//    {
//        Body.setPosition(selectedBall, { x: mouseX - width / 2, y: mouseY - height / 2 });
//    }
//}
//
//function mouseReleased() 
//{
//    selectedBall = null;
//}

/* REPORT

Snooker Game App Design

This snooker game application is designed to offer a realistic and engaging experience for players. The key design decisions and functionalities are outlined below:

Generating Cue Ball:
The cue ball is generated through mouse and key interactions. Players press the "W" key while positioning the mouse within the "D" zone. When both conditions are met, the cue ball is generated at mouseX and mouseY.

Drawing Cue:
The cue is drawn only when the cue ball is generated and all balls are stationary. A flag, cueBallG, indicates the cue ball's generation, and a function checks for ball movement.

Shot Guideline:
A shot guideline is drawn based on the cue direction relative to the mouse's position. If a ball aligns with the shot guideline, the line is drawn from the cue ball to the center of the aligned ball.

Shooting Mechanism:
The shooting mechanism involves mouse and key interactions to simulate real-life aiming and striking with a cue. Players aim with the mouse and set shot power using a slider that moves left and right. Pressing the spacebar starts the slider movement, and pressing it again sets the power. The cue direction is calculated using vector mathematics to ensure precise aiming. The force is applied based on the direction vector and slider-determined power, simulating a cue stick's strike on the cue ball.

Checking Potted Balls:
To verify if two colored balls are potted consecutively, a pottedBall array is used to store potted balls. The render property of the last and second-to-last balls in the array is checked. If both are colored balls, an error message is displayed in the terminal, indicating the consecutive potting of colored balls.

Extension (7 Ball):
A unique extension involves a random order of seven differently colored balls that players must pot sequentially. When down to the final ball, players must call a pocket. The Fisher-Yates algorithm generates a random order of colors, stored in an array. A function checks the potted balls against this order to ensure correctness. For the final ball, after pocket selection via mouse click, another function verifies if the ball is potted into the chosen pocket.

This app's unique features—mouse-based cue control and the innovative 7-ball extension—provide a distinctive and challenging snooker gaming experience, enhancing player engagement and realism.

*/