console.log("navigation.js loaded");

// Array of navigation link objects
let navLinks = [
  { title: "الرئيسية", link: "index.html" },
  { title: "العروض الخاصة بالحج", link: "offers" },
  { title: "خدمات الفيزا", link: "visa-services" },
  { title: "دليل العمرة", link: "umrah-guide" },
  { title: "تعرف علينا", link: "about-us" },
];

console.log("Nav links:", navLinks);
// Function to populate a navigation
function populateNav(navId) {
  // Get the ul element
  let navMenu = document.getElementById(navId);

  // Build the HTML for the navigation by mapping through the navLinks array
  let navHTML = navLinks
    .map(
      (navLink) =>
        `<li><a href="${
          !navLink.link.endsWith("html") && navLink.link !== ""
            ? `${navLink.link}.html`
            : `${navLink.link}`
        }">${navLink.title}</a></li>`
    )
    .join("\n");

  // Add the close menu item if this is the mobile navigation
  if (navId === "mobile-nav-menu") {
    navHTML += `<li id="mobile-nav-close"><a style="cursor: pointer">إغلاق القائمة</a></li>`;
    // Set the innerHTML of the ul to the built HTML
    navMenu.innerHTML = navHTML;
    let closeButton = document.getElementById("mobile-nav-close");
    closeButton.addEventListener("click", function () {
      mobileNav.classList.remove("active");
    });
  } else {
    // Set the innerHTML of the ul to the built HTML
    navMenu.innerHTML = navHTML;
  }
}

// Populate the navigations when the page loads
window.addEventListener("load", function () {
  console.log("loading navs");
  populateNav("desktop-nav-menu");
  populateNav("mobile-nav-menu");
});
