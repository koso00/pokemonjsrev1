player = {
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
        speed : 2
      };
camera = { x : 0, 
           y : 0};
player.teleport(8,16);
$(document).ready(function(){
joystick = new joystick("body");
joystick.start();
})


$(document).on("keyboardpress",function(data,a){movementhandler(a)})
$(document).on("joystick",function(data,a){movementhandler(a)})

function movementhandler(a){
  if ((player.tx == player.x)&&(player.ty == player.y)) {
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


requestAnimationFrame(moveloop)

setInterval(function(){

           if ((player.ty != player.y)||(player.tx != player.x)) {
          if ((player.yindex == 1) || (player.yindex == 2))
          {player.oldyindex = player.yindex ; player.yindex  = 0}
          else
          { if (player.oldyindex == 1){player.yindex = 2}
          else{player.yindex = 1}
          }
          }else{
          player.yindex = 0;}

        },100)

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
