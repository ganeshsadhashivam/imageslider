const carousel = document.querySelector(".carousel");

const firstImg = carousel.querySelectorAll("img")[0];
//console.log(firstImg);

const arrowIcons = document.querySelectorAll(".wrapper i");

let isdragstart = false,
  prevpagex,
  prevscrollleft,
  positiondiff,
  isdragging = false;

const showHideIcons = () => {
  //getting max scrollable width
  let scrollwidth = carousel.scrollWidth - carousel.clientWidth;
  //console.log(scrollwidth);
  // showing and hiding prev/next icon according to carousel scroll left value
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollwidth ? "none" : "block";

  // console.log(arrowIcons[0], arrowIcons[1]);
};

arrowIcons.forEach((icon) => {
  //getting first image width and adding 14 margin value
  let firstImgWidth = firstImg.clientWidth + 14;
  icon.addEventListener("click", () => {
    // if clicked icon is left, reduce width value from the carousel scroll left else add to it
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    console.log(Math.floor(carousel.scrollLeft));
    //calling showHideIcons after 60ms
    setTimeout(() => showHideIcons(), 60);
  });
});

const autoSlide = () => {
  //if there is no img to scroll then return from here
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;
  //making positiondiff value toi positive
  positiondiff = Math.abs(positiondiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  // getting difference value that needs to add or reduce from carousel left to take middle img center
  let valdifference = firstImgWidth - positiondiff;

  if (carousel.scrollLeft > prevscrollleft) {
    //if user scrolll to right
    return (carousel.scrollLeft +=
      positiondiff > firstImgWidth / 3 ? valdifference : -positiondiff);
  }
  //if user scroll to left
  carousel.scrollLeft -=
    positiondiff > firstImgWidth / 3 ? valdifference : -positiondiff;
};

const draggingStart = (e) => {
  //updating global variables value on mouse down event
  isdragstart = true;
  prevpagex = e.pageX || e.touches[0].pageX;
  console.log(prevpagex);
  //scrollLeft gives no of px of element content is scrolled horizontally
  prevscrollleft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isdragstart) return;
  e.preventDefault();
  isdragging = true;
  carousel.classList.add("dragging");
  positiondiff = (e.pageX || e.touches[0].pageX) - prevpagex;
  console.log(positiondiff);
  carousel.scrollLeft = prevscrollleft - positiondiff;
  showHideIcons();
};

const dragStop = () => {
  isdragstart = false;
  carousel.classList.remove("dragging");
  if (!isdragging) return;
  isdragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", draggingStart);
carousel.addEventListener("touchstart", draggingStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
