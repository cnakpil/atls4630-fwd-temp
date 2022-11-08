// import AOS from './node_modules/aos';
// import './node_modules/aos/dist/aos.css'; // You can also use <link> for styles
// import AOS from "https://unpkg.com/aos@next/dist/aos.js";
// import "https://unpkg.com/aos@next/dist/aos.css";

document.body.classList.add("hidden");
let theme = localStorage.getItem("data-theme");
// const toggle = document.querySelector('.theme-switch input[type="checkbox"]');

function doStuff(callback) {
    // on page load
    // get persistent theme from localStorage
    document.documentElement.setAttribute("data-theme", theme);

    // set toggle to correct side depending on theme
    // theme === "light" ? (toggle.checked = true) : (toggle.checked = false);

    // depending on current page, load correct image header
    loadImg();

    // initialize aos
    // AOS.init({
    //     duration: 1000,
    //     delay: 0,
    //     easing: 'ease-out-back',

    // });

    callback();
}

doStuff(function () {
    document.body.classList.remove("hidden");
    document.body.classList.add("visible");
    console.log("didStuff");
});

function loadImg() {
    // let landingImg = document.querySelector("#landing-img");
    let assignmentImg = document.querySelector("#assignment-img");
    assignmentImg.src = "images/assignments_dark.svg";
    // let projectImg = document.querySelector("#project-img");
    // let pageImg = document.querySelector("img").id;
    // if (pageImg === "landing-img") {
    //     theme === "dark"
    //         ? (landingImg.src = "images/makestuff_dark.svg")
    //         : (landingImg.src = "images/makestuff_light.svg");
    // } else if (pageImg === "assignment-img") {
    //     theme === "dark"
    //         ? (assignmentImg.src = "images/assignments_dark.svg")
    //         : (assignmentImg.src = "images/assignments_light.svg");
    // } else if (pageImg === "project-img") {
    //     theme === "dark"
    //         ? (projectImg.src = "images/projects_dark.svg")
    //         : (projectImg.src = "images/projects_light.svg");
    // }
}

// function toDark() {
//     document.documentElement.setAttribute("data-theme", "dark");
//     localStorage.setItem("data-theme", "dark");
//     theme = localStorage.getItem("data-theme");
//     loadImg();
// }
// function toLight() {
//     document.documentElement.setAttribute("data-theme", "light");
//     localStorage.setItem("data-theme", "light");
//     theme = localStorage.getItem("data-theme");
//     loadImg();
// }

// toggle.addEventListener("change", () => {
//     theme = localStorage.getItem("data-theme");
//     theme === "dark" ? toLight() : toDark();
// });
