class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

 start(){
  form = new Form();
  form.display();

  player = new Player()
  playerCount = player.getCount()

  officer1 = createSprite(50,50,5,5)
  officer1.addImage("gun",officerImage)
  officer1.scale = 0.3
  

  officer2 = createSprite(50,100,5,5)
  officer2.addImage("gun2",officerImg)
  officer2.scale = 0.3

  officers = [officer1,officer2]

  bulletGroup = new Group();
  enemysGroup = new Group();
  ammoGroup = new Group();
  lifeGroup = new Group();
 }

 handleElements() {
  form.hide();

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width/2+200,80);
    
    this.resetButton.class("resetButton")
    this.resetButton.position(width/2+240,40)
}

 play(){
  this.handlePlayercontrols();
  this.handleElements();
  this.handleResetButton();
  this.handelSpawnEnemys();
  this.handelSpawnLife();
  this.handelSpawnammo();
  Player.getPlayersInfo();

  if(allPlayers !== undefined){
    image(backgroundImage,0,0,width,height)
    image(buildImg,0-250,0-25,850,height+100)

    this.showLife();

    var index = 0;
    var x =0;
    
    for(var plr in allPlayers){
      index = index+1;
      var x =  allPlayers[plr].positionX;
      var y = allPlayers[plr].positionY;

      officers[index-1].x =x;
      officers[index-1].y =y;

      

      if(index === player.index ){
        stroke(10)
        fill("red")
        ellipse(x,y,60,60)
       }

      }

    }

    if(keyWentUp("space") && player.index!= null){
      bullet = createSprite(player.positionX,50,10,10)
      bullet.addImage("bullet",bulletImg)
      bullet.velocityX = 20
      bullet.scale = 0.1
      bullet.y = player.positionY
      bullet.lifetime = 50
      /*console.log(bullet.velocityX)*/
      bulletGroup.add(bullet);
      // bulletGroup.depth+=2;
      ammos = ammos-1
    }

    drawSprites();

    textSize(20);
    stroke(3);
    fill("black")
    text("AMMO: "+ ammos,20,50);

 }

    handlePlayercontrols(){
      if(keyIsDown(UP_ARROW )){
        player.positionY-=10;
        player.update();
      }

      if(keyIsDown(DOWN_ARROW)){
        player.positionY+=10;
        player.update();
      }

      if(player.positionY < 30){
        player.positionY = 40
      }
     
      if(player.positionY > windowHeight-30 ){
        player.positionY = windowHeight-40
      }
      
    }
 
    handleResetButton(){
      this.resetButton.mousePressed(() => {
        database.ref("/").set({
          playerCount : 0,
          gameState : 0,
          players : {},
        })
        window.location.reload()
      })
    }

    showLife() {
      push();
      image(lifeImage, width / 2 - 130,20, 20, 20);
      fill("white");
      rect(width / 2 - 100, 20 - 400, 185, 20);
      fill("#f50057");
      rect(width / 2 - 100, 20, player.life, 20);
      noStroke();
      pop();
    }

    handelSpawnEnemys(){
      if(frameCount % 150 == 0 ){
         enemy = createSprite(1000,random(30,700),40,40);
         enemy.addImage(tankImg)
         enemy.scale = 0.2
         enemy.velocityX = -8
         enemy.lifetime = 400
         enemysGroup.add(enemy)

      }
     }

     handelSpawnLife(){
      if(frameCount % 600 == 0 ){
         life = createSprite(1000,random(730),40,40);
         life.addImage(lifeImg)
         life.scale = 0.2
         life.velocityX = -8
         life.lifetime = 200
         lifeGroup.add(life)
      }
     }

     handelSpawnammo(){
      if(frameCount % 300 == 0 ){
         ammo = createSprite(1000,random(670),40,40);
         ammo.addImage(ammoImg)
         ammo.scale = 0.2
         ammo.velocityX = -8
         ammo.lifetime = 200
         ammoGroup.add(ammo)
         if(ammos.x < 60){
          ammos += 10
         }
      }
      
     }

}
