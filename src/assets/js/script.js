"use strict";
const hamburgerMenu = document.getElementById("js-hamburgerMenu");
const buttonReadMore = document.getElementById("js-buttonReadMore");

//-Hamburger Menu EventListeners-
hamburgerMenu.addEventListener("click", (event) => {
	//open and close the menu
	hamburgerMenu.classList.toggle("active");
});
document.addEventListener("click", (event) => {
	// if clicked outside the menu, close the menu
	if (
		event.target.closest("#js-hamburgerMenu") === null &&
		event.target.closest("#js-menuItems") === null
	) {
		hamburgerMenu.classList.remove("active");
	}
});
buttonReadMore.addEventListener("click", (event) => {
	//open and close the menu
	buttonReadMore.classList.toggle("active");
	if (buttonReadMore.classList.contains("active")) {
		buttonReadMore.innerText = "Read Less";
	} else {
		buttonReadMore.innerText = "Read More";
	}
});
