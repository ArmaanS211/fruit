//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit,appleGroup, pearGroup, orangeGroup, bananaGroup ,monster,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var knifeswoosh, gameover, applec, orangec, pearc, bananac;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  orangec = loadImage("orangec.png");
  applec = loadImage("applec.png");
  pearc = loadImage("pearc.png");
  bananac = loadImage("bananac.png");
  
  gameOverImage = loadImage("gameover.png")

  //load sound here
  knifeswoosh = loadSound("knifeSwoosh.mp3");
  gameover = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7


   

  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  appleGroup = createGroup();
  pearGroup = createGroup();
  bananaGroup = createGroup();
  orangeGroup = createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    for(var i = 0; i < appleGroup.length;i++){
        if(appleGroup.get(i).isTouching(knife)){
          score = score+2;
          knifeswoosh.play();
          appleGroup.get(i).addImage(applec);
        }
      }
      for(var i = 0; i < pearGroup.length;i++){
          if(pearGroup.get(i).isTouching(knife)){
          score = score+2;
          knifeswoosh.play();
          pearGroup.get(i).addImage(pearc);
        }
      }
      for(var i = 0; i < orangeGroup.length;i++){
          if(orangeGroup.get(i).isTouching(knife)){
          score = score+2;
          knifeswoosh.play();
          orangeGroup.get(i).addImage(orangec);
        }
      }
      for(var i = 0; i < bananaGroup.length;i++){
          if(bananaGroup.get(i).isTouching(knife)){
          score = score+2;                            
          knifeswoosh.play();
          bananaGroup.get(i).addImage(bananac);
          }
        }


      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
        //add gameover sound here
        gameover.play();

        
        appleGroup.destroyEach();
        orangeGroup.destroyEach();
        pearGroup.destroyEach();
        bananaGroup.destroyEach();
        monsterGroup.destroyEach();
        appleGroup.setVelocityXEach(0);
        orangeGroup.setVelocityXEach(0);
        pearGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = -(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=600;
    //update below give line of code for increase fruitGroup speed by 4
    fruit.velocityX=-7
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX= (10+(score/4));
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
      orangeGroup.add(fruit);
    } else if (r == 2) {
      fruit.addImage(fruit2);
      appleGroup.add(fruit);
    } else if (r == 3) {
      fruit.addImage(fruit3);
      pearGroup.add(fruit);
    } else {
      fruit.addImage(fruit4);
      bananaGroup.add(fruit);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    
  }
}