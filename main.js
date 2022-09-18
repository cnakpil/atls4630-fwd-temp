document.body.classList.add("hidden");
let theme = localStorage.getItem("data-theme");
const slider = document.querySelector(".switch");
let loaded;

function doStuff(callback) {
  // on page load
  document.documentElement.setAttribute("data-theme", theme);

  // depending on current page, load correct image header
  loadImg();

  callback();
}

doStuff(function () {
  document.body.classList.remove("hidden");
  document.body.classList.add("visible");
});

function loadImg() {
  let landingImg = document.querySelector("#landing-img");
  let assignmentImg = document.querySelector("#assignment-img");
  let projectImg = document.querySelector("#project-img");
  let pageImg = document.querySelector("img").id;
  if (pageImg === "landing-img") {
    theme === "dark"
      ? (landingImg.src = "images/makestuff_dark.svg")
      : (landingImg.src = "images/makestuff_light.svg");
  } else if (pageImg === "assignment-img") {
    theme === "dark"
      ? (assignmentImg.src = "images/assignments_dark.svg")
      : (assignmentImg.src = "images/assignments_light.svg");
  } else if (pageImg === "project-img") {
    theme === "dark"
      ? (projectImg.src = "images/projects_dark.svg")
      : (projectImg.src = "images/projects_light.svg");
  }
}

// function preloader() {
//   var img = [];
//   for (var i = 0; i < 6; i++) img[i] = new Image();
//   img[0].src = "images/makestuff_dark.svg";
//   img[1].src = "images/makestuff_light.svg";
//   img[2].src = "images/assignments_dark.svg";
//   img[3].src = "images/assignments_light.svg";
//   img[4].src = "images/projects_dark.svg";
//   img[5].src = "images/projects_light.svg";
// }

function toDark() {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("data-theme", "dark");
  theme = localStorage.getItem("data-theme");
  loadImg();
}
function toLight() {
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("data-theme", "light");
  theme = localStorage.getItem("data-theme");
  loadImg();
}

slider.addEventListener("change", () => {
  theme = localStorage.getItem("data-theme");
  theme === "dark" ? toLight() : toDark();
});
