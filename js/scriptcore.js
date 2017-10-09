programcounter = 0;
scriptflag = false;
function define_scripts(data){
  for (i = 0; i < data.length ; i ++){
  $("<div>").addClass("script").attr("script",JSON.stringify(data[i])).offset({left: data[i].x * 32 , top : data[i].y * 32}).appendTo("body");

  }
  $(document).on("movecallback",function(err,d){
  $(".script").each(function(){
  script = JSON.parse($(this).attr("script"));
  if ((scriptflag==false) && (player.x == script.x) && (script.y == player.y))
  {
  scriptflag = true;
  scriptcore(script)
  }
  })
  })
}




function scriptcore(data) {
  if (joystick){joystick.pause()}
  if (data)
    {
      player.lockplayer = true;
      parsescript = data;
      programcounter = 0;
      console.log(parsescript.line.length)
    }
  if (parsescript.line.length == programcounter) {
    if (joystick){joystick.start()}
    player.lockplayer = false;
    console.log("end of the script");
    return false;
  }
  var pr = parsescript.line[programcounter];
  programcounter++
  if (pr.exe == "text") {
    console.log(pr.arg1)
    textbox(pr.arg1);
  }
}



function textbox(text){
$("<div>").addClass("textbox").attr("message",text).text("").appendTo("body").on("click",function(){
  if ($(this).text() == $(this).attr("message")) {
    scriptcore();
    $(this).remove();
  }
})
function tc(){
  if ($(".textbox").text() != $(".textbox").attr("message")) {
    $(".textbox").text($(".textbox").attr("message").substr(0,($(".textbox").text().length + 1)))

    setTimeout(tc,20)
  }
}
tc()

}
