// Define an array of offer titles, prices, images, features, and timelines
let titles = [
  { text: "برنامج الحج الفاخر", type: "lux" },
  { text: "برنامج الحج الاقتصادي", type: "normal" },
  { text: "برنامج الحج المميز", type: "lux" },
  { text: "برنامج الحج العائلي", type: "mid" },
];

let prices = ["1500-2000", "2000-2500", "2500-3000", "3000-3500"];

let images = [
  "assets/images/img_1.jpg",
  "assets/images/img_2.jpg",
  "assets/images/img_3.png",
  "assets/images/img_4_00000.jpg",
];

let features = [
  ["فيزا", "تذكرة طيران", "حجز الفنادق"],
  ["فيزا", "تذكرة طيران", "حجز الفنادق"],
  ["تذكرة طيران", "حجز الفنادق"],
  ["فيزا", "تذكرة طيران"],
  ["تذكرة طيران", "حجز الفنادق"],
];

let timelines = [
  { from: "2023-05-11", to: "2023-05-15" },
  { from: "2023-05-16", to: "2023-05-20" },
  { from: "2023-05-21", to: "2023-05-25" },
  { from: "2023-05-26", to: "2023-05-30" },
  { from: "2023-06-01", to: "2023-06-05" },
];

let nationalities = [
  { title: "الفلسطينية", value: "PS" },
  { title: "الأردنية", value: "JO" },
  { title: "المصرية", value: "EG" },
  { title: "المغربية", value: "MO" },
  { title: "الأوروبية", value: "EU" },
];
// a function to translate the offer type
function translateOfferType(type) {
  switch (type) {
    case "lux":
      return "فاخر";
    case "mid":
      return "متوسط";
    case "normal":
      return "اقتصادي";
    default:
      return "غير محدد";
  }
}

// Define a function to generate a random offer
const generateRandomOffer = () => {
  const getRandomIndex = (array) => Math.floor(Math.random() * array.length);
  let titleObj = titles[getRandomIndex(titles)];
  let price = prices[getRandomIndex(prices)];
  let nationality = nationalities[getRandomIndex(nationalities)];
  let image = images[getRandomIndex(images)];
  let feature = features[getRandomIndex(features)];
  let timeline = timelines[getRandomIndex(timelines)];
  let fromDate = timeline.from; // Use the "from" property as the fromDate
  const data = {
    title: titleObj.text,
    type: titleObj.type,
    nationality,
    price,
    image,
    features: feature,
    timeline,
    fromDate,
  };

  const detailsLink = `offer.html?data=${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  data["detailsLink"] = detailsLink;
  console.log(data);
  return data;
};

// Generate an array of random offers
function generateRandomOffers(numOfOffers) {
  let randomOffers = [];
  for (let i = 0; i < numOfOffers; i++) {
    randomOffers.push(generateRandomOffer());
  }
  return randomOffers;
}
// Define the number of random offers you want to generate
let numOfOffers = 100; // default number of offers

// Generate an array of random offers
let randomOffers = generateRandomOffers(numOfOffers);

let offers = randomOffers;

function generateOfferMarkup(offer) {
  return `
  <div class="col-xs-12 col-sm-6 col-md-4">
    <div class="offer-item bg-white">
      <div class="offer-image-wrapper">
        <img src="${offer.image}" class="offer-image" />
      </div>
      <h3>${offer.title}</h3>
      <p>السعر: ${offer.price}$</p>
      <p>الجالية: ${offer.nationality.title}</p>
      <p>الفئة: ${translateOfferType(offer.type)}</p>
      <div class="dash-separator"></div>
      <div class="offer-features">
        ${offer.features
          .map(
            (feature) =>
              `<div class="offer-feature"><p><i class="fa-regular fa-check-square"></i> ${feature}</p></div>`
          )
          .join("")}
      </div>
      <ul class="offer-timeline">
        <li><p><i class="fa-solid fa-plane-departure"></i>من: ${
          offer.timeline.from
        }</p></li>
        <li><p><i class="fa-solid fa-plane-departure"></i>حتى: ${
          offer.timeline.to
        }</p></li>
      </ul>
      <a class="btn btn-default-outline" href="${
        offer.detailsLink
      }">التفاصيل</a>
    </div>
  </div>
  `;
}

// Function to clear the offers container
function clearOffersContainer() {
  const offersContainer = document.getElementById("offers-container");
  offersContainer.innerHTML = ""; // Clear the container
}
// Function to add more random offers
function addMoreRandomOffers(numOfOffers) {
  const moreRandomOffers = generateRandomOffers(numOfOffers);
  offers = offers.concat(moreRandomOffers);
}
function displayOffers() {
  clearOffersContainer(); // Clear the existing offers before displaying the updated offers
  const offersContainer = document.getElementById("offers-container");
  offers.forEach((offer) => {
    const offerMarkup = generateOfferMarkup(offer);
    offersContainer.insertAdjacentHTML("beforeend", offerMarkup);
  });
}

displayOffers();

// Event listener for the "More Programs" button
const moreProgramsButton = document.getElementById("moreProgramsButton");
moreProgramsButton.addEventListener("click", function () {
  let numOfOffersToAdd = 3; // Number of additional random offers to add
  addMoreRandomOffers(numOfOffersToAdd);
  // Updating the UI
  displayOffers();
});

function filterOffers(price, category, fromDate, nationality) {
  return offers.filter((offer) => {
    if (price && offer.price) {
      const [minPrice, maxPrice] = price.split("-");
      const offerPrice = parseInt(offer.price);
      if (offerPrice < minPrice || offerPrice > maxPrice) {
        return false;
      }
    }

    if (category && offer.type !== category) {
      return false;
    }

    if (
      fromDate &&
      (new Date(fromDate) < new Date(offer.timeline.from) ||
        new Date(fromDate) > new Date(offer.timeline.to))
    ) {
      return false;
    }

    if (nationality !== offer.nationality.value) {
      return false;
    }
    console.log({ price, category, fromDate, nationality });
    console.log(offer);
    return true;
  });
}

// Function to display the filtered offers
function displayFilteredOffers(filteredOffers) {
  clearOffersContainer(); // Clear the existing offers before displaying the filtered offers
  const offersContainer = document.getElementById("offers-container");
  if (filteredOffers.length === 0) {
    offersContainer.innerHTML = "<h3>لا يوجد عروض متاحة</h3>";
  } else
    filteredOffers.forEach((offer) => {
      const offerMarkup = generateOfferMarkup(offer);
      offersContainer.insertAdjacentHTML("beforeend", offerMarkup);
    });
}
// Update the event listener for the form submission
document
  .getElementById("offersSearchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the selected values from the search inputs
    let price = document.getElementsByName("price")[0].value;
    let category = document.getElementsByName("category")[0].value;
    let fromDate = document.getElementsByName("from")[0].value;
    let nationality = document.getElementsByName("nationality")[0].value;

    // Filter the offers based on the selected options
    let filteredOffers = filterOffers(price, category, fromDate, nationality);

    // Display the filtered offers
    displayFilteredOffers(filteredOffers);
  });

// Smooth scroll to target section
document.addEventListener("DOMContentLoaded", function () {
  // scroll to offers section on button click
  const button = document.querySelector(".btn-accent");
  const targetSection = document.querySelector("#offers-section");

  button.addEventListener("click", function (event) {
    event.preventDefault();
    const offset = targetSection.offsetTop;
    window.scroll({
      top: offset,
      behavior: "smooth",
    });
  });

  // scroll to top button

  const scrollToTopButton = document.getElementById("scrollToTopButton");
  const offersSection = document.getElementById("offers-section");

  function toggleScrollToTopButton() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const offersSectionTop = offersSection.offsetTop;

    if (scrollPosition > offersSectionTop) {
      scrollToTopButton.classList.add("active");
    } else {
      scrollToTopButton.classList.remove("active");
    }
  }

  function scrollToTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  window.addEventListener("scroll", toggleScrollToTopButton);
  scrollToTopButton.addEventListener("click", scrollToTop);
});
