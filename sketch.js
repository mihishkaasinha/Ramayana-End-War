//Author:Mihishkaa Sinha
//the porpose of this programe is to create a battle background with demons on one side and lord Ram on the other side (Now with score changing). Ram fires arrows on demons.put a condition that when Lord Rama  arrows destory more than 4 enemies then display the message Lord Rama Won !!

//create the variables 
var bg, bow, arrow_velocity, ballon1_animation, ballon2_animation, ballon3_animation, ballon4_animation, enemy1, enemy2, enemy3, enemy4, arrow_move, arrow, select_enemy, score;

function preload() {
  //load the images here 
  bg = loadImage("ramayana.jpg");
  bow = loadAnimation("ram (2).jpg");
  ballon1_animation = loadAnimation("rakshash1.png");
  ballon2_animation = loadAnimation("rakshash2.png");
  ballon3_animation = loadAnimation("rakshash3.png");
  ballon4_animation = loadAnimation("rakshash4.png");
  arrow = loadAnimation("arrow0.png");

}

//create a score variable and asisgn to zero
var score = 0


function setup() {
  createCanvas(700, 600);

  //create the groups
  arrow_group = new Group();
  enemy1_group = new Group();
  enemy2_group = new Group();
  enemy3_group = new Group();
  enemy4_group = new Group();

  //create ground
  playground = createSprite(700, 300, 1200, 1200);
  playground.addImage("ground_is_moving!", bg);
  playground.x = playground.width / 1;
  playground.velocityX = -4;
  playground.scale = 4;

  //create player
  bow_player = createSprite(590, 250, 1200, 1200);
  bow_player.addAnimation("bow", bow);
  bow_player.scale = 0.7;

}

function create_arrow() {
  //create arrow
  arrow_move = createSprite(750, 200, 1200, 1200);
  arrow_move.addAnimation("arrow", arrow);
  arrow_move.scale = 0.3;
  arrow.lifetime = 100;
  arrow_group.add(arrow_move);
}

//create enemy 1
function create_enemy1() {
  enemy1 = createSprite(0, Math.round(random(70, 370)), 10, 10);
  enemy1.addAnimation("rakshash1.jpg", ballon1_animation);
  enemy1.velocityX = 4;
  enemy1.lifetime = 120;
  enemy1.scale = 0.2;
  enemy1_group.add(enemy1);
}

//create enemy 2
function create_enemy2() {
  enemy2 = createSprite(0, Math.round(random(70, 370)), 10, 10);
  enemy2.addAnimation("rakshash2.jpg", ballon2_animation);
  enemy2.velocityX = 4;
  enemy2.lifetime = 120;
  enemy2.scale = 0.2;
  enemy2_group.add(enemy2);
}

//create enemy 3
function create_enemy3() {
  enemy3 = createSprite(0, Math.round(random(70, 370)), 10, 10);
  enemy3.addAnimation("rakshash3.jpg", ballon3_animation);
  enemy3.velocityX = 4;
  enemy3.lifetime = 120;
  enemy3.scale = 0.2;
  enemy3_group.add(enemy3);
}

//create enemy 4
function create_enemy4() {
  enemy4 = createSprite(0, Math.round(random(70, 370)), 10, 10);
  enemy4.addAnimation("rakshash4.jpg", ballon4_animation);
  enemy4.velocityX = 4;
  enemy4.lifetime = 120;
  enemy4.scale = 0.2;
  enemy4_group.add(enemy4);

}

function draw() 
{
  //create a random number for the enemies to appeare on a random order
  var select_enemy = Math.round(random(1, 4));

  //call the function to create arrow
  create_arrow();

  //move the player according to the mouse
  bow_player.y = World.mouseY;
  
  //make the enemies appeare in a random order using the select_enemy variable
  if (World.frameCount % 80 == 0) 
  {

    if (select_enemy === 1) 
    {
      create_enemy1();
    } 
    
    else if (select_enemy === 2) 
    {
      create_enemy2();
    } 
    
    else if (select_enemy === 3) 
    {
      create_enemy3();
    }
    
    else 
    {
      create_enemy4();
    }
  }

  // Moving the background
  if (playground.x < 0) {
    playground.x = playground.width * 2;
  }

  // shoot arrow onclick on space button
  if (keyWentDown("space")) {
    arrow_move.velocityX = -10;
    arrow_move.y = bow_player.y;
    arrow_move.x = bow_player.x - 40;
  }
  //display all the sprites
  drawSprites();

  //display a subtitle for information
  fill(0, 255, 85);
  text("If Lord Rama shoots more than 4 times than he Wins!!", 200, 50)
  
 //destroying the enemy on the touching of the arrow
  if (arrow_group.isTouching(enemy1_group)) {
    enemy1_group.destroyEach();
    score = score + 1;
    arrow_group.destroyEach();
  }

  else if (arrow_group.isTouching(enemy2_group)) {
    enemy2_group.destroyEach();
    score = score + 1;
    arrow_group.destroyEach();
  }

  else if (arrow_group.isTouching(enemy3_group)) {
    enemy3_group.destroyEach();
    score = score + 1;
    arrow_group.destroyEach();
  }

  else if (arrow_group.isTouching(enemy4_group)) {
    enemy4_group.destroyEach();
    score = score + 1;
    arrow_group.destroyEach();
  }

  //display the score
  fill(255, 188, 0);
  textSize(20);
  text("Score: " + score, 300, 30);
  
  //put a condition that when Lord Rama  arrows destory more than 4 enemies then display the message Lord Rama Won !!
  if (score > 4) 
  {
    enemy1_group.destroyEach();
    enemy2_group.destroyEach();
    enemy3_group.destroyEach();
    enemy4_group.destroyEach();
    playground.velocityX = 0;
    fill(0, 255, 85);
    textSize(70);
    text("Lord Rama Won!!", 100, 350);
  }

}