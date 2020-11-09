var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImage;
var banana ,bananaImage, obstacle, obstacleImage;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var rock;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkeyCollide = loadAnimation("sprite_1.png");
}



function setup() {
  createCanvas(600,300);
  monkey = createSprite(30,230,10,10);
  monkey.scale = 0.1;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
   
  ground = createSprite(300,280,1500,10);
  ground.scale = 1; 

}


function draw() {
background("black");
  fill("white");
  textSize(15);
  text("survival time: "+score, 300, 50);
  textSize(15);
  
  

if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
     ground.velocityX = -(4+score*1.5/100);
   
    if(keyDown("space")) {
      monkey.velocityY =-8; 
    }
   monkey.velocityY = monkey.velocityY + 0.8
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
     if (monkey.isTouching(bananaGroup)){
       bananaGroup.destroyEach();
      }
    }
if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 245;
    monkey.scale = 0.1;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    fill("white");
    textSize(30);
    text("GAME OVER !!", 200, 170);
   
  }
  drawSprites(); 
  monkey.collide(ground);
}

function bananas(){
  if (frameCount%150 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);  
  
  }
}

function obstacles(){
  if (frameCount%100 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation( obstacleImage);
     obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
   obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    obstacle.velocityX = -(4+score*1.5/100);
    
  } 
}