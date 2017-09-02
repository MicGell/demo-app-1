  var loadFile = function(event) {
    var output = document.getElementById('output');
    var infomationOfUser_img = document.querySelector(".infomationOfUser_img");
    output.style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]).toString() + ")";
    infomationOfUser_img.style.width = "70px";
    infomationOfUser_img.style.height = "70px";
  };