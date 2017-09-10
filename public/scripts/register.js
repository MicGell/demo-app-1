  var loadFile = function(event) {
    var output = document.getElementById('output');
    var errorImage = document.getElementById('errorImage');
    var imgInp = document.getElementById('imgInp');
    var infomationOfUser_img = document.querySelector(".infomationOfUser_img");

    if ((event.target.files[0].size / 1024) > 1024) {
    	errorImage.textContent = "Image weighs too much.";
    	errorImage.style.color = "red";
	    output.style.backgroundImage = "";
	    infomationOfUser_img.style.width = "0";
	    infomationOfUser_img.style.height = "0";
	    imgInp.value = "";
    }else {
    	errorImage.textContent = "";
	    output.style.backgroundImage = "url(" + URL.createObjectURL(event.target.files[0]).toString() + ")";
	    infomationOfUser_img.style.width = "70px";
	    infomationOfUser_img.style.height = "70px";
    }
  };