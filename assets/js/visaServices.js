// Mock data for the visa services
let visaServices = [];
for (let i = 1; i <= 20; i++) {
  visaServices.push({
    id: i,
    title: `Visa Service ${i}`,
    price: `${Math.floor(Math.random() * 1000) + 1000}$`,
    category:
      Math.random() > 0.5 ? "normal" : Math.random() > 0.5 ? "mid" : "lux",
    dateFrom: new Date(2023, 1, 1),
    nationality: {
      value: Math.random() > 0.5 ? "PS" : Math.random() > 0.5 ? "JO" : "EG",
      title:
        Math.random() > 0.5
          ? "الفلسطينية"
          : Math.random() > 0.5
          ? "الأردنية"
          : "المصرية",
    },
    detailsLink: "#",
    processingTime: `${Math.floor(Math.random() * 5) + 1} أيام`,
  });
}

function generateServiceMarkup(service) {
  return `
    <div class="visa-service">
      <h3>${service.title}</h3>
      <p>السعر: ${service.price}</p>
      <p>الفئة: ${service.category}</p>
      <p>الوقت المتوقع للتجهيز: ${service.processingTime}</p>
      <p>الجنسية: ${service.nationality.title}</p>
      <a href="${service.detailsLink}" class="btn btn-primary">معرفة المزيد</a>
    </div>
  `;
}

function renderServices(services) {
  const visaServicesContainer = document.getElementById("offers-container");
  visaServicesContainer.innerHTML = "";
  for (let i = 0; i < services.length; i++) {
    visaServicesContainer.innerHTML += generateServiceMarkup(services[i]);
  }
}

function filterServices() {
  const filterForm = document.getElementById("offersSearchForm");
  const nationalitySelect = filterForm.elements.namedItem("nationality");
  const selectedNationality = nationalitySelect.value;

  const filteredServices = visaServices.filter(
    (service) => service.nationality.value === selectedNationality
  );

  renderServices(filteredServices);
}

document.addEventListener("DOMContentLoaded", () => {
  renderServices(visaServices);

  const searchForm = document.getElementById("offersSearchForm");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterServices();
  });
});
