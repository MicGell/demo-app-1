var informationOfUserContainer = document.querySelectorAll(".informationOfUser");
var informationOfUserLink = document.querySelectorAll(".currentLocation");

init();

function init(){
	informationOfUserContainer.forEach( function(element, index) {
		element.addEventListener("click", function () {
			window.location.replace(informationOfUserLink[index].href);
		});
	});
}