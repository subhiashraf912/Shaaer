// getting the hamburger icon and the mobile nav
let hamburgerIcon = document.getElementById("hamburger-icon");
let mobileNav = document.getElementById("mobile-nav");

// creating a function to handle the click event on the hamburger icon
const mainMenuHamburgerIconHandler = () => {
  console.log("mainMenuHamburgerIconHandler called");
  mobileNav.classList.toggle("active"); // toggling the active class on the mobile nav
};

// adding the click event listener to the hamburger icon
hamburgerIcon.addEventListener("click", mainMenuHamburgerIconHandler);
