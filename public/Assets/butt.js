"use strict";
const toggle = document.getElementById("toggle"),
  headStart = document.querySelector("header"),
  windowResponse = window.matchMedia("(min-width: 670px)"),
  hasSubItem = document.querySelector(".has-subitem"),
  subDropdown = document.querySelector(".submenu"),
  viewButton = document.querySelectorAll(".view-good"),
  viewItem = document.querySelector(".view-item"),
  viewChild = document.querySelector(".view-child"),
  imagesContainer = document.querySelector(".galle-1"),
  images = document.querySelectorAll(".galle-1-L1"),
  hImage = document.querySelectorAll(".Himg"),
  closeViewIcon = document.querySelector("i.view"),
  choiceIcon = document.querySelector(".fa-ellipsis-vertical"),
  chooseDisplay = document.querySelector(".choose-display"),
  viewChoice = document.querySelector(".view-choice"),
  viewTypePara = document.querySelector(".viewtype"),
  imagesSpred = Array.from(images),
  overlay = document.querySelector(".overlay"),
  showTitle = document.querySelector(".show-title"),
  viewCart = document.querySelector("span.view-cart"),
  toggleHeader = document.querySelector(".items");


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
  offset: 120, // offset (in px) from the original trigger point
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
toggleHeader.classList.remove("toggle-wahala");
toggle.addEventListener("click", function () {
  if (!toggle.classList.contains("active")) {
    toggle.innerHTML = "<i class='fas fa-times'></i>";
    toggle.classList.add("active");
    toggleHeader.classList.add("toggle-wahala");
  } else {
    toggle.innerHTML = "<i class='fas fa-bars'></i>";
    toggle.classList.remove("active");
    toggleHeader.classList.remove("toggle-wahala");
  }
});

//Page width styling
function response(x) {
  if (x.matches) {
    document.querySelector(".items").classList.add("toggle-wahala");
  }
   else {
    document.querySelector(".items").classList.remove("toggle-wahala");
  }
}
windowResponse.onchange = response;
response(windowResponse);
hasSubItem.addEventListener("click", function () {
  subDropdown.classList.toggle("show-subitems");
});

//Show Page
function openViewPage(cont) {
  cont.querySelectorAll(".galle-1-L1").forEach(function (image, i, arr) {
    let addCartForm = image.querySelector('form.add-to-cart');
    function viewEffect() {
    let viewData = `
      <div>
      <div class="view-image">${image.querySelector("img.Himg").outerHTML}</div>
        <ul>
          <div class="show-title"><b> ${
            image.querySelector("h4.name").innerHTML
          }</b></div>
          <li><b>Spec:</b> </li>
          <li><b>Price:</b> ${image.querySelector(".price").innerHTML}</li>
          </ul>
          ${addCartForm.outerHTML}
          <a class= 'go-to-cart' href="/cart">View Cart</a>
          </div>`;
      viewItem.innerHTML = "";
      viewItem.insertAdjacentHTML("afterbegin", viewData);
      view();
    }
  function view() {
    viewItem.classList.add("show-translate");
    viewItem.querySelector('form.add-to-cart').setAttribute('style', 'display: block');
  setTimeout(() => {
    overlay.classList.add("open-display");
  }, 300);
}
  function closeView() {
  image.querySelector('form.add-to-cart').setAttribute('style', 'display: none');
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
}

//Choose how to show bags
let viewType;
let recentBaglist = imagesSpred.slice(0, 4);
let delaySeconds = 50;
let imageCont;
let usableStuff;
function imageAmount(image) {
  imagesContainer.insertAdjacentHTML("beforeend", image.outerHTML);
}
(function () {
  imagesContainer.classList.remove("show-the-stuff");
  imagesContainer.innerHTML = "";
  recentBaglist.forEach(imageAmount);
  setTimeout(() => {
    imagesContainer.classList.add("show-the-stuff");
  }, 400);
})();
openViewPage(imagesContainer);
function changeView() {
  toggleItem(chooseDisplay);
  setTimeout(() => {
    viewTypePara.textContent = viewChoice.textContent;
    viewType =
      viewTypePara.textContent === "View All" ? "Recently Added" : "View All";
    viewChoice.textContent = viewType;
    let usableList;
    if (viewTypePara.textContent === "Recently Added") {
      imagesContainer.classList.remove("show-the-stuff");
      imagesContainer.innerHTML = "";
      usableList = recentBaglist;
    } else {
      imagesContainer.classList.remove("show-the-stuff");
      imagesContainer.innerHTML = "";
      usableList = imagesSpred;
    }
    usableList.forEach(imageAmount);
    setTimeout(() => {
      imagesContainer.classList.add("show-the-stuff");
    }, 400);
    openViewPage(imagesContainer);
  }, 500);
}
choiceIcon.addEventListener("click", function () {
  toggleItem(chooseDisplay);
});
viewChoice.addEventListener("click", changeView);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && viewItem.classList.contains("view-full")) {
    closeView();
  }
});

