const reviews = [
  {
    image: "assets/images/people/person_1.png",
    name: "خالد علي",
    country: "فلسطين",

    text: `هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
           لقد تم توليد هذا النص من منصة قالب جاهز ، حيث يمكنك
           أنا استخدام هذا النص و مثل هذا النص أو العديد من
           النصوص الأخرى و إضافة و زيادة عدد الحروف التى تخطر في
           بالك.`,
  },
  {
    image: "assets/images/people/person_1.png",
    name: "محمد أحمد",
    country: "مصر",

    text: `هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
           لقد تم توليد هذا النص من منصة قالب جاهز ، حيث يمكنك
           أنا استخدام هذا النص و مثل هذا النص أو العديد من
           النصوص الأخرى و إضافة و زيادة عدد الحروف التى تخطر في
           بالك.`,
  },
  {
    image: "assets/images/people/person_2.png",
    name: "محمود جودة",
    country: "فلسطين",

    text: `هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
          لقد تم توليد هذا النص من منصة قالب جاهز ، حيث يمكنك
          أنا استخدام هذا النص و مثل هذا النص أو العديد من
          النصوص الأخرى و إضافة و زيادة عدد الحروف التى تخطر في
          بالك.`,
  },
  {
    image: "assets/images/people/person_3.jpg",
    name: "سعد الدين",
    country: "اليمن",
    text: `هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
           لقد تم توليد هذا النص من منصة قالب جاهز ، حيث يمكنك
           أنا استخدام هذا النص و مثل هذا النص أو العديد من
           النصوص الأخرى و إضافة و زيادة عدد الحروف التى تخطر في
           بالك.`,
  },
  {
    image: "assets/images/people/person_4.jpg",
    name: "سمير محمد",
    country: "مصر",
    text: `هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
          لقد تم توليد هذا النص من منصة قالب جاهز ، حيث يمكنك
          أنا استخدام هذا النص و مثل هذا النص أو العديد من
          النصوص الأخرى و إضافة و زيادة عدد الحروف التى تخطر في
          بالك.`,
  },
  {
    image: "assets/images/people/person_1.png",
    name: "محمد أحمد",
    country: "مصر",
    text: `هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
           لقد تم توليد هذا النص من منصة قالب جاهز ، حيث يمكنك
           أنا استخدام هذا النص و مثل هذا النص أو العديد من
           النصوص الأخرى و إضافة و زيادة عدد الحروف التى تخطر في
           بالك.`,
  },
  {
    image: "assets/images/people/person_1.png",
    name: "سالم علي",
    country: "الجزائر",
    text: `هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة،
           لقد تم توليد هذا النص من منصة قالب جاهز ، حيث يمكنك
           أنا استخدام هذا النص و مثل هذا النص أو العديد من
           النصوص الأخرى و إضافة و زيادة عدد الحروف التى تخطر في
           بالك.`,
  },
];

window.onload = function () {
  loadReviews(0);
  adjustCursorItems();
};

function adjustCursorItems() {
  var cursorList = document.querySelector(".cursor");
  cursorList.innerHTML = "";
  for (let i = 0; i < Math.ceil(reviews.length / 2); i++) {
    var li = document.createElement("li");
    li.classList.add("cursor-item");
    li.addEventListener("click", function () {
      loadReviews(2 * i);
    });
    cursorList.appendChild(li);
  }
}

function loadReviews(startIndex) {
  displayReview(reviews[startIndex], "review1");
  if (reviews[startIndex + 1]) {
    displayReview(reviews[startIndex + 1], "review2");
  } else {
    document.getElementById("review2").innerHTML = "";
  }
}

function displayReview(review, reviewElementId) {
  var reviewElement = document.getElementById(reviewElementId);

  reviewElement.innerHTML = `
    <div class="review-item fade">
        <div class="row">
            <div class="col-md-4">
                <div class="img-wrapper">
                  <img src="${review.image}">
                </div>
                <p class="name">${review.name}</p>
                <p class="country">${review.country}</p>
            </div>
            <div class="col-md-8">
                <p class="review">${review.text}</p>
            </div>
            <div class="clear"></div>
        </div>
    </div>
  `;
}

var cursorItems = document.querySelectorAll(".cursor-item");
for (let i = 0; i < cursorItems.length; i++) {
  cursorItems[i].addEventListener("click", function () {
    displayReview(reviews[2 * i], "review1");
    displayReview(reviews[2 * i + 1], "review2");
  });
}
