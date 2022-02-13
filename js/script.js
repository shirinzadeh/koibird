const navbarToggler = document.querySelector('.js-navbar-toggler');
const closeNavbar = document.querySelector('.js-close-navbar');
const html = document.querySelector('html');

// OPEN SIDE MENU
navbarToggler.addEventListener('click', () => {
  html.classList.add('js-side-menu-open')
})
 
 // CLOSE SIDE MENU
if( closeNavbar ) {
  closeNavbar.addEventListener('click', () => {
    html.classList.remove('js-side-menu-open')
  })
}

/**
 * ************* CAROUSEL ***************
 */
(function() {
  let carousels = document.querySelectorAll('.js-carousel');
  
  [].forEach.call(carousels, function(carousel) {
    carouselize(carousel);
  });
  
})();

function carouselize(carousel) {
  let carouselContent = carousel.querySelector('.js-item-list');
// let arrayOfCarouselContent = Array.prototype.slice.call(carouselContent);
  let items = carousel.querySelectorAll('.item');
  let arrayOfItems = Array.prototype.slice.call(items);
  let carouselDisplaying;
  let lengthOfItem;
  setScreenSize();

  function addClone() {   
      let lastItem = carouselContent.lastElementChild.cloneNode(true);
      lastItem.style.left = (-lengthOfItem) + "px";
      carouselContent.insertBefore(lastItem, carouselContent.firstChild);
  }
  // addClone();

  function removeClone() {
    let firstItem = carouselContent.firstElementChild;
    firstItem.parentNode.removeChild(firstItem);
  }

  function moveItemsRight() {
    let items = carousel.querySelectorAll('.item');
    let itemsArray = Array.prototype.slice.call(items);
    let width = 0;

    itemsArray.forEach(function(el, i){
      el.style.left = width + "px";
      width += lengthOfItem;
    });
    addClone();
  }
  moveItemsRight();

  function moveItemsLeft() {
    let items = carousel.querySelectorAll('.item');
    let itemsArray = Array.prototype.slice.call(items);
    itemsArray = itemsArray.reverse();
    let maxWidth = (itemsArray.length - 1) * lengthOfItem;

    itemsArray.forEach(function(el, i){
      maxWidth -= lengthOfItem;
      el.style.left = maxWidth + "px";
    });
  }


  function setScreenSize() {
    const windowWidth = window.innerWidth;

    if ( windowWidth >= 1500 ) {
        carouselDisplaying = 4;
    } else if ( windowWidth >= 992 ) {
        carouselDisplaying = 3;
    } else if (windowWidth >= 768) {
        carouselDisplaying = 2;
    } else {
        carouselDisplaying = 1;
    }
    getScreenSize();
  }

  window.addEventListener('resize', setScreenSize);

  function getScreenSize() {
    let items = carousel.querySelectorAll('.item');
    let itemsArray = Array.prototype.slice.call(items);
    lengthOfItem = ( carouselContent.offsetWidth  / carouselDisplaying );
    let initialWidth = -lengthOfItem;
    itemsArray.forEach(function(el) {
      el.style.width = lengthOfItem + "px";
      el.style.left = initialWidth + "px";
      initialWidth += lengthOfItem;
    });
  }

  let rightNav = carousel.querySelector('.js-carousel-nav-right');
  rightNav.addEventListener('click', moveLeft);

  let moving = true;
  function moveRight() {
    if ( moving ) {
      moving = false;
      let lastItem = carouselContent.lastElementChild;
      lastItem.parentNode.removeChild(lastItem);
      carouselContent.insertBefore(lastItem, carouselContent.firstChild);
      removeClone();
      let firstItem = carouselContent.firstElementChild;
      firstItem.addEventListener('transitionend', activateAgain);
      moveItemsRight();
    }
  }

  function activateAgain() {
    let firstItem = carouselContent.firstElementChild;
    moving = true;
    firstItem.removeEventListener('transitionend', activateAgain);
  }

  let leftNav = carousel.querySelector('.js-carousel-nav-left');
  leftNav.addEventListener('click', moveRight);

  function moveLeft() {
    if ( moving ) {
      moving = false;
      removeClone();
      let firstItem = carouselContent.firstElementChild;
      firstItem.addEventListener('transitionend', replaceToEnd);
      moveItemsLeft();
    }
  }

  function replaceToEnd() {
    let firstItem = carouselContent.firstElementChild;
    firstItem.parentNode.removeChild(firstItem);
    carouselContent.appendChild(firstItem);
    firstItem.style.left = ( (arrayOfItems.length -1) * lengthOfItem) + "px";
    addClone();
    moving = true;
    firstItem.removeEventListener('transitionend', replaceToEnd);
  }

  /* DRAGGABLE CAROUSEL */
  let isDown = false;
  let startX;
  let scrollLeft;

  function end () {
    isDown = false;
    carouselContent.classList.remove('is-active');
  }

  function start(e) {
    isDown = true;
    carouselContent.classList.add('is-active');
    startX = e.pageX || e.touches[0].pageX - carouselContent.offsetLeft;
    scrollLeft = carouselContent.scrollLeft;	
  }

  function move(e) {
    if(!isDown) return;

    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - carouselContent.offsetLeft;
    const dist = (x - startX);
    // Drag carousel to left
    if( dist > 0) { 
      moveRight()
    } 
    // Drag carousel to right
    if( dist < 0 ) {
      moveLeft()
    }
    // carouselContent.scrollLeft = scrollLeft - dist;
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

}

/**
 * ********** EMAIL VALIDATION **********
 */
 const invalidTxt = document.querySelector('.invalid');
 const validTxt = document.querySelector('.valid');

function validateEmail(val)
{
  var emailRgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  if(val.match(emailRgx)){
    validTxt.style.display = "block";
    invalidTxt.style.display = "none";
    return true;
  } else {
    invalidTxt.style.display = "block";
    validTxt.style.display = "none";
    return false;
  }
}

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailInput = document.querySelector('.email_field');
  const emailVal = emailInput.value;
  console.log(emailVal)
  validateEmail(emailVal);
})
