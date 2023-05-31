const urlString = location.href;
const url = new URL(urlString);
const encodedData = url.searchParams.get("data");
const data = JSON.parse(decodeURIComponent(encodedData));

// A function to translate the offer type
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
document.getElementById("offer-name").innerText = data.title;

const description = `هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.
هذا النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن يبدو وكأنه نص منسوخ، غير منظم، غير منسق، أو حتى غير مفهوم. لأنه مازال نصاً بديلاً ومؤقتاً.`;

const offerHTML = `
<div class="offer-item bg-white">
    <div class="single-offer">
      <div class="single-offer-image-wrapper">
        <img src="${data.image}" class="single-offer-image" />
      </div>
      <div class="single-offer-details">
      <p><b>البرنامج:</b> ${data.title}</p>
        <div class="single-offer-line"></div>
        <p><b>السعر:</b> ${data.price}$</p>
        <p><b>الجالية:</b> ${data.nationality.title}</p>
        <p><b>الفئة:</b> ${translateOfferType(data.type)}</p>
        <div class="single-offer-line"></div>
        <p><i class="fa-solid fa-plane-departure"></i>من: ${
          data.timeline.from
        }</p>
        <p><i class="fa-solid fa-plane-departure"></i>حتى: ${
          data.timeline.to
        }</p>
      <div class="single-offer-line"></div>
        <p><b>تفاصيل البرنامج:</b><br/><br/> ${description}</p>
        <br/>
      <a class="btn btn-default-outline" href="#">تقديم الطلب</a>
      </div>
    </div>
</div>
`;

const offerContainer = document.getElementById("single-offer-container");
offerContainer.innerHTML = offerHTML;
// Smooth scroll to target section
document.addEventListener("DOMContentLoaded", function () {
  console.log(data);
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
