const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var canvas;
var background
var database, gameState;
var form, player, playerCount;
var officer1,officer2,allPlayers
var officers = []
var game
var bullet,bulletImg,bulletGroup
var ammos = 100
var enemy,tankImg,enemysGroup
var life,lifeImg,lifeGroup,lifeImage
var ammo,ammoImg,ammoGroup

function preload() {
 backgroundImage = loadImage("./assets/road.png")
 backgroundImg = loadImage("./assets/road2.png")
 officerImage = loadImage("./assets/gun.png")
 officerImg = loadImage("./assets/gun2.png")
 buildImg = loadImage("./assets/building.png")
 tankImg = loadImage("./assets/tank.png")
 bulletImg = loadImage("./assets/bullet1.png")
 ammoImg = loadImage("./assets/ammos.png")
 lifeImg = loadImage("./assets/ambulance.png")
 lifeImage = loadImage("./assets/life.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  database = firebase.database();
  game = new Game();
  game.start();
  game.getState()
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);

  if(playerCount == 2){
    game.update(1)
  }

  if(gameState == 1){
    game.play();
    //background(backgroundImage);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
