var PLAY = 1;
var END = 0;
var gameState = 1
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
var ground;
var survivalTime=0;
var backGround, backgroundImage;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backgroundImage=loadImage("jungle.jpg");
    
}

function setup() {
  createCanvas(600,600)
      backGround=createSprite(300,300,600,600);
  backGround.addImage('my',backgroundImage);
  backGround.scale=1.4
  
  monkey=createSprite(70,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  ground=createSprite(400,350,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  
  //create Obstacle and food Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();

}

function draw() {
background("white");
  

  stroke("white");
  textSize(20)
  fill("white")
  text(" score : ",score,500,50)
  
  

    if(gameState === PLAY){
      
      if(ground.x<100){ 
      ground.x=300
      }
      
      //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >=250) {
        monkey.velocityY = -14;
    }
  
      //add gravity
      monkey.velocityY = monkey.velocityY + 0.8
      monkey.collide(ground);
      
       spawnbanana();
      spawnobstacle();


    }
        else if (gameState === END) {
          
          if(monkey.isTouching(obstacleGroup)){
          gameState = END
          }
          
    //change the monkey animation
   monkey.changeAnimation("broken", sprite_0png);
          
   ground.velocityX = 0;
   monkey.velocityY = 0;
          
    //set lifetime of the game objects so that they are never             destroyed
   obstaclesGroup.setLifetimeEach(-1);
   foodGroup.setLifetimeEach(-1);
     
   obstaclesGroup.setVelocityXEach(0);
   foodGroup.setVelocityXEach(0);
  
        }

 
drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survival time: "+survivalTime,50,50);
  
}

function spawnbanana() {
   if (frameCount % 80 === 0) {
    banana = createSprite(600,150,10,10);
    banana.y = Math.round(random(10,60));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX = -3;
    
    //assign lifetime to the variable
    banana.lifetime = 200;
    

    //adding cloud to the group
   foodGroup.add(banana);
    }
}

function spawnobstacle(){ 
  if(frameCount % 100==0){
    var obstacle =  createSprite(400,330,20,20)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-3
    obstacle.lifetme=200
    obstacle.scale=0.1
    obstaclesGroup.add(obstacle)
  

}
   }


