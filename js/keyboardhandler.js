key = {
   right  : false,
   left : false,
   up : false,
   down : false
}

$(document).on("keydown",function(e){
      e.preventDefault();
      switch(e.keyCode){
        case 39 : key.right = true; break;
        case 37 : key.left = true;break;
        case 38 : key.up = true;break;
        case 40 : key.down = true;break;
      }
  })
$(document).on("keyup",function(e){

        switch(e.keyCode){
          case 39 : key.right = false; break;
          case 37 : key.left = false;break;
          case 38 : key.up = false;break;
          case 40 : key.down = false;break;
        }
    })

    setInterval(function(){
      if (key.right == true) { $(document).trigger("keyboardpress",["right"])}
      if (key.left == true) { $(document).trigger("keyboardpress","left")}
      if (key.up == true) { $(document).trigger("keyboardpress","up")}
      if (key.down == true) { $(document).trigger("keyboardpress","down")}
    },1000/60)
