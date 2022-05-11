"use strict";
let toggle = document.getElementById("toggle"),
  headStart = document.querySelector("header"),
  windowResponse = window.matchMedia("(max-width: 670px)"),
  hasSubItem = document.querySelector(".has-subitem"),
  subDropdown = document.querySelector(".submenu"),
  viewButton = document.querySelectorAll(".view-good"),
  viewItem = document.querySelector(".view-item"),
  viewChild = document.querySelector(".view-child"),
  imagesContainer = document.querySelector(".bag-1"),
  shoesContainer = document.querySelector(".shoe-1"),
  hImage = document.querySelectorAll(".Himg"),
  closeViewIcon = document.querySelector("i.view"),
  choiceIcon = document.querySelector(".fa-ellipsis-vertical"),
  chooseDisplay = document.querySelector(".choose-display"),
  viewChoice = document.querySelector(".view-choice"),
  viewTypePara = document.querySelector(".viewtype"),
  images = document.querySelectorAll(".galle-1-L1"),
  imagesSpred = Array.from(images),
  recentBagList = imagesSpred.slice(0, 6),
  Shoes = document.querySelectorAll('.galle-S-L1'),
  ShoesArray = Array.from(Shoes),
  recentShoeList = ShoesArray.slice(0, 6),
  overlay = document.querySelector(".overlay"),
  showTitle = document.querySelector(".show-title"),
  viewCart = document.querySelector("span.view-cart"),
  cartLinks = document.querySelectorAll(".vwc"),
  loadingCart = document.querySelector('.loading-cart'),
  flashMessage = document.querySelector('.flash'),
  toggleHeader = document.querySelector(".items"),
  headerItems  = document.querySelectorAll('.item:not(.has-subitem)'),
  subItems = document.querySelectorAll('.subitem');
  let loading = document.querySelector('.loading');


  AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 70, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 500, // values from 0 to 3000, with step 50ms
  easing: 'ease-out', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
AOS.init();


// open view cart button
function showStuff(toBeShown) {
  toBeShown.classList.add("show-translate");
}
showStuff(viewCart);
// Toggle Item
function toggleItem(toggleVictim) {
  if (!toggleVictim.classList.contains("show-the-stuff")) {
    toggleVictim.style.display = "flex";
    toggleVictim.classList.add("show-the-stuff");
  } else {
    toggleVictim.classList.remove("show-the-stuff");
    setTimeout(() => {
      toggleVictim.style.display = "none";
    }, 300);
  }
}
images.forEach((image) => image.classList.add("show-the-stuff"));



//Header styling and it's complications
function response(x) {
  if (x.matches) {
    toggleHeader.classList.remove("toggle-wahala");
    function OAndCHeader(effector){
      effector.addEventListener("click", function () {
      if (!toggle.classList.contains("active")) {
        toggle.innerHTML = "<i class='fas fa-times'></i>";
        toggle.classList.add("active");
        toggleHeader.classList.add("toggle-wahala");
      } else {
        toggle.innerHTML = "<i class='fas fa-bars'></i>";
        toggle.classList.remove("active");
        toggleHeader.classList.remove("toggle-wahala");
      }
    })
    }
    OAndCHeader(toggle);
    function eachHeadItem(itemArray) {
      itemArray.forEach((item) => {
        OAndCHeader(item);
      })
    }
    eachHeadItem(headerItems);
    eachHeadItem(subItems);
    hasSubItem.addEventListener("click", function () {
      subDropdown.classList.toggle("show-subitems");
    });
  }else {
     document.querySelector(".items").classList.add("toggle-wahala");
  }
}
windowResponse.onchange = response;
response(windowResponse);


function fitImages(cont, list){
  cont.innerHTML = '';
  list.forEach(function(item){
    cont.insertAdjacentHTML("beforeend", item.outerHTML);
  });
}
// fitImages(imagesContainer, recentBagList);
// fitImages(shoesContainer, recentShoeList);

//Show Page
function openView (contItems) {
  contItems.forEach(function (image, i, arr) {
    function viewEffect() {
      viewItem.innerHTML = "";
      let modalContent = image.querySelector('.modal').innerHTML
      viewItem.insertAdjacentHTML("afterbegin", modalContent);
      view();
      // Addition and Subtraction of quantity
      let minus = viewItem.querySelector('.minus'),
      add = viewItem.querySelector('.plus'),
      QN = viewItem.querySelector('.number');
      minus.addEventListener('click', function(){
        QN.value--;
        QN.value = QN.value < 1 ? 1 : Math.round(QN.value);
      })
      add.addEventListener('click', function(){
        QN.value++;
        QN.value = QN.value < 1 ? 1 : Math.round(QN.value);
      })
      image.querySelector('.vwc').addEventListener('click', function(){
          loadingCart.style.display = 'flex';
        })
    }

  function view() {
    viewItem.classList.add("show-translate");
  setTimeout(() => {
    overlay.classList.add("open-display");
  }, 150);
}
  function closeView() {
  viewItem.classList.remove("show-translate");
  overlay.classList.remove("open-display");
}
    overlay.addEventListener("click", closeView);
    image.querySelector(".view-good").addEventListener("click", function () {
      viewEffect();
    });
    image.querySelector(".Himg").addEventListener("click", function () {
      viewEffect();
    });
  });
};
openView(imagesContainer.querySelectorAll(".galle-1-L1"));
openView(shoesContainer.querySelectorAll(".galle-S-L1"));

window.addEventListener('load', function () {
    loading.style.display = "none";
   setTimeout(() => {
      flashMessage.classList.remove('flash-trans');
   }, 5000)
})
cartLinks.forEach(function(link){
  link.addEventListener('click', function(){
    loadingCart.style.display = 'flex';
  })
})



