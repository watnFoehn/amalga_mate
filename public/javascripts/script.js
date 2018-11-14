$(document).ready(function () {
  document.addEventListener('DOMContentLoaded', () => {

    console.log('TEST JS imported successfully!');

  }, false);

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


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
      $('#imagePreview').hide();
      $('#imagePreview').fadeIn(650)
    }
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function () {
  readURL(this);
});
