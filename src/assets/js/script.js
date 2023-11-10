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
const searchInput = document.querySelector(".search-box__input");
const carouselTagedItems = document.querySelectorAll(".project-carousel__item");
let carouselItems = document.querySelectorAll(
	".project-carousel__item:not(.inactive)"
);
const prevButton = document.querySelector(
	".projects__nav--btn.projects__nav--prev"
);
const nextButton = document.querySelector(
	".projects__nav--btn.projects__nav--next"
);
//const indexFocused = Array.from(carouselItems).indexOf(focusedItem);
//let indexFocused = Math.ceil(carouselItems.length / 2) - 1;
let indexFocused = 0;

function loadCarousel(step) {
	if (carouselItems.length > 0) {
		let Nfocused = Math.min(
			Math.floor(carousel.offsetWidth / (carouselItems[0].offsetWidth + 10)),
			carouselItems.length
		);
		let oldIndexFocused = indexFocused;
		indexFocused = Math.min(
			indexFocused + step >= 0 &&
				indexFocused + Nfocused - 1 + step < carouselItems.length
				? indexFocused + step
				: indexFocused,
			carouselItems.length - Nfocused
		);
		setFocused(step, Nfocused, oldIndexFocused);
		setLaterals(Nfocused);
	}
}
function setFocused(step, Nfocused, oldIndexFocused) {
	let stepToLeft;
	let showStep = carousel.offsetWidth / (Nfocused * 2);
	let cont = 1;
	if (indexFocused != oldIndexFocused) {
		const offset = carouselItems[indexFocused].offsetWidth;
		stepToLeft =
			step < 0
				? `calc( ${Math.floor(
						carousel.offsetWidth / (Nfocused * 2)
				  )}px - ${offset}px)`
				: `calc( ${
						Math.floor(carousel.offsetWidth / (Nfocused * 2)) *
						(Nfocused * 2 - 1)
				  }px + ${offset}px)`;
	} else {
		stepToLeft =
			step < 0
				? `calc( ${carousel.offsetWidth / (Nfocused * 2)}px + 100px)`
				: `calc( ${
						(carousel.offsetWidth / (Nfocused * 2)) * (Nfocused * 2 - 1)
				  }px - 100px)`;
	}
	if (step < 0) {
		carouselItems[indexFocused].style.transform = `translate(-50%, -50%)`;
		carouselItems[indexFocused].style.left = stepToLeft;
	} else if (step > 0) {
		carouselItems[
			indexFocused + Nfocused - 1
		].style.transform = `translate(-50%, -50%)`;
		carouselItems[indexFocused + Nfocused - 1].style.left = stepToLeft;
	}
	setTimeout(function () {
		for (let i = indexFocused; i < indexFocused + Nfocused; i++) {
			carouselItems[i].style.transform = `translate(-50%, -50%)`;
			carouselItems[i].style.left = `${showStep * cont}px`;
			carouselItems[i].style.zIndex = 1;
			carouselItems[i].style.opacity = 1;

			cont += 2;
		}
	}, 100);
}
function setLaterals(Nfocused) {
	let radio = 100;
	let index = 0;
	for (let i = indexFocused + Nfocused; i < carouselItems.length; i++) {
		index++;
		carouselItems[i].style.transform = `translate(-50%, -50%) scale(${
			1 - 0.1 * index
		}) perspective(100px) rotateY(-1deg)`;
		carouselItems[i].style.left = `calc( ${
			(carousel.offsetWidth / (Nfocused * 2)) * (Nfocused * 2 - 1)
		}px + ${radio * index}px)`;
		carouselItems[i].style.zIndex = -index;
		carouselItems[i].style.opacity = index < 3 ? 0.3 - index / 10 : 0.05;
	}
	index = 0;
	for (let i = indexFocused - 1; i >= 0; i--) {
		index++;
		carouselItems[i].style.transform = `translate(-50%, -50%) scale(${
			1 - 0.1 * index
		}) perspective(100px) rotateY(1deg)`;
		carouselItems[i].style.left = `calc( ${
			carousel.offsetWidth / (Nfocused * 2)
		}px - ${radio * index}px)`;
		carouselItems[i].style.zIndex = -index;
		carouselItems[i].style.opacity = index < 3 ? 0.3 - index / 10 : 0.05;
	}
}

loadCarousel(0);
window.addEventListener("resize", function () {
	loadCarousel(0);
});

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

const tagsText = [
	...Array.from(document.querySelectorAll(".js-card-tags")).map((element) =>
		element.innerText.toLowerCase()
	),
	...Array.from(document.querySelectorAll(".js-card-names")).map((element) =>
		element.innerText.toLowerCase()
	),
];
const tagsList = Array.from(
	new Set(tagsText.map((text) => text.split(/[\s,]+/)).flat())
);

const palabrasUnicas = searchInput.addEventListener("input", (event) => {
	const tags = searchInput.value.toLowerCase();
	const tagsArray = tags.trim().split(/[\s,]+/);
	let isAtag = tagsArray.every((tag) => tagsList.includes(tag));
	if (isAtag) {
		carouselTagedItems.forEach((item) => {
			const itemTags = (
				item.querySelector(".js-card-tags").innerText +
				" " +
				item.querySelector(".js-card-names").innerText
			).toLowerCase();
			const itemTagsArray = itemTags.split(/[\s,]+/);

			const containsAllTags = tagsArray.every((tag) =>
				itemTagsArray.includes(tag)
			);

			if (containsAllTags || tags == "") {
				item.classList.remove("inactive");
			} else {
				item.classList.add("inactive");
			}
		});

		carouselItems = document.querySelectorAll(
			".project-carousel__item:not(.inactive)"
		);
		loadCarousel(0);
	} else if (tags == "") {
		carouselTagedItems.forEach((item) => {
			item.classList.remove("inactive");
		});

		carouselItems = document.querySelectorAll(
			".project-carousel__item:not(.inactive)"
		);
		loadCarousel(0);
	}
});
