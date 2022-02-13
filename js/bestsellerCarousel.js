// window.addEventListener('resize', function(event) {
//    if( window.innerWidth >= 980 ) {
//       const dropdownToggle = document.querySelectorAll('.nav-link.dropdown-toggle');
      
//       dropdownToggle.addEventListener('mouseover', () => {
//          console.log('df')
//       })
//    }
// }, true);
var carousel = document.querySelector('.bestseller .carousel');
// var carouselContent = document.querySelector('.carousel__content');
var carouselContent = document.querySelector('.bestseller-carousel');
// var arrayOfCarouselContent = Array.prototype.slice.call(carouselContent);
var items = document.querySelectorAll('.bestseller .item');
var arrayOfItems = Array.prototype.slice.call(items);
var carouselDisplayingSeller;
var screenSizeSeller;
setscreenSizeSeller();
var lengthOfItemSeller;

function addClone() {   
    var lastItem = carouselContent.lastElementChild.cloneNode(true);
    lastItem.style.left = (-lengthOfItemSeller) + "px";
    carouselContent.insertBefore(lastItem, carouselContent.firstChild);
}
// addClone();

function removeClone() {
  var firstItem = carouselContent.firstElementChild;
  firstItem.parentNode.removeChild(firstItem);
}

function moveItemsRight() {
  var items = document.querySelectorAll('.bestseller .item');
  var itemsArray = Array.prototype.slice.call(items);
  var width = 0;

  itemsArray.forEach(function(el, i){
    el.style.left = width + "px";
    width += lengthOfItemSeller;
  });
  addClone();
}
moveItemsRight();

function moveItemsLeft() {
  var items = document.querySelectorAll('.bestseller .item');
  var itemsArray = Array.prototype.slice.call(items);
  itemsArray = itemsArray.reverse();
  var maxWidth = (itemsArray.length - 1) * lengthOfItemSeller;

  itemsArray.forEach(function(el, i){
    maxWidth -= lengthOfItemSeller;
    el.style.left = maxWidth + "px";
  });
}

window.addEventListener('resize', setscreenSizeSeller);

function setscreenSizeSeller() {
   const windowWidth = window.innerWidth;

   if ( windowWidth >= 1500 ) {
      carouselDisplayingSeller = 4;
   } else if ( windowWidth >= 992 ) {
      carouselDisplayingSeller = 3;
   } else if (windowWidth >= 576) {
      carouselDisplayingSeller = 2;
   } else {
      carouselDisplayingSeller = 1;
   }
   getscreenSizeSeller();
}

function getscreenSizeSeller() {
  var items = document.querySelectorAll('.bestseller .item');
  var itemsArray = Array.prototype.slice.call(items);
  lengthOfItemSeller = ( carouselContent.offsetWidth  / carouselDisplayingSeller );
  var initialWidth = -lengthOfItemSeller;
  itemsArray.forEach(function(el) {
    el.style.width = lengthOfItemSeller + "px";
    el.style.left = initialWidth + "px";
    initialWidth += lengthOfItemSeller;
  });
}

var rightNav = document.querySelector('.bestseller .carousel__nav--right');
rightNav.addEventListener('click', moveLeft);

var moving = true;
function moveRight() {
  if ( moving ) {
    moving = false;
    var lastItem = carouselContent.lastElementChild;
    lastItem.parentNode.removeChild(lastItem);
    carouselContent.insertBefore(lastItem, carouselContent.firstChild);
    removeClone();
    var firstItem = carouselContent.firstElementChild;
    firstItem.addEventListener('transitionend', activateAgain);
    moveItemsRight();
  }
}

function activateAgain() {
  var firstItem = carouselContent.firstElementChild;
  moving = true;
  firstItem.removeEventListener('transitionend', activateAgain);
}

var leftNav = document.querySelector(' .bestseller  .carousel__nav--left');
leftNav.addEventListener('click', moveRight);

// var moveLeftAgain = true;

function moveLeft() {
  if ( moving ) {
    moving = false;
    removeClone();
    var firstItem = carouselContent.firstElementChild;
    firstItem.addEventListener('transitionend', replaceToEnd);
    moveItemsLeft();
  }
}

function replaceToEnd() {
  var firstItem = carouselContent.firstElementChild;
  firstItem.parentNode.removeChild(firstItem);
  carouselContent.appendChild(firstItem);
  firstItem.style.left = ( (arrayOfItems.length -1) * lengthOfItemSeller) + "px";
  addClone();
  moving = true;
  firstItem.removeEventListener('transitionend', replaceToEnd);
}

function getInitialPos() {
  var items = document.querySelectorAll('.bestseller .item');
  var itemsArray = Array.prototype.slice.call(items);
  initialPos = [];
  itemsArray.forEach(function(el){
    var left = Math.floor( parseInt( el.style.left.slice(0, -2 ) ) ); 
    initialPos.push( left );
  });
}

//DRAGGABLE CAROUSEL
let isDownSeller = false;
let startXSeller;
let scrollLeftSeller;
// const slider = document.querySelector('.carousel__content');

function end () {
	isDownSeller = false;
  carouselContent.classList.remove('is-active');
}

function start(e) {
  isDownSeller = true;
  carouselContent.classList.add('is-active');
  startXSeller = e.pageX || e.touches[0].pageX - carouselContent.offsetLeft;
  scrollLeftSeller = carouselContent.scrollLeftSeller;	
}

function move(e) {
	if(!isDownSeller) return;

  e.preventDefault();
  const x = e.pageX || e.touches[0].pageX - carouselContent.offsetLeft;
  const dist = (x - startXSeller);
  // Drag carousel to left
  if( dist > 0) { 
    moveRight()
  } 
  // Drag carousel to right
  if( dist < 0 ) {
    moveLeft()
  }
  // carouselContent.scrollLeftSeller = scrollLeftSeller - dist;
}

(() => {
	carouselContent.addEventListener('mousedown', start);
	carouselContent.addEventListener('touchstart', start);

	carouselContent.addEventListener('mousemove', move);
	carouselContent.addEventListener('touchmove', move);

	carouselContent.addEventListener('mouseleave', end);
	carouselContent.addEventListener('mouseup', end);
	carouselContent.addEventListener('touchend', end);
})();
