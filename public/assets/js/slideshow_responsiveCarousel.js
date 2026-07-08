/*code for a single slideshow

const wrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slides-wrapper img");
const totalSlides = slides.length;


// Clone first slide and append at the end for seamless loop
const firstClone = slides[0].cloneNode(true);
wrapper.appendChild(firstClone);
let slideIndex = 0;
const slideWidth = 100;
const transitionTime = 1500;
const intervalTime=3000;

function moveSlides() {
  slideIndex++;
  wrapper.style.transition = `transform ${transitionTime}ms linear`;
  wrapper.style.transform = `translateX(-${slideIndex * slideWidth}%)`;

   // When reaching the clone, jump back to first slide instantly
  if (slideIndex === totalSlides) {
    setTimeout(() =>{
      wrapper.style.transition ='none';
      wrapper.style.transform = 'translateX(0)';
      slideIndex = 0;
    }, transitionTime);  
  }
}

setInterval(moveSlides, intervalTime);
*/
//always add to check:
console.log("slideshow_responsiveCarousel.js loaded");
//code for multiple slideshows - just the first wrapping line added:
document.querySelectorAll(".slideshow-container").forEach(container => {

  const wrapper = container.querySelector(".slides-wrapper");
  const slides = wrapper.querySelectorAll("img");

  const totalSlides = slides.length;

  // Clone the first slide
  const firstClone = slides[0].cloneNode(true);
  wrapper.appendChild(firstClone);

  let slideIndex = 0;
  const slideWidth = 100;
  const transitionTime = 1500;
  const intervalTime = 6000;

  function moveSlides() {
    slideIndex++;

    wrapper.style.transition = `transform ${transitionTime}ms linear`;
    wrapper.style.transform = `translateX(-${slideIndex * slideWidth}%)`;

    if (slideIndex === totalSlides) {
      setTimeout(() => {
        wrapper.style.transition = "none";
        wrapper.style.transform = "translateX(0)";
        slideIndex = 0;
      }, transitionTime);
    }
  }

  setInterval(moveSlides, intervalTime);

});

