const toggle = document.getElementById("toggle");
const headStart = document.querySelector("header");
const toggleHeader = document.querySelector(".items");
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
