

function joystick(zone){
  deg = 46;
  mouse = {
    left : 0,top : 0
  }
  var refresh;
  bodyset = false;
  stickhandler = false;
  this.start = function()
  {
  $(zone).on("touchstart",function(e){
      var touch = e.touches[0];
      mouse.left = touch.pageX - $(document).scrollLeft() - $('body').offset().left
      mouse.top = touch.pageY - $(document).scrollTop() - $('body').offset().top
      console.log(mouse.left +  " " + mouse.top)
    })
   $(zone).on("touchstart mousedown",mousedownhandler)
   $(zone).on("touchend mouseup",mouseuphandler)
  }
  this.pause = function()
  {
  $(zone).off("mousedown",mousedownhandler);
  $(zone).off("mouseup",mouseuphandler);

  $(zone).off("touchstart",mousedownhandler)
  $(zone).off("touchend",mouseuphandler)
  clearInterval(refresh);
  }
  this.deg = function(){
    return deg;
  }
  this.distance = function(){
     return distance;
  }
  this.deltaX = function(){
    return Math.abs(abs.x -  parseInt($(".joy").css("left"))-25)
  }
  this.deltaY = function(){
    return Math.abs(abs.x -  parseInt($(".joy").css("left"))-25)
  }
  $('body').on("mousemove",function(e) {
    mouse.left = e.pageX - $(document).scrollLeft() - $('body').offset().left
    mouse.top = e.pageY - $(document).scrollTop() - $('body').offset().top
    if (stickhandler) {definestick(mouse.left,mouse.top);}
  });

  document.addEventListener('touchmove', function(e) {
      var touch = e.touches[0];
      mouse.left = touch.pageX - $(document).scrollLeft() - $('body').offset().left
      mouse.top = touch.pageY - $(document).scrollTop() - $('body').offset().top
        if (stickhandler) {definestick(mouse.left,mouse.top);}
  }, false);

  function mousedownhandler(){
    definestick(mouse.left,mouse.top);
    stickhandler = true;
  }

  function mouseuphandler(){
    abs.x = 0;
    abs.y = 0;
    deg = 0;

    clearInterval(refresh);
    bodyset = false;
    stickhandler = false;
    $(".stick").fadeOut(200)
    $(".joy").fadeOut(200)
    setTimeout(function(){
      $(".stick").remove()
      $(".joy").remove()
    },200)
  }





  function definestick(left,top)
  {
    if (bodyset == false){
      abs = {
        x : left,
        y: top
      }
      direction = "";
      stick = $("<div></div>");
      stick.css({
        position : "absolute" ,
      "background-color":"black",
      "border-radius" : "50%",
         height:100,
         width:100,
         "left":left - 50,
         "top":top -50
      });
      stick.addClass( "stick")
      stick.appendTo(zone).hide().fadeIn(200);
      s =  $("<div></div>");
      s.css({
        position : "absolute" ,
      "background-color":"red",
      "border-radius" : "50%",
         height:50,
         width:50,
         "left":left - 25,
         "top":top -25
      })
      s.addClass( "joy")
      s.appendTo(zone).hide().fadeIn(200);
      bodyset = true;
      refresh = setInterval(function(){
        if ((Math.abs(abs.x -  parseInt($(".joy").css("left"))-25) > 10) && (Math.abs(abs.y -  parseInt($(".joy").css("top"))-25 ) > 10 ))
        {
         if ((deg <= 45) || (deg > 315)) {direction = "right"; $(zone).trigger("joystick",["right"])}
         if ((deg > 45)&&(deg <= 135)) {direction = "up";$(zone).trigger("joystick",["up"])}
         if ((deg > 135)&&(deg <= 225)) {direction = "left";$(zone).trigger("joystick",["left"])}
         if ((deg > 225)&&(deg <= 315)) {direction = "down";$(zone).trigger("joystick",["down"])}
       }
       },1000/60)

       deg = "";
    }else{
      p1 = {
        x : 0,
        y : 0
      }
      p2 = {
        x : mouse.left -  parseInt($(".stick").css("left"))-50,
        y : mouse.top  -  parseInt($(".stick").css("top"))-50
      }
      abs = {
        x : parseInt($(".stick").css("left"))-50,
        y: parseInt($(".stick").css("top"))-50
      }
      Vx = p2.x - p1.x;
      Vy = p1.y - p2.y;
      distance = Math.sqrt( Vy*Vy + Vx*Vx )
      var radians = Math.atan2(Vy, Vx);
      if (radians < 0) radians += 2*Math.PI;
      deg  = radians * 180/Math.PI;

      if (Math.abs(left -  parseInt($(".stick").css("left"))-50) < Math.abs(Math.cos(radians)*50)){
      $(".joy").css("left",left - 25);}else{
      $(".joy").css("left",abs.x + 74 + Math.cos(radians)*50)
      }



      if (Math.abs(top -  parseInt($(".stick").css("top"))-50) <  Math.abs(Math.sin(radians)*50)){
      $(".joy").css("top",top - 25);}else{
        $(".joy").css("top",abs.y + 74 + Math.sin(radians)*-50)
      }

    }


  }


}
