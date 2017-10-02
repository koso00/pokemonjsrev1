programcounter = 0;
scriptflag = false;
function define_scripts(data){
  for (i = 0; i < data.length ; i ++){
  $("<div>").addClass("script").attr("script",JSON.stringify(data[i])).appendTo("body");
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
  if (data)
    {
      parsescript = data;
      programcounter = 0;
      console.log(parsescript.line.length)
    }
  if (parsescript.line.length == programcounter) {
    console.log("end of the script");
    return false;
  }
  var pr = parsescript.line[programcounter];
  programcounter++
  if (pr.exe == "text") {
    console.log(pr.arg1)
    scriptcore()
  }
}
