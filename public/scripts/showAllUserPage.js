var informationOfUserContainer = document.querySelectorAll(".informationOfUser");
var informationOfUserLink = document.querySelectorAll(".currentLocation");

init();

function init(){
	informationOfUserContainer.forEach( function(element, index) {
		console.log(index);
		console.log(element);
		element.addEventListener("click", function () {
			window.location.replace(informationOfUserLink[index].href);
		});
	});
}