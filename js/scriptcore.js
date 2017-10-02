function define_scripts(data){
  $(document).on("movecallback",function(err,d){
  if (jsonsql.query("select line from map.scripts where (x=='"  + d.x+"' && y=='" +d.y+ "')",map).length > 0)
  {
    console.log("found a script");
  }
  })
}
