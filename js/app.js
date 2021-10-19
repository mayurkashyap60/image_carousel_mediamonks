// initializing all vaiables
var slider = document.getElementById("slider");
var sliderWidth = slider.offsetWidth;
var slideList = document.getElementById("sliderWrap");
var count = 1;
var items = slideList.querySelectorAll("li").length;
var prev = document.getElementById("prev");
var next = document.getElementById("next");
//create function for image slider
var imageSlider = () => {
  window.addEventListener("resize", () => {
    sliderWidth = slider.offsetWidth;
  });

  var prevSlide = () => {
    if (count > 1) {
      count = count - 2;
      slideList.style.left = "-" + count * sliderWidth + "px";
      count++;
    } else if ((count = 1)) {
      count = items - 1;
      slideList.style.left = "-" + count * sliderWidth + "px";
      count++;
    }
  };

  var nextSlide = () => {
    if (count < items) {
      slideList.style.left = "-" + count * sliderWidth + "px";
      count++;
    } else if ((count = items)) {
      slideList.style.left = "0px";
      count = 1;
    }
  };

  next.addEventListener("click", () => {
    nextSlide();
  });

  prev.addEventListener("click", () => {
    prevSlide();
  });
};

window.onload = () => {
  imageSlider();
};

console.log("app.js is running");
