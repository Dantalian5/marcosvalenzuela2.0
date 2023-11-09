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

const carousel = document.querySelector(".project-carousel");
const carouselItems = document.querySelectorAll(".project-carousel__item");
const prevButton = document.querySelector(
	".projects__nav__btn.projects__nav--prev"
);
const nextButton = document.querySelector(
	".projects__nav__btn.projects__nav--next"
);
//const indexFocused = Array.from(carouselItems).indexOf(focusedItem);
let indexFocused = Math.ceil(carouselItems.length / 2) - 1;

function loadCarousel(step) {
	let oldIndexFocused = indexFocused;
	indexFocused =
		indexFocused + step >= 0 && indexFocused + step < carouselItems.length
			? indexFocused + step
			: indexFocused;
	let index = 0;
	carouselItems[indexFocused].style.transform = `translate(-50%, -50%)`;
	console.log(`50% - ${carouselItems[indexFocused].offsetWidth * 2}px`);
	if (step < 0 && oldIndexFocused != indexFocused) {
		carouselItems[indexFocused].style.left = `calc(50% - ${
			carouselItems[indexFocused].offsetWidth / 2
		}px)`;
		setTimeout(function () {
			carouselItems[indexFocused].style.left = `50%`;
		}, 250);
	} else if (step > 0 && oldIndexFocused != indexFocused) {
		carouselItems[indexFocused].style.left = `calc(50% + ${
			carouselItems[indexFocused].offsetWidth / 2
		}px)`;
		setTimeout(function () {
			carouselItems[indexFocused].style.left = `50%`;
		}, 250);
	} else if (step < 0 && oldIndexFocused == indexFocused) {
		carouselItems[indexFocused].style.left = `60%`;
		setTimeout(function () {
			carouselItems[indexFocused].style.left = `50%`;
		}, 100);
	} else if (step > 0 && oldIndexFocused == indexFocused) {
		carouselItems[indexFocused].style.left = `40%`;
		setTimeout(function () {
			carouselItems[indexFocused].style.left = `50%`;
		}, 100);
	}
	carouselItems[indexFocused].style.zIndex = 1;
	carouselItems[indexFocused].style.opacity = 1;

	for (let i = indexFocused + 1; i < carouselItems.length; i++) {
		index++;
		carouselItems[i].style.transform = `translate(-50%, -50%) scale(${
			1 - 0.1 * index
		}) perspective(100px) rotateY(-1deg)`;
		carouselItems[i].style.left = `calc( 50% + ${100 * index}px)`;
		carouselItems[i].style.zIndex = -index;
		carouselItems[i].style.opacity = index < 3 ? 0.3 - index / 10 : 0.05;
	}
	index = 0;
	for (let i = indexFocused - 1; i >= 0; i--) {
		index++;
		carouselItems[i].style.transform = `translate(-50%, -50%) scale(${
			1 - 0.1 * index
		}) perspective(100px) rotateY(1deg)`;
		carouselItems[i].style.left = `calc( 50% - ${100 * index}px)`;
		carouselItems[i].style.zIndex = -index;
		carouselItems[i].style.opacity = index < 3 ? 0.3 - index / 10 : 0.05;
	}
}
loadCarousel(0);

nextButton.onclick = function () {
	loadCarousel(+1);
};
prevButton.onclick = function () {
	loadCarousel(-1);
};

let isDragging;
let startPositionX;
let startPositionY;
let deltaX;
let deltaY;
carousel.addEventListener("touchstart", function (event) {
	isDragging = true;
	startPositionX = event.touches[0].clientX;
	startPositionY = event.touches[0].clientY;
});
carousel.addEventListener("touchmove", function (event) {
	if (isDragging) {
		let currentPositionX = event.touches[0].clientX;
		let currentPositionY = event.touches[0].clientY;
		deltaX = currentPositionX - startPositionX;
		deltaY = currentPositionY - startPositionY;
		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			event.preventDefault();
		}
	}
});
carousel.addEventListener("touchend", function () {
	isDragging = false;
	let radio = 50;
	if (deltaX < 0 && Math.abs(deltaX) > radio) {
		loadCarousel(+1);
	} else if (deltaX > 0 && deltaX > radio) {
		loadCarousel(-1);
	}
});

// Evitar que se seleccione texto al arrastrar
carousel.addEventListener("selectstart", function (event) {
	event.preventDefault();
});

let isWheeled;
let deltaWheelX;

carousel.addEventListener("wheel", function (event) {
	// Detectar el desplazamiento horizontal de la rueda del ratón
	deltaWheelX = event.deltaX;
	if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
		event.preventDefault();
	}
	let radio = 5;
	if (Math.abs(deltaWheelX) < radio) {
		isWheeled = false;
	}
	if (deltaWheelX > radio && !isWheeled) {
		loadCarousel(+1);
		isWheeled = true;
	} else if (deltaWheelX < -radio && !isWheeled) {
		loadCarousel(-1);
		isWheeled = true;
	}
});
