var hideCommentsButton = document.querySelector(".hideComments");
var commentsContainer = document.querySelector(".comments");
var addNewCommentButton = document.querySelector("#addNewComment");
var newCommentForm = document.querySelector(".newCommentForm");
var heartLike = document.querySelector(".heartLike");

var buttonLike = document.querySelectorAll(".buttonLike");
var buttonFollow = document.querySelectorAll(".buttonFollow");

init();

function init () {
	// newCommentForm.classList.toggle('hideByHeight');
	addHideComments();
	addNewComment();
	heartLikeClick();
}

function addHideComments () {
	hideCommentsButton.addEventListener("click", function () {
		commentsContainer.classList.toggle('hideByHeight');
	})
}

function addNewComment () {
	addNewCommentButton.addEventListener("click", function () {
		newCommentForm.classList.toggle('hideByHeight');
	})
}

function heartLikeClick () {
	heartLike.addEventListener("mouseover", function () {
		heartLike.classList.toggle('icon-heart');
	})
	heartLike.addEventListener("mouseleave", function () {
		heartLike.classList.toggle('icon-heart');
	})
}

function addDisablingButton() {
	buttonLike.addEventListener("click", function () {
		buttonLike.disabled = true;
	})
	buttonFollow.addEventListener("click", function () {
		buttonFollow.disabled = true;
		console.log('follow!!');
	})
}