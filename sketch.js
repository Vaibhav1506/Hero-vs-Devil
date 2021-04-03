var PLAY = 1;
var END = 0;
var gameState = PLAY;
var Score;
var runningHero, runningHeroAN, herocrying, herocryingAN;
var monster, monsterAn, bg;
var ground;
var DragonAn;
var Ob1, Ob2, Ob3, Ob4, Ob5;
var path;
var gameOver, Restart, gameOverIMG, RestartIMG;

function preload(){
  runningHeroAN = loadAnimation("Pic1.png", "Pic2.png", "Pic3.png");
  herocryingAN = loadAnimation("herocrying.png");
  bg = loadImage("bg.png");
  monsterAn = loadAnimation("Monster1.png", "Monster2.png", "Monster3.png", "Monster4.png", "Monster5.png");
  DragonAn = loadAnimation("Dragon1.png", "Dragon2.png", "Dragon3.png");
  Ob1 = loadImage("Witch.png");
  Ob2 = loadImage("Wither.png");
  Ob3 = loadImage("Zombie.png");
  Ob4 = loadImage("Skeleton.png");
  Ob5 = loadImage("Creeper.png");
  gameOverIMG = loadImage("gameOver.png");
  RestartIMG = loadImage("Respawn.jpg");
}

function setup(){
  createCanvas(2100,1500);

  runningHero = createSprite(600, 1300, 40, 100);
  runningHero.addAnimation("running", runningHeroAN);
  runningHero.scale = 0.2;
  runningHero.setCollider("circle", 20, 20, 300);
  //runningHero.debug = true;
  runningHero.addAnimation("collided", herocryingAN);

  monster = createSprite(200, 1300, 50, 100);
  monster.addAnimation("chasing", monsterAn);
  monster.scale = 1;

  ground = createSprite(800, 800);
  ground.addImage("moving", bg);
  ground.velocityX = -16;
  ground.scale = 2;

  gameOver = createSprite(1000,80,50,50);
  gameOver.addImage("game over", gameOverIMG);
  gameOver.scale = 1;

  Restart = createSprite(1000,1400,50,50);
  Restart.addImage("restart", RestartIMG);
  Restart.scale = 3;

  runningHero.depth = ground.depth;
  runningHero.depth = runningHero.depth + 1;

  monster.depth = ground.depth;
  monster.depth = monster.depth + 1;

  path = createSprite(400, 1400, 1200, 20);
  path.visible = false;

  obstaclesGroup = new Group();
  dragonGroup = new Group();
  
  Score = 0;
}
function draw(){
  background("black");

  fill("yellow");
  text("score" + Score, 1800, 200);
  Score = Score + frameCount/500;

  if(gameState === PLAY){

    if(ground.x < 0){
      ground.x = ground.width / 2
    }
    
    if(keyDown("Space") && runningHero.y > 500){
      runningHero.velocityY = -23;
    }
  
  runningHero.velocityY = runningHero.velocityY + 1;

  CreateObstacles();

  createDragon();

  gameOver.visible = false;
  Restart.visible = false;

  if(dragonGroup.isTouching(runningHero) || obstaclesGroup.isTouching(runningHero))
  {
    gameState = END;
  }
}
  else if(gameState === END){  
  
    //herocrying = createSprite(1100,750,2200,1200);
    runningHero.changeAnimation("collided", herocryingAN);
    
    runningHero.destroy();
    monster.destroy();

    ground.velocityX = 0;
    runningHero.velocityY = 0;
    monster.velocityX = 0;

    obstaclesGroup.destroyEach();
    dragonGroup.destroyEach();

    obstaclesGroup.setLifetimeEach(-1);
    dragonGroup.setLifetimeEach(-1);
  
    obstaclesGroup.setVelocityXEach(0);
    dragonGroup.setVelocityXEach(0);

    gameOver.visible = true;
    Restart.visible = true;

    if(mousePressedOver(Restart)){
      reset();
    }
        
}

runningHero.collide(path);

  drawSprites();
}

function CreateObstacles(){
  if (frameCount%180 === 0){
  var Obstacles = createSprite(1700, 1300, 50, 100);
  Obstacles.velocityX = -16;
  Obstacles.scale = 0.7;

    var ran = Math.round(random(1,5))
    switch(ran)
    {
      case 1 : Obstacles.addImage("Witch", Ob1);
      break;
      case 2 : Obstacles.addImage("Wither", Ob2);
      break;
      case 3 : Obstacles.addImage("Zombie", Ob3);
      break;
      case 4 : Obstacles.addImage("Skeleton", Ob4);
      break;
      case 5 : Obstacles.addImage("Creeper", Ob5);
      break;
      
      default : break;
    }
  
    Obstacles.lifetime = 110;
    obstaclesGroup.add(Obstacles);

  }
}

function createDragon(){
  if(frameCount% 900 === 0){
    dragon = createSprite(1800, 950, 100, 100);
    dragon.addAnimation("Dragon", DragonAn);
    dragon.scale = 1.5;
    dragon.velocityX = -16;
    dragon.lifetime = 200;
    dragonGroup.add(dragon);
  }
}

function reset(){
  gameState = PLAY;
  Score = 0;
  runningHero.changeAnimation("running", runningHeroAN);
  obstaclesGroup.destroyEach();
  dragonGroup.destroyEach();
  gameOver.visible = false;
  Restart.visible = false;
  
}