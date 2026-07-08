//NOT THIS FILE FOR CAROUSEL, IT'S slideshow_responsiveCarousel.js
/* code for 1 slideshow
const slides = document.querySelectorAll(".mySlides");

let currentIndex = 0;

function moveCarousel() {
  currentIndex++;

  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }

  slidesWrapper.style.transform =
    `translateX(-${currentIndex * 100}%)`;
}

setInterval(moveCarousel, 3000);
*/

// code for multiple slideshows
//NOT THIS FILE FOR CAROUSEL, IT'S slideshow_responsiveCarousel.js
console.log("carousel loaded");
document.addEventListener("DOMContentLoaded", ()=>{


document.querySelectorAll(".slideshow-container").forEach(container => {

  const wrapper = container.querySelector(".slides-wrapper");
  const slides = container.querySelectorAll(".mySlides");

  let currentIndex = 0;

  function moveCarousel() {

    currentIndex++;

    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    //const slideWidth = container.clientWidth;

   // wrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  setInterval(moveCarousel, 3000);

});
});
