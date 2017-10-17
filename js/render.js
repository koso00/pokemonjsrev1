$("<div>").addClass("map-wrapper").appendTo("body").on("touchmove",function(e){e.preventDefault()});
$("<canvas>").addClass("map").attr("id","map").appendTo(".map-wrapper");

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
          draw();
        }
      }
    }

    
    function draw() {


      setInterval(function(){
      canvas = document.getElementById(mp);
      ctx = canvas.getContext('2d');
      canvas.width = window.outerWidth;
      canvas.height = window.outerHeight;
      ctx.fillStyle = "#ffffff";
      ctx.imageSmoothingEnabled = false;

      minworldy = window.outerWidth / tilewidth; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (map.layers[i] != "WalkBehind") {
        for (i = 0; i < map.layers.length; i++) {
          var dat = map.layers[i].data;
          for (tileIDX = 0; tileIDX < map.layers[i].data.length; tileIDX++) {
            var tID = dat[tileIDX];
            var tPKT = gettile(tID);
            worldY = Math.floor(tileIDX / map.layers[i].width) * tileheight;

            worldX = (tileIDX - (map.layers[i].width * (worldY / tilewidth))) * tilewidth;


            ctx.drawImage(image[tPKT.img], tPKT.px, tPKT.py, map.tilewidth, map.tileheight, worldX, worldY, tilewidth, tileheight);
            // console.log(tPKT.px + " " + tPKT.py + " " + worldX + " "+ worldY );
          }
        }
      }


      if ((player.ty != player.y)||(player.tx != player.x)) {
          if ((player.yindex == 1) || (player.yindex == 2))
          {player.oldyindex = player.yindex ; player.yindex  = 0}
          else
          { if (player.oldyindex == 1){player.yindex = 2}
          else{player.yindex = 1}
          }
          }else{
          player.yindex = 0;}
        if ((key.s===true) && (moving == true)) { ctx.drawImage(sprite, 1 + (player.yindex+4) * 32 + (player.yindex+4) , 1+ player.xindex * 32 + player.xindex , 32, 32, player.cssx, player.cssy, player.cssx + 64, player.cssy + 64)}
        else {ctx.drawImage(sprite, 1 + player.yindex * 32 + player.yindex , 1+ player.xindex * 32 + player.xindex , 32, 32, player.cssx, player.cssy, 64,64)}



      for (i = 0; i < map.layers.length; i++) {
        if (map.layers[i].name === "WalkBehind") {

          var dat = map.layers[i].data;
          for (tileIDX = 0; tileIDX < map.layers[i].data.length; tileIDX++) {
            var tID = dat[tileIDX];
            var tPKT = gettile(tID);
            worldY = Math.floor(tileIDX / map.layers[i].width) * tileheight;
            worldX = (tileIDX - (map.layers[i].width * (worldY / tilewidth))) * tilewidth;
            ctx.drawImage(image[tPKT.img], tPKT.px, tPKT.py, map.tilewidth, map.tileheight, worldX, worldY, tilewidth, tileheight);
            // console.log(tPKT.px + " " + tPKT.py + " " + worldX + " "+ worldY );
          }
        }
      }


},100)

    }

}
