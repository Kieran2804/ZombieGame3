var bg,bgImg;
var player, shooterImg, shooter_shooting;
var Zombie1,Zombie1Img,Zombie2,Zombie2Img
var Zombie1group,Zombie2group
var heart1,heart2,heart3
var heart1Img,heart2Img,heart3Img
var bullet=50
var gameState="fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/AbandonedCity.jpg")

  Zombie1Img=loadImage("assets/Zombie1.png")
  Zombie2Img=loadImage("assets/Zombie2.png")

  heart1Img=loadImage("assets/heart_1.png")
  heart2Img=loadImage("assets/heart_2.png")
  heart3Img=loadImage("assets/heart_3.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-60,20,20)
bg.addImage(bgImg)
bg.scale = 2.6

  

//creating the player sprite
player = createSprite(displayWidth-1600, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

Zombie1group=new Group()
Zombie2group=new Group()

bulletGroup=new Group()

}

function draw() {
  background(0); 
if(gameState==="fight"){



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x=player.x+20
}
if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x=player.x-20
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet=createSprite(player.x,player.y-30,20,10)
 bullet.velocityX=20
 bulletGroup.add(bullet)
  player.addImage(shooter_shooting)
 bullet=bullet-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bullet==0){
  gameState="bullets"
}
if(Zombie1group.isTouching(bulletGroup)){
  for(var i=0;i<Zombie1group.length;i++){     
   if(Zombie1group[i].isTouching(bulletGroup)){
    Zombie1group[i].destroy()
    bulletGroup.destroyEach()
   }
  }
}
if(Zombie2group.isTouching(bulletGroup)){
  for(var i=0;i<Zombie2group.length;i++){     
   if(Zombie2group[i].isTouching(bulletGroup)){
    Zombie2group[i].destroy()
    bulletGroup.destroyEach()
   }
  }
}
if(Zombie1group.isTouching(player)){
 

  for(var i=0;i<Zombie1group.length;i++){     
       
   if(Zombie1group[i].isTouching(player)){
    Zombie1group[i].destroy()
        } 
  }
 }

 if(Zombie2group.isTouching(player)){
 

  for(var i=0;i<Zombie2group.length;i++){     
       
   if(Zombie2group[i].isTouching(player)){
    Zombie2group[i].destroy()
        } 
  }
 }

enemy1()
enemy2()
}
if(gameState=="lost"){
  textSize(100)
  fill("red")
  text("you lost",400,400)
  Zombie1group.destroyEach()
  Zombie2group.destroyEach()
  player.destroy()
}
else if(gameState=="won"){
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  Zombie1group.destroyEach();
  Zombie2group.destroyEach();
  
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullets"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  Zombie1group.destroyEach();
  Zombie2group.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();


}
drawSprites();

}
 
function enemy1(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    Zombie1 = createSprite(random(1000,2000),random(500,800),40,40)

    Zombie1.addImage(Zombie1Img)
    Zombie1.scale = 0.35
    Zombie1.velocityX = -3
  //  Zombie1.debug= true
    Zombie1.setCollider("rectangle",0,0,400,400)
   
    Zombie1.lifetime = 400
   Zombie1group.add(Zombie1)
  }
}

function enemy2(){
  if(frameCount%80===0){

    //giving random x and y positions for zombie to appear
    Zombie2 = createSprite(random(1000,2000),random(500,800),40,40)

    Zombie2.addImage(Zombie2Img)
    Zombie2.scale = 0.35
    Zombie2.velocityX = -3
    //Zombie2.debug= true
    Zombie2.setCollider("rectangle",0,0,400,400)
   
    Zombie2.lifetime = 400
   Zombie2group.add(Zombie2)
  }

}