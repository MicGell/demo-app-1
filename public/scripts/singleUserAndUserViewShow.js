var currentLocation = document.querySelectorAll(".currentLocation");
var shareIcon = document.querySelectorAll(".shareIcon");
var timeOutHide = [];

init();

function init(){
	shareIcon.forEach( function(element, index) {
		timeOutHide.push({});
		element.addEventListener("mouseleave", function () {
			showCurentLocationFunctionLeave(index);
		});
		element.addEventListener("mouseover", function () {
			mouseoverListenerFunciton(index);
		});
	});
	currentLocation.forEach( function(element, index) {
		element.addEventListener("mouseleave", function () {
			showCurentLocationFunctionLeave(index);
		});
		element.addEventListener("mouseover", function () {
			mouseoverListenerFunciton(index);
		});
	});
}

function mouseoverListenerFunciton (index) {
	clearTimeout(timeOutHide[index]);
	showCurentLocationFunctionOver(index);
}

function showCurentLocationFunctionOver(index) {
	currentLocation[index].textContent = "link: " + window.location.href + currentLocation[index].getAttribute("value").value ;
	currentLocation[index].style.padding = "6px 12px";
}
function showCurentLocationFunctionLeave(index) {
	timeOutHide[index] = setTimeout(function(){ 
	currentLocation[index].textContent = "";
	currentLocation[index].style.padding = "";
	}, 1000);
}