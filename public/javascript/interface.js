$(document).ready function(){

  $(function(){

    $("#photo-name").draggable();
    $(".pair-box").droppable(
      drop: function(event, ui){
          $( this )
          .addClass()
          .find()
          .html( "Dropped!" );
      };
    );


  });

};
