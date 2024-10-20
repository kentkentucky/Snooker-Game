// Adjust this value to position pockets inward
var centerPocketOffset = -7;
var cornerPocketOffset = 3;

// Combine different aspects of the table
function drawTable()
{
    push();
    translate(width / 2, height / 2);
    rectMode(CENTER);
    fill(79, 121, 66);
    rect(0, 0, tableWidth, tableHeight);
    drawBaulk();
    drawCushions();
    fillCorners();
    drawPockets();
    pop();
}

// Create cushion and push them into array
function setupCushions() 
{
    var cushion1 = Bodies.rectangle(0, tableHeight / 2 + 15, tableWidth, 30, {friction: 0.3, restitution: 2, isStatic: true});
    var cushion2 = Bodies.rectangle(0, -tableHeight / 2 - 15, tableWidth, 30, {friction: 0.3, restitution: 2, isStatic: true});
    var cushion3 = Bodies.rectangle(-tableWidth / 2 - 15, 0, 30, tableHeight, {friction: 0.3, restitution: 2, isStatic: true});
    var cushion4 = Bodies.rectangle(tableWidth / 2, 0, 30, tableHeight, {friction: 0.3, restitution: 2, isStatic: true});

    cushions.push(cushion1);
    cushions.push(cushion2);
    cushions.push(cushion3);
    cushions.push(cushion4);
    World.add(engine.world, [cushion1, cushion2, cushion3, cushion4]);
}

// Draw cushions
function drawCushions() 
{
    fill(92, 64, 51);
    noStroke();
    for(var i = 0; i < cushions.length; i++) 
    {
        drawVertices(cushions[i].vertices);
    }
}

// Create pockets and push them into array
function setupPockets()
{
    var pocket1 = Bodies.circle(-tableWidth / 2 + cornerPocketOffset, 
                                -tableHeight / 2 + cornerPocketOffset, pocketD / 2, 
                                {isStatic: true, 
                                 collisionFilter: {group: -1,
                                                   category: 2,
                                                   mask: 0}
                                });
    var pocket2 = Bodies.circle(0, -tableHeight / 2 + centerPocketOffset, 
                                pocketD / 2, 
                                {isStatic: true, 
                                 collisionFilter: {group: -1,
                                                   category: 2,
                                                   mask: 0}
                                });
    var pocket3 = Bodies.circle(tableWidth / 2 - cornerPocketOffset - 10, 
                                -tableHeight / 2 - cornerPocketOffset, 
                                pocketD / 2, 
                                {isStatic: true, 
                                 collisionFilter: {group: -1,
                                                   category: 2,
                                                   mask: 0}
                                });
    var pocket4 = Bodies.circle(-tableWidth / 2 + cornerPocketOffset, 
                                tableHeight / 2 - cornerPocketOffset, 
                                pocketD / 2, 
                                {isStatic: true, 
                                 collisionFilter: {group: -1,
                                                   category: 2,
                                                   mask: 0} 
                                });
    var pocket5 = Bodies.circle(0, tableHeight / 2 - centerPocketOffset,
                                pocketD / 2, 
                                {isStatic: true, 
                                 collisionFilter: {group: -1,
                                                   category: 2,
                                                   mask: 0}
                                });
    var pocket6 = Bodies.circle(tableWidth / 2 - cornerPocketOffset - 10,
                                tableHeight / 2 - cornerPocketOffset, 
                                pocketD / 2, 
                                {isStatic: true, 
                                 collisionFilter: {group: -1,
                                                   category: 2,
                                                   mask: 0}
                                });
    
    pockets.push(pocket1);
    pockets.push(pocket2);
    pockets.push(pocket3);
    pockets.push(pocket4);
    pockets.push(pocket5);
    pockets.push(pocket6);
    World.add(engine.world, [pocket1, pocket2, pocket3, pocket4, pocket5, pocket6]);
}

// Draw pockets
function drawPockets()
{
    fill(0);
    for(var i = 0; i < pockets.length; i++)
    {
        drawVertices(pockets[i].vertices);
    }
}

// Draw pocket corners
function fillCorners()
{
    fill(153, 153, 0);
    noStroke();
    // Top-left corner
    rect(-tableWidth / 2, -tableHeight / 2 - 15, 60, 30);
    rect(-tableWidth / 2 - 15, -tableHeight / 2, 30, 60);
    // Top-right corner
    rect(tableWidth / 2 - 15, -tableHeight / 2 - 15, 60, 30);
    rect(tableWidth / 2, -tableHeight / 2, 30, 60);
    // Bottom-left corner
    rect(-tableWidth / 2, tableHeight / 2 + 15, 60, 30);
    rect(-tableWidth / 2 - 15, tableHeight / 2, 30, 60);
    // Bottom-right corner
    rect(tableWidth / 2 - 15, tableHeight / 2 + 15, 60, 30);
    rect(tableWidth / 2, tableHeight / 2, 30, 60);
    // Top-middle pocket
    rect(0, -tableHeight / 2 - 15, 45, 30);
    // Bottom-middle pocket
    rect(0, tableHeight / 2 + 15, 45, 30);
}

// Draw baulk line
function drawBaulk()
{
    stroke(255);
    line(-tableWidth / 2 + tableWidth / 5, -tableHeight / 2, -tableWidth / 2 + tableWidth / 5, tableHeight / 2);
    arc(-tableWidth / 2 + tableWidth / 5, 0, tableHeight / 3, tableHeight / 3, HALF_PI, PI + HALF_PI);
}