//Creating Physics Engine
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls = [];

function preload() {
  //Loading Images
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  //Adding Engine
  engine = Engine.create();
   world = engine.world;
  //Setting Angle for Cannon
  angleMode(DEGREES);
  angle = 15;
//Creating Ground
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);
//Creating Tower
  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  //Creating Cannon
  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
//Update Engine
  Engine.update(engine);
//Load Ground
  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();
//Load Tower
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

//Display Cannon
  cannon.display();
  for (var i = 0; i<balls.length; i++){
    showCannonBall(balls[i],i);
  }

}

//Making Cannon Balls
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length-1].shoot();
  }
}
//Setting pos of cannonballs
function keyPressed(){
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x,cannon.y);
    balls.push(cannonBall);
    
}
}
// displaying cannon balls
function showCannonBall(ball,i){
if (ball){
  ball.display();
}
}