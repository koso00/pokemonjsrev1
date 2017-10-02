$("<div>").addClass("map-wrapper").appendTo("body").on("touchmove",function(e){e.preventDefault()});
$("<canvas>").addClass("map").attr("id","map").appendTo(".map-wrapper");
$("<canvas>").addClass("mapb").attr("id","mapb").appendTo(".map-wrapper");


function renderMap(data,intro,mp,mpb) {
    map = data;
    tilewidth = 32;
    tileheight = 32;
    image = new Array();
    var count = map.tilesets.length;
    for (var i = 0; i < map.tilesets.length; i++) {
      map.tilesets[i].image;
      image[i] = new Image();
      var s = map.tilesets[i].image.split("/");
      var m ="map/tilesets/"+ s[s.length -1 ];
      image[i].src = m;
      image[i].onload = function() {
        count--;
        if (count == 0) {
          draw();
        }
      }
    }

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

    function draw() {
      canvas = document.getElementById(mp);
      ctx = canvas.getContext('2d');
      canvas.width = map.width * tilewidth;
      canvas.height = map.height * tileheight;
      ctx.fillStyle = "#ffffff";
      ctx.imageSmoothingEnabled = false;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      maploaded = true;
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
      canvas = document.getElementById(mpb);
      ctx = canvas.getContext('2d');
      canvas.width = map.width * tilewidth;
      canvas.height = map.height * tileheight;
      ctx.fillStyle = "rgba(255,255,255,0)";
      ctx.imageSmoothingEnabled = false;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    }

}
