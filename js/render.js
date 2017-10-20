$("<canvas>").addClass("map").attr("id","map").appendTo("body");

function gettile(tileIndex) {
      var pkt = {
        "img": null,
        "px": 0,
        "py": 0
      };
      var i = 0;
      for (i = map.tilesets.length - 1; i > 0; i--) {
        if (tileIndex >= map.tilesets[i].firstgid) {
          break;
        }
      }
      pkt.img = i;
      var localIdx = tileIndex - map.tilesets[i].firstgid;
      var lTileX = Math.floor(localIdx % Math.floor(map.tilesets[i].imagewidth / map.tilewidth));
      var lTileY = Math.floor(localIdx / Math.floor(map.tilesets[i].imagewidth / map.tilewidth));
      pkt.px = (lTileX * map.tilewidth);
      pkt.py = (lTileY * map.tileheight);
      return pkt;
    }


function render(data,intro,mp) {
    map = data;
    tilewidth = 32;
    tileheight = 32;
    

    image = new Array();
    sprites = map.tilesets
    var count = map.tilesets.length + 1;
    var sprite = new Image();
    sprite.src = "assets/player/1.png";
    sprite.onload = function() {
        count--;
        if (count == 0) {
          draw();
          console.log("drawing");
        }
      }
    for (var i = 0; i < map.tilesets.length; i++) {
      map.tilesets[i].image;
      image[i] = new Image();
      var s = map.tilesets[i].image.split("/");
      var m ="map/tilesets/"+ s[s.length -1 ];
      image[i].src = m;
      image[i].onload = function() {
        count--;
        if (count == 0) {
          console.log("drawing");
          requestAnimationFrame(draw);
        }
      }
    }

    
    function draw() {


      
    
    windoww = Math.round($(window).width()/32)*32;
    windowh = Math.round($(window).height()/32)*32;
    
    minworldx = camera.x - windoww/2 ;
    minworldy = camera.y - windowh/2 ;
    maxworldx = camera.x + windoww/2 ;
    maxworldy = camera.y + windowh/2 + 64;
      canvas = document.getElementById(mp);
      ctx = canvas.getContext('2d');
      canvas.width = $(window).width()
      canvas.height = $(window).height();
      ctx.fillStyle = "#ffffff";
      ctx.imageSmoothingEnabled = false;

      
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (map.layers[i] != "WalkBehind") {
        for (i = 0; i < map.layers.length; i++) {
          var dat = map.layers[i].data;
          for (tileIDX = 0; tileIDX < map.layers[i].data.length; tileIDX++) {
            var tID = dat[tileIDX];
            var tPKT = gettile(tID);
            worldY = Math.floor(tileIDX / map.layers[i].width) * tileheight;

            worldX = (tileIDX - (map.layers[i].width * (worldY / tilewidth))) * tilewidth;
            
            if (((worldX + 32> minworldx)&&(worldX - 32 < maxworldx)) && ((worldY + 32 > minworldy&&(worldY -32 < maxworldy))))
            {
            ctx.drawImage(image[tPKT.img], tPKT.px, tPKT.py, map.tilewidth, map.tileheight, worldX - minworldx, worldY - minworldy, tilewidth, tileheight);
            }
            // console.log(tPKT.px + " " + tPKT.py + " " + worldX + " "+ worldY );
          }
        }
      }

        
           if (((player.ty != player.y)||(player.tx != player.x))) {
        if ((key.s===true) && (moving == true)) { ctx.drawImage(sprite, 1 + (player.yindex+4) * 32 + (player.yindex+4) , 1+ player.xindex * 32 + player.xindex , 32, 32, player.cssx - minworldx - 16,player.cssy -  minworldy - 32, 64, 64)}
        else {ctx.drawImage(sprite, 1 + player.yindex * 32 + player.yindex , 1+ player.xindex * 32 + player.xindex , 32, 32, player.cssx - minworldx - 16 , player.cssy - minworldy - 32, 64,64)}
} else{
    ctx.drawImage(sprite, 1 + player.yindex * 32 + player.yindex , 1+ player.xindex * 32 + player.xindex , 32, 32, player.cssx - minworldx - 16 , player.cssy - minworldy - 32, 64,64)
}

      for (i = 0; i < map.layers.length; i++) {
        if (map.layers[i].name === "WalkBehind") {

          var dat = map.layers[i].data;
          for (tileIDX = 0; tileIDX < map.layers[i].data.length; tileIDX++) {
            var tID = dat[tileIDX];
            var tPKT = gettile(tID);
            worldY = Math.floor(tileIDX / map.layers[i].width) * tileheight;
            worldX = (tileIDX - (map.layers[i].width * (worldY / tilewidth))) * tilewidth; 

             if (((worldX > minworldx)&&(worldX < maxworldx)) && ((worldY > minworldy&&(worldY < maxworldy))))
            {
            ctx.drawImage(image[tPKT.img], tPKT.px, tPKT.py, map.tilewidth, map.tileheight, worldX - minworldx, worldY - minworldy, tilewidth, tileheight);
            }// console.log(tPKT.px + " " + tPKT.py + " " + worldX + " "+ worldY );
          }
        }
      }




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
  

  switch (player.direction) {
    case 0:       player.xindex = 3;break;
    case 90:      player.xindex = 0;break;
    case 180:     player.xindex = 2;break;
    case 270:     player.xindex = 1;break;
  }
camera.x = player.cssx;
camera.y = player.cssy;
 requestAnimationFrame(draw);
}

}
