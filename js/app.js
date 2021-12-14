//initializing all variables

const $slides = gsap.utils.toArray(".slide"); // to store all slide elements in array for sliding
const $slidesImage = gsap.utils.toArray(".img"); // store all images in array for sliding
const $buttonPrev = document.getElementById("prev"); // defined variable for previous slide
const $buttonNext = document.getElementById("next"); // defined variable for next slide

//initializing all variables

let totalSlides = $slides.length; // here first we get all slide length in a totalSlides variable
let currentSlide = 0; // take an variable and define it's state a zero for starting slide as a string from the zero.
const slidesWrap = gsap.utils.wrap(0, totalSlides); // store index of an Array into a specified range in variable

// variable for store their slide, directon and duration for sliding content
const transitionInSlide = ({ slide, direction = 1, duration = 1 }) => {
  //gsap.fromTo define for the starting and ending values for an animation
  gsap.fromTo(
    $slides[slide],
    {
      xPercent: direction > 0 ? 100 : -100,
    },
    {
      xPercent: 0,
      duration,
    }
  );

  //gsap.fromTo define for the starting and ending values for an animation
  gsap.fromTo(
    $slidesImage[slide], // sliding all sides as an array starting from the zero to array length
    {
      xPercent: direction > 0 ? -100 : 100,
    },

    {
      xPercent: 0,
      duration,
    }
  );
};

// function for slide with translate therir postion for x-axis from 0 to 100
const transitionOutSlide = ({ slide, direction = 1, duration = 1 }) => {
  gsap.to($slides[slide], {
    xPercent: direction > 0 ? -100 : 100,
    duration,
  });

  // gsap.to define the destination or starting index value
  gsap.to($slidesImage[slide], {
    xPercent: direction > 0 ? 100 : -100,
    duration,
  });
};

// function for handling the slider's previous slide
const handlePrev = () => {
  const oldSlide = currentSlide;
  currentSlide = slidesWrap(currentSlide - 1);
  transitionInSlide({ slide: currentSlide, direction: -1 });
  transitionOutSlide({ slide: oldSlide, direction: -1 });
};

// function for handling the slider's next slide
const handleNext = () => {
  const oldSlide = currentSlide;
  currentSlide = slidesWrap(currentSlide + 1);
  transitionInSlide({ slide: currentSlide });
  transitionOutSlide({ slide: oldSlide });
};

$slides.forEach(($slide, index) => {
  // define loop for starting from the zero with animation using array of index
  if (index === currentSlide) {
    transitionInSlide({ slide: index, duration: 0 });
    return;
  }

  transitionOutSlide({ slide: index, duration: 0 });
});

$buttonPrev.addEventListener("click", handlePrev); // adding event listener form sliding previous slide
$buttonNext.addEventListener("click", handleNext); // adding event listener form sliding next slide
