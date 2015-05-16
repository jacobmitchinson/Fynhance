var userTitle = "MESH USERS";
var counter = 0;

$(document).ready(function(){
  var socket = io();
  var names = ["David", "Tom"]
  socket.emit("join", names.pop());

  var ready = true;
  
  $("#name").focus().fadeIn(1000);
  $("form").submit(function(event){
    event.preventDefault();
  });

  $("#send").click(function(){
    var msg = $("#msg").val();
    socket.emit("message", msg);
    $("#msg").val("");
  });

  socket.on("update", function(user){
    socket.emit("user-list", name);
    if(ready === true) {
      $("#users").html("<li>" + name + "</li>");
    }
  });

  socket.on("update", function(msg) {
    if(ready) {
      $("#msgs").append("<li>" + msg + "</li>");
    }
  });

  socket.on("update-disconnect", function(user) {
    socket.emit("user-list", name);
    if(ready === true) {
      $("#users").html("<li>" + name + "</li>");
    }
  });

  socket.on("update-disconnect", function(user) {
    if(ready === true) {
      $("#msgs").append("<li>" + user + "</li>");
    }
  })

  socket.on("chat", function(who, msg){
    if(ready) {
      console.log(msg);
      if (msg != null) {
        $("#msgs").append("<li style='display:none' id='message" + counter + '\'' + "><strong><span class='text-success'>" + who + "</span></strong>: " + msg + "</li>");
        $('#message' + counter).fadeIn();
        counter += 1;
      }
    }
  });

  socket.on("disconnect", function(){
    $("#msgs").append("<li><strong><span class='text-warning'>The server is not available</span></strong></li>");
    $("#msg").attr("disabled", "disabled");
    $("#send").attr("disabled", "disabled");
  });

  socket.on("logged-in-users", function(who){
    if(ready === true){
      var users = '';
      $.each(who, function(index, person) {
        users += '<li>' + person + '</li>'
      })
      $('#users').append(users);
    }
  });

});