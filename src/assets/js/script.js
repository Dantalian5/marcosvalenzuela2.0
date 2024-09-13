'use strict';
//-------------------------------------------------------
// Debounce Function:
function debounce(func, wait = 10) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
//-------------------------------------------------------
// Hamburger Menu:
const menuBtn = document.getElementById('js-hamburgerMenu');
const menuBox = document.getElementById('js-menuItems');
document.addEventListener('click', (event) => {
  if (!event.target.closest('#js-hamburgerMenu, #js-menuItems')) {
    menuBtn.classList.remove('active');
    menuBox.classList.remove('active');
  } else if (event.target.closest('#js-hamburgerMenu')) {
    menuBtn.classList.toggle('active');
    menuBox.classList.toggle('active');
  }
});
//-------------------------------------------------------
// Smooth Scroll:
document.querySelectorAll('.navlink, .homelink').forEach((button) => {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = this.getAttribute('data-target');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});
//-------------------------------------------------------
// Read More Button:
document.getElementById('js-buttonReadMore').onclick = function () {
  this.classList.toggle('active');
  this.innerText = this.classList.contains('active')
    ? 'Read Less'
    : 'Read More';
};
//-------------------------------------------------------
// Form Validation:
const form = document.querySelector('form[name="contact"]');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach((input) => {
  input.addEventListener('input', function () {
    if (input.checkValidity()) {
      clearError(input);
    }
  });
});
form.addEventListener('submit', function (e) {
  let valid = true;
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      showError(input);
      valid = false;
    }
  });
  if (!valid) {
    e.preventDefault();
  }
});
function showError(input) {
  input.classList.add('input--error');
  input.nextElementSibling.textContent = input.validationMessage;
}
function clearError(input) {
  input.classList.remove('input--error');
  input.nextElementSibling.textContent = '';
}
//-------------------------------------------------------
// Search Input:
const searchInput = document.querySelector('#projectSearchInput');
const carouselTagedItems = document.querySelectorAll('.carousel__item');

function filterProjects({ target }) {
  const tagsArray = target.value
    .toLowerCase()
    .trim()
    .split(/[\s,]+/);
  console.log(tagsArray);
  if (target.value != '') {
    document.querySelector('.search-box__error').style.display = 'none';
    carouselTagedItems.forEach((item) => {
      const itemTagsArray = (
        item.querySelector('.js-card-tags').innerText +
        ' ' +
        item.querySelector('.js-card-names').innerText
      )
        .toLowerCase()
        .split(/[\s,]+/);

      const containsAllTags = tagsArray.every((tag) =>
        itemTagsArray.some((item) => item.includes(tag))
      );
      if (containsAllTags) {
        item.classList.remove('inactive');
      } else {
        item.classList.add('inactive');
      }
    });
  } else {
    carouselTagedItems.forEach((item) => {
      item.classList.remove('inactive');
    });
  }
  updateCarousel();
  errorFilterProjects();
}
function errorFilterProjects() {
  const carouselItems = document.querySelectorAll(
    '.carousel__item:not(.inactive)'
  );
  document.querySelector('.search-box__error').style.display =
    carouselItems.length === 0 ? 'block' : 'none';
}

searchInput.addEventListener('input', debounce(filterProjects));
//-------------------------------------------------------
// Project Carousel v2:
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel__item');
function updateCarousel() {
  const carouselRect = carousel.getBoundingClientRect();
  const borderLeft = carouselRect.left;
  const borderRight = carouselRect.right;
  items.forEach((item) => {
    const itemRect = item.getBoundingClientRect();
    const itemLeft = Math.round(itemRect.left);
    const itemRight = Math.round(itemRect.right);
    const cont = Math.ceil((-itemLeft - borderLeft) / 300);
    if (itemLeft < borderLeft + 16) {
      const zIndex = Math.round(100 - cont);
      item.style.transform = `scale(${0.8}) perspective(100px) rotateY(1deg)`;
      item.style.zIndex = zIndex;
      item.style.opacity = 0.8;
    } else if (itemRight > borderRight - 16) {
      const zIndex = Math.round(100 - cont);
      item.style.transform = `scale(${0.8}) perspective(100px) rotateY(-1deg)`;
      item.style.zIndex = zIndex;
      item.style.opacity = 0.8;
    } else {
      item.style.transform = 'scale(1) rotateY(0)';
      item.style.zIndex = 100;
      item.style.opacity = 1;
    }
  });
}

updateCarousel();
carousel.addEventListener('scroll', debounce(updateCarousel));

function scrollToElement(direction) {
  const carouselRect = carousel.getBoundingClientRect();
  const borderLeft = carouselRect.left;
  const borderRight = carouselRect.right;
  const elements = Array.from(
    carousel.querySelectorAll('.carousel__item:not(.inactive)')
  );
  const center = borderLeft + (borderRight - borderLeft) / 2;
  const firstVisibleElement = elements.find((element) => {
    const rect = element.getBoundingClientRect();
    return rect.left <= center && rect.right > center;
  });
  const lastVisibleElement = elements.findLast((element) => {
    const rect = element.getBoundingClientRect();
    return rect.left <= center && rect.right > center;
  });
  if (
    direction === 'next' &&
    firstVisibleElement &&
    firstVisibleElement.nextElementSibling
  ) {
    firstVisibleElement.nextElementSibling.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  } else if (
    direction === 'prev' &&
    lastVisibleElement &&
    lastVisibleElement.previousElementSibling
  ) {
    lastVisibleElement.previousElementSibling.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }
}

// Evento para el botón "Next"
document.querySelector('#nextBtn').addEventListener('click', function (event) {
  event.preventDefault();
  scrollToElement('next');
});

// Evento para el botón "Prev"
document.querySelector('#prevBtn').addEventListener('click', function (event) {
  event.preventDefault();
  scrollToElement('prev');
});

//-------------------------------------------------------
// Project Carousel v1:
// const carousel = document.querySelector('.project-carousel');
// let indexFocused = 0;
// let startPositionX;
// let startPositionY;
// let deltaX;
// let deltaY;
// let isDragging;
// let isWheeled;
// //-------------------------------------------------------
// // Functions :
// function loadCarousel(step) {
//   const carouselItems = document.querySelectorAll(
//     '.project-carousel__item:not(.inactive)'
//   );
//   if (carouselItems.length > 0) {
//     let Nfocused = Math.min(
//       Math.floor(carousel.offsetWidth / (carouselItems[0].offsetWidth + 10)),
//       carouselItems.length
//     );
//     let oldIndexFocused = indexFocused;
//     indexFocused = Math.min(
//       indexFocused + step >= 0 &&
//         indexFocused + Nfocused - 1 + step < carouselItems.length
//         ? indexFocused + step
//         : indexFocused,
//       carouselItems.length - Nfocused
//     );
//     setFocused(carouselItems, step, Nfocused, oldIndexFocused);
//     setLaterals(carouselItems, Nfocused);
//   }
// }
// function setFocused(carouselItems, step, Nfocused, oldIndexFocused) {
//   let stepToLeft;
//   let showStep = carousel.offsetWidth / (Nfocused * 2);
//   let cont = 1;
//   if (indexFocused != oldIndexFocused) {
//     const offset = carouselItems[indexFocused].offsetWidth;
//     stepToLeft =
//       step < 0
//         ? `calc( ${Math.floor(
//             carousel.offsetWidth / (Nfocused * 2)
//           )}px - ${offset}px)`
//         : `calc( ${
//             Math.floor(carousel.offsetWidth / (Nfocused * 2)) *
//             (Nfocused * 2 - 1)
//           }px + ${offset}px)`;
//   } else {
//     stepToLeft =
//       step < 0
//         ? `calc( ${carousel.offsetWidth / (Nfocused * 2)}px + 100px)`
//         : `calc( ${
//             (carousel.offsetWidth / (Nfocused * 2)) * (Nfocused * 2 - 1)
//           }px - 100px)`;
//   }
//   if (step < 0) {
//     carouselItems[indexFocused].style.transform = `translate(-50%, -50%)`;
//     carouselItems[indexFocused].style.left = stepToLeft;
//   } else if (step > 0) {
//     carouselItems[
//       indexFocused + Nfocused - 1
//     ].style.transform = `translate(-50%, -50%)`;
//     carouselItems[indexFocused + Nfocused - 1].style.left = stepToLeft;
//   }
//   setTimeout(function () {
//     for (let i = indexFocused; i < indexFocused + Nfocused; i++) {
//       carouselItems[i].style.transform = `translate(-50%, -50%)`;
//       carouselItems[i].style.left = `${showStep * cont}px`;
//       carouselItems[i].style.zIndex = 1;
//       carouselItems[i].style.opacity = 1;

//       cont += 2;
//     }
//   }, 100);
// }
// function setLaterals(carouselItems, Nfocused) {
//   let radio = 100;
//   let index = 0;
//   for (let i = indexFocused + Nfocused; i < carouselItems.length; i++) {
//     index++;
//     carouselItems[i].style.transform = `translate(-50%, -50%) scale(${
//       1 - 0.1 * index
//     }) perspective(100px) rotateY(-1deg)`;
//     carouselItems[i].style.left = `calc( ${
//       (carousel.offsetWidth / (Nfocused * 2)) * (Nfocused * 2 - 1)
//     }px + ${radio * index}px)`;
//     carouselItems[i].style.zIndex = -index;
//     carouselItems[i].style.opacity = index < 3 ? 0.3 - index / 10 : 0.05;
//   }
//   index = 0;
//   for (let i = indexFocused - 1; i >= 0; i--) {
//     index++;
//     carouselItems[i].style.transform = `translate(-50%, -50%) scale(${
//       1 - 0.1 * index
//     }) perspective(100px) rotateY(1deg)`;
//     carouselItems[i].style.left = `calc( ${
//       carousel.offsetWidth / (Nfocused * 2)
//     }px - ${radio * index}px)`;
//     carouselItems[i].style.zIndex = -index;
//     carouselItems[i].style.opacity = index < 3 ? 0.3 - index / 10 : 0.05;
//   }
// }
// //-------------------------------------------------------
// // Event Starters :
// loadCarousel(0);
// //-------------------------------------------------------

// window.addEventListener('resize', function () {
//   loadCarousel(0);
// });
// document.querySelector('.projects__nav--btn.projects__nav--prev').onclick =
//   function () {
//     loadCarousel(-1);
//   };
// document.querySelector('.projects__nav--btn.projects__nav--next').onclick =
//   function () {
//     loadCarousel(+1);
//   };

// carousel.addEventListener('touchstart', function (event) {
//   isDragging = true;
//   startPositionX = event.touches[0].clientX;
//   startPositionY = event.touches[0].clientY;
// });
// carousel.addEventListener('touchmove', function (event) {
//   if (isDragging) {
//     let currentPositionX = event.touches[0].clientX;
//     let currentPositionY = event.touches[0].clientY;
//     deltaX = currentPositionX - startPositionX;
//     deltaY = currentPositionY - startPositionY;
//     if (Math.abs(deltaX) > Math.abs(deltaY)) {
//       event.preventDefault();
//     }
//   }
// });
// carousel.addEventListener('touchend', function () {
//   isDragging = false;
//   let radio = 50;
//   if (deltaX < 0 && Math.abs(deltaX) > radio) {
//     loadCarousel(+1);
//   } else if (deltaX > 0 && deltaX > radio) {
//     loadCarousel(-1);
//   }
// });
// // Evitar que se seleccione texto al arrastrar
// carousel.addEventListener('selectstart', function (event) {
//   event.preventDefault();
// });
// carousel.addEventListener('wheel', function (event) {
//   // Detectar el desplazamiento horizontal de la rueda del ratón
//   let deltaWheelX = event.deltaX;

//   if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
//     event.preventDefault();
//   }
//   let radio = 5;
//   if (Math.abs(deltaWheelX) < radio) {
//     isWheeled = false;
//   }
//   if (deltaWheelX > radio && !isWheeled) {
//     loadCarousel(+1);
//     isWheeled = true;
//   } else if (deltaWheelX < -radio && !isWheeled) {
//     loadCarousel(-1);
//     isWheeled = true;
//   }
// });
//-------------------------------------------------------
// Window Resize:
window.addEventListener('resize', updateCarousel());
