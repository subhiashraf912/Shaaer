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
    const data = {
      price,
      category,
      fromDate,
      nationality,
    };
    const offersLink = `offers.html?data=${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    location.href = offersLink;
  });
