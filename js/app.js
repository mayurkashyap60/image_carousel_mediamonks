// initializing all vaiables
var $slider = document.getElementById("slider");
const $sliderWidth = $slider.offsetWidth; // to get their size in pixel for sliding
const $slideList = document.getElementById("sliderWrap");
const $items = $slideList.querySelectorAll("li").length; // store all list in array for sliding
const $buttonPrev = document.getElementById("prev"); // defined variable for previous slide
const $buttonNext = document.getElementById("next"); // defined variable for next slide
var count = 1; //to default value
var isAutoPlay = false; //intialized variable for stopping autplay slider

//create function for load image slider
var imageSlider = () => {
  window.addEventListener("resize", () => {
    $sliderWidth = $slider.offsetWidth;
  });

  // function for handling the slider's next slide
  nextSlide = () => {
    if (count < $items) {
      var abc = count++;
      switch (abc) {
        case 1:
          TweenMax.to($slideList, { css: { left: -300 } });
          break;
        case 2:
          TweenMax.to($slideList, { css: { left: -600 } });
          break;
        case 3:
          TweenMax.to($slideList, { css: { left: -900 } });
          break;
        case 4:
          TweenMax.to($slideList, { css: { left: -1200 } });
          break;
        default:
          console.log("Not An Value");
          break;
      }
    } else if ((count = $items)) {
      TweenMax.to($slideList, { css: { left: 0 } });
      // TweenMax.to($slideList, { x: 0 });
      count = 1;
    }
  };

  // function for handling the slider's previous slide
  prevSlide = () => {
    if (count > 1) {
      count = count - 2;
      $slideList.style.left = "-" + count * $sliderWidth + "px";
      count++;
    } else if ((count = 1)) {
      count = $items - 1;
      $slideList.style.left = "-" + count * $sliderWidth + "px";
      count++;
    }
  };

  $buttonNext.addEventListener("click", () => {
    nextSlide();
  });

  $buttonPrev.addEventListener("click", () => {
    prevSlide();
  });
};
// when browser body load function
window.onload = () => {
  imageSlider();
};

//function for slider handling dealy function
const play = () => {
  nextSlide();
  TweenLite.delayedCall(4, play);
};

//function for starting autoplay slider
const startAutoPlay = (immediate) => {
  if (immediate != null) {
    immediate = false;
  }

  if (immediate) {
    nextSlide();
  }
  TweenLite.delayedCall(4, play);
};
//call autoplay function
startAutoPlay();

////////////////////////////////////
//function for stopping autoplay slider
const stopAutoPlay = () => {
  isAutoPlay = false;
  TweenLite.killTweensOf(play);
};

//over function for stop autoplay when user leave his cursor on slider
const over = () => {
  stopAutoPlay();
};
//leave function for starting autoplay when user leave his cursor on slider
const leave = () => {
  startAutoPlay();
};
