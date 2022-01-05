// initializing all vaiables
const $slideList = $("#slider");
const $items = $slideList.find("li"); // store all list in array for sliding
const slidesNum = $items.length;
const $buttonPrev = document.getElementById("prev"); // defined variable for previous slide
const $buttonNext = document.getElementById("next"); // defined variable for next slide
var isAutoPlay = false; //intialized variable for stopping autplay slider
var previousSlide = null; //initialized variable by previous slide defined as a null or zero
var currentSlide = 0; //initialized variable by current slide defined as 0
var isBehave = false; //initialized variable by previous slide defined as a null

//create function for load image slider
var imageSlider = () => {
  TweenLite.set($items, {
    left: "-100%",
  });
  renderSlider(0, 0);

  $buttonNext.addEventListener("click", () => {
    nextSlide();
  });

  $buttonPrev.addEventListener("click", () => {
    prevSlide();
  });
};

function renderSlider(slideID, _time, _direction) {
  if (!isBehave) {
    isBehave = true;
    previousSlide = currentSlide;
    currentSlide = slideID;
    var $prevSlide = $items.eq(previousSlide);
    var $currentSlide = $items.eq(currentSlide);
    var time = 1;
    if (_time !== null) {
      time = _time;
    }
    var direction = "next";
    if (_direction != null) {
      direction = _direction;
    }
    if (direction == "next") {
      TweenLite.to($prevSlide, time, {
        left: "-100%",
      });
      TweenLite.fromTo(
        $currentSlide,
        time,
        {
          left: "100%",
        },
        {
          left: "0",
        }
      );
    } else {
      TweenLite.to($prevSlide, time, {
        left: "100%",
      });
      TweenLite.fromTo(
        $currentSlide,
        time,
        {
          left: "-100%",
        },
        {
          left: "0",
        }
      );
    }
    TweenLite.delayedCall(time, function () {
      isBehave = false;
    });
  }
}

// function for handling the slider's next slide
var nextSlide = () => {
  var firstSlide = currentSlide + 1;
  if (firstSlide >= slidesNum) {
    firstSlide = 0;
  }
  renderSlider(firstSlide, 1, "next");
};

// function for handling the slider's previous slide
var prevSlide = () => {
  var firstSlide = currentSlide - 1;
  if (firstSlide <= -1) {
    firstSlide = slidesNum - 1;
  }
  renderSlider(firstSlide, 1, "prev");
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

// when browser body load function
window.onload = () => {
  imageSlider();
};

console.log("app.js is running");
