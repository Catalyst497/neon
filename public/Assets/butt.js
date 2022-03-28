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
  toggleHeader = document.querySelector(".items");

toggle.addEventListener("click", function () {
  toggleHeader.classList.toggle("toggle-style");
  if (!toggle.classList.contains("active")) {
    toggle.innerHTML = "<i class='fas fa-times'></i>";
    toggle.classList.add("active");
  } else {
    toggle.innerHTML = "<i class='fas fa-bars'></i>";
    toggle.classList.remove("active");
  }
});

//Page width styling
function response(x) {
  if (x.matches) {
    document.querySelector(".items").classList.remove("toggle-style");
  } else {
    document.querySelector(".items").classList.add("toggle-style");
  }
}
windowResponse.onchange = response;
response(windowResponse);
hasSubItem.addEventListener("click", function () {
  subDropdown.classList.toggle("show-subitems");
});

//View Button
let imagesSpred = Array.from(images);
function view() {
  viewItem.classList.add("view-full");
}
function closeView() {
  viewItem.classList.remove("view-full");
}
function viewEffect(vbutn) {
  vbutn.addEventListener("click", function () {
    const image = imagesSpred.find(
      (image) =>
        image.getAttribute("data-value") == vbutn.getAttribute("data-value")
    );
    let viewData = `<div>
    <div class="view-image">${image.querySelector("img.Himg").outerHTML}</div>
      <ul>    
        <li><b>Name:</b> ${image.querySelector("span#name").innerHTML}</li>
        <li><b>Class:</b> </li>
        <li><b>Price:</b> ${image.querySelector("span.price").innerHTML}</li>
      </ul>
    </div>`;
    viewChild.innerHTML = "";
    viewChild.insertAdjacentHTML("afterbegin", viewData);
    view();
  });
}
viewButton.forEach(viewEffect);
hImage.forEach(viewEffect);
closeViewIcon.addEventListener("click", closeView);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && viewItem.classList.contains("view-full")) {
    closeView();
  }
});
