$(document).ready(function () {
  document.addEventListener('DOMContentLoaded', () => {

    console.log('TEST JS imported successfully!');

  }, false);
  
  // SHOW/HIDE TEXTAREA 

  $("#sport").click(function () {
    $("#toggle1").toggle();
  });

  $("#music").click(function () {
    $("#toggle2").toggle();
  });

  $("#lrngrp").click(function () {
    $("#toggle3").toggle();
  });

  $("#languages").click(function () {
    $("#toggle4").toggle();
  });

  $("#culinary").click(function () {
    $("#toggle5").toggle();
  });

  $("#location").click(function () {
    $("#toggle6").toggle();
  });
  
  $("#getintch").click(function () {
    $("#toggle7").toggle();
  });
});