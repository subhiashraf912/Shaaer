// Define an array of visa services, prices, images, and features
let titles = [
  { text: "خدمة فيزا الحج", type: "hajj" },
  { text: "خدمة فيزا العمرة", type: "umrah" },
  { text: "خدمة فيزا الطالب", type: "student" },
  { text: "خدمة فيزا الزيارة", type: "visit" },
  { text: "خدمة فيزا العمل", type: "work" },
];
let prices = ["500-1000", "1000-1500", "1500-2000", "2000-2500"];

let images = [
  "assets/images/img_1.jpg",
  "assets/images/img_2.jpg",
  "assets/images/img_3.png",
  "assets/images/img_4_00000.jpg",
];

let requirements = [
  ["العمر أكثر من 18 سنة", "مرافق مطلوب", "تقديم الوثائق اللازمة أونلاين"],
  ["هوية شخصية", "اكمال تعبئة الطلب من الصفحة الرسمية", "شهادة الميلاد"],
  ["صورة عن شهادة عمل", "صورة عن رخصة قيادة", "المساعدة في تجهيز الوثائق"],
  ["التقديم على الفيزا", "فيزا سابقة إن وجد", "صورة لجواز سفر صالح"],
];
// a function to translate the visa service type
function translateVisaServiceType(type) {
  switch (type) {
    case "hajj":
      return "حج";
    case "umrah":
      return "عمرة";
    case "student":
      return "طالب";
    case "visit":
      return "زيارة";
    case "work":
      return "عمل";
    default:
      return "غير محدد";
  }
}

// Define a function to generate a random visa service
const generateRandomService = () => {
  const getRandomIndex = (array) => Math.floor(Math.random() * array.length);
  let titleObj = titles[getRandomIndex(titles)];
  let price = prices[getRandomIndex(prices)];
  let image = images[getRandomIndex(images)];
  let requires = requirements[getRandomIndex(requirements)];
  let data = {
    title: titleObj.text,
    type: titleObj.type,
    price,
    image,
    requirements: requires,
  };

  const detailsLink = `visa-service.html?data=${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  data["detailsLink"] = detailsLink;
  console.log(data);
  return data;
};
const numOfServices = 9;

// Generate an array of random visa services
function generateRandomServices(numOfServices) {
  let randomServices = [];
  for (let i = 0; i < numOfServices; i++) {
    randomServices.push(generateRandomService());
  }
  return randomServices;
}
// Generate an array of random visa services
let randomServices = generateRandomServices(numOfServices);
console.log("Generated Services", randomServices);
function generateServiceMarkup(service) {
  return `
  <div class="col-xs-12 col-sm-6 col-md-4">
    <div class="service-item bg-white">
      <div class="service-image-wrapper">
        <img src="${service.image}" class="service-image" />
      </div>
      <h3>${service.title}</h3>
      <p>السعر: ${service.price}$</p>
      <p>الفئة: ${translateVisaServiceType(service.type)}</p>
      <div class="dash-separator"></div>
      <div class="service-features">
        ${service.requirements
          .map(
            (requirement) =>
              `<div class="service-feature"><p><i class="fa-regular fa-check-square"></i> ${requirement}</p></div>`
          )
          .join("")}
      </div>
      <a class="btn btn-default-outline" href="${
        service.detailsLink
      }">التفاصيل</a>
    </div>
  </div>
  `;
}
// Function to clear the services container
function clearServicesContainer() {
  const servicesContainer = document.getElementById("services-container");
  servicesContainer.innerHTML = ""; // Clear the container
}
// Function to add more random services
function addMoreRandomServices(numOfServices) {
  const moreRandomServices = generateRandomServices(numOfServices);
  randomServices = randomServices.concat(moreRandomServices);
}
function displayServices() {
  clearServicesContainer(); // Clear the existing services before displaying the updated services
  const servicesContainer = document.getElementById("services-container");
  randomServices.forEach((service) => {
    const serviceMarkup = generateServiceMarkup(service);
    servicesContainer.insertAdjacentHTML("beforeend", serviceMarkup);
  });
}
displayServices();
// Function to filter services based on certain criteria
function filterServices(price, type, nationality) {
  return services.filter((service) => {
    if (price && service.price) {
      const [minPrice, maxPrice] = price.split("-");
      const servicePrice = parseInt(service.price);
      if (servicePrice < minPrice || servicePrice > maxPrice) {
        return false;
      }
    }

    if (type && service.type !== type) {
      return false;
    }

    if (nationality !== service.nationality.value) {
      return false;
    }

    return true;
  });
}
