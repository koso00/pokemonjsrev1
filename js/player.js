function spawnplayer(){

player = {
        div : $("<canvas>").attr("id","player").addClass("player").appendTo(".map-wrapper"),
        x : 0,
        y : 0,
        cssx : 0,
        cssy : 0,
        direction: 270,
        tx : 0,
        ty : 0,
        moving : false,
        move : {
                right : function(){ player.tx ++ },
                left : function(){player.tx -- },
                up : function(){player.ty -- },
                down : function(){ player.ty ++ }
              },
        teleport : function(x,y) {player.cssx = x * 32 ;
                                  player.tx = x;
                                  player.x = x;
                                  player.cssy = y * 32 ;
                                  player.ty = y;
                                  player.y = y;
                                },
        xindex : 0,
        yindex : 0,
        oldyindex : 1,
        speed : 2,
        lockplayer :false
      };

player.teleport(8,12);
$(document).ready(function(){
joystick = new joystick("body");
joystick.start();
})


$(document).on("keyboardpress",function(data,a){movementhandler(a)})
$(document).on("joystick",function(data,a){movementhandler(a)})

function movementhandler(a){
  if ((player.tx == player.x)&&(player.ty == player.y)&&(player.lockplayer == false)) {
        switch(a){
          case "right" : player.direction = 0; break;
          case "left" : player.direction = 180;break;
          case "up" : player.direction = 90;break;
          case "down" : player.direction = 270;break;
        }
  if ((collision != undefined)&&(collision.check(a) == false)){
      switch(a){
        case "right" : player.move.right(); break;
        case "left" : player.move.left();break;
        case "up" : player.move.up();break;
        case "down" : player.move.down();break;
      }
}
}
}
setInterval(function(){

  if(player.tx != player.x)
  {
  if (player.cssx == player.tx * 32) {player.x = player.tx ;
  if (player.y == player.ty) { movecallback()}
  }
  else {player.cssx +=player.speed*(player.tx - player.x);

  }
  }

  if(player.ty != player.y)
  {
  if (player.cssy== player.ty * 32) {player.y = player.ty;
  if (player.x == player.tx) { movecallback()}
  }
  else {player.cssy += player.speed*(player.ty - player.y);

  }
  }
  player.div.css({top : player.cssy , left : player.cssx});

  switch (player.direction) {
    case 0:       player.xindex = 3;break;
    case 90:      player.xindex = 0;break;
    case 180:     player.xindex = 2;break;
    case 270:     player.xindex = 1;break;
  }
  $("body").scrollLeft(player.cssx - ($("body").width() / 2) + 32);
  $("body").scrollTop(player.cssy - ($("body").height() / 2) + 32);
},1000/60)


var sprite = new Image();
sprite.src = "assets/player/1.png";
sprite.onload = function() {
    setInterval(function () {
        if ((player.ty != player.y)||(player.tx != player.x)) {
          if ((player.yindex == 1) || (player.yindex == 2))
          {player.oldyindex = player.yindex ; player.yindex  = 0}
          else
          { if (player.oldyindex == 1){player.yindex = 2}
          else{player.yindex = 1}
          }
          }else{
          player.yindex = 0;}
        c = document.getElementById("player");
        c.width = 64;
        c.height = 64;
        ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 64, 64);
        ctx.imageSmoothingEnabled = false;
        if ((key.s===true) && (moving == true)) { ctx.drawImage(sprite, 1 + (player.yindex+4) * 32 + (player.yindex+4) , 1+ player.xindex * 32 + player.xindex , 32, 32, 0, 0, 64, 64)}
        else {ctx.drawImage(sprite, 1 + player.yindex * 32 + player.yindex , 1+ player.xindex * 32 + player.xindex , 32, 32, 0, 0, 64, 64)}
  },100);
}

function movecallback(){
scriptflag = false;
$(document).trigger("movecallback",[{x : player.x , y : player.y}]);
console.log("move process ended");
}

function define_collisions(map){
  for (i = 0; i < map.layers.length ; i ++){
    if (map.layers[i].name == "Collisions"){break;}
  }
  layer = i;
  collisions = new Array(map.height);
  for (i = 0; i < map.height; i++) {collisions[i] = new Array(map.width)}
  for (i = 0; i < map.height; i++){
    for (g = 0; g < map.width ; g++){
    collisions[i][g] = map.layers[layer].data[map.width * i + g];
    if (collisions[i][g] != 0) {collisions[i][g] = true}else{collisions[i][g] = false}
    }
  }

  r = {
          check : function(arg) {
            switch(arg){
              case "left" :
              return collisions[player.y][player.x - 1]
              break;

              case "right" :
              return collisions[player.y][player.x + 1]
              break;

              case "up" :
              return collisions[player.y - 1][player.x]
              break;

              case "down" :
              return collisions[player.y + 1][player.x]
              break;
            }
          }

          }
  return r;
}
}