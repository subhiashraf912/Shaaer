// visa.js

let titles = [
  { text: "الفيزا الأمريكية", type: "tourist" },
  { text: "الفيزا الأوروبية", type: "business" },
  { text: "الفيزا الكندية", type: "student" },
  { text: "الفيزا الأسترالية", type: "work" },
];

let prices = ["300-500", "500-700", "700-900", "900-1100"];

let images = [
  "assets/images/img_visa_1.jpg",
  "assets/images/img_visa_2.jpg",
  "assets/images/img_visa_3.jpg",
  "assets/images/img_visa_4.jpg",
];

let processingTimes = ["3-5 أيام", "5-7 أيام", "7-10 أيام", "10-15 يوما"];

let nationalities = [
  { title: "الفلسطينية", value: "PS" },
  { title: "الأردنية", value: "JO" },
  { title: "المصرية", value: "EG" },
  { title: "المغربية", value: "MO" },
  { title: "الأوروبية", value: "EU" },
];

function translateVisaType(type) {
  switch (type) {
    case "tourist":
      return "سياحية";
    case "business":
      return "عمل";
    case "student":
      return "طالب";
    case "work":
      return "عمل";
    default:
      return "غير محدد";
  }
}

const generateRandomVisaService = () => {
  const getRandomIndex = (array) => Math.floor(Math.random() * array.length);
  let titleObj = titles[getRandomIndex(titles)];
  let price = prices[getRandomIndex(prices)];
  let nationality = nationalities[getRandomIndex(nationalities)];
  let image = images[getRandomIndex(images)];
  let processingTime = processingTimes[getRandomIndex(processingTimes)];
  const data = {
    title: titleObj.text,
    type: titleObj.type,
    nationality,
    price,
    image,
    processingTime,
  };

  const detailsLink = `visa-service.html?data=${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  data["detailsLink"] = detailsLink;
  console.log(data);
  return data;
};

function generateRandomVisaServices(numOfServices) {
  let randomServices = [];
  for (let i = 0; i < numOfServices; i++) {
    randomServices.push(generateRandomVisaService());
  }
  return randomServices;
}

let numOfServices = 100;
let randomServices = generateRandomVisaServices(numOfServices);
let visaServices = randomServices;

function generateServiceMarkup(service) {
  return `
  <div class="col-xs-12 col-sm-6 col-md-4">
    <div class="service-item bg-white">
      <div class="service-image-wrapper">
        <img src="${service.image}" class="service-image" />
      </div>
      <h3>${service.title}</h3>
      <p>السعر: ${service.price}</p>
      <p>الوقت المتوقع للتجهيز: ${service.processingTime}</p>
      <p>الجنسية: ${service.nationality.title}</p>
      <a href="${service.detailsLink}" class="btn btn-primary">معرفة المزيد</a>
    </div>
  </div>`;
}

function renderServices(services) {
  const visaServicesContainer = document.getElementById("visa-container");
  visaServicesContainer.innerHTML = "";
  for (let i = 0; i < services.length; i++) {
    visaServicesContainer.innerHTML += generateServiceMarkup(services[i]);
  }
}

function filterServices() {
  const filterForm = document.getElementById("visaServicesSearchForm");
  const nationalitySelect = filterForm.elements.namedItem("nationality");
  const selectedNationality = nationalitySelect.value;

  const filteredServices = visaServices.filter(
    (service) => service.nationality.value === selectedNationality
  );

  renderServices(filteredServices);
}

document.addEventListener("DOMContentLoaded", () => {
  renderServices(visaServices);

  const searchForm = document.getElementById("visaServicesSearchForm");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterServices();
  });
});
