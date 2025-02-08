async function getData(api) {
  let response = await fetch(api);
  let data = await response.json();
  return data;
}

function createReview(data) {
  let randomNumber = Math.floor(Math.random() * 4) + 1;

  let review = document.createElement("div");
  review.classList.add("review");

  let reviewContentElement = document.createElement("p");
  let reviewContent = document.createTextNode(data.comment);

  reviewContentElement.appendChild(reviewContent);

  let reviewerInfo = document.createElement("div");
  reviewerInfo.classList.add("reviwer-info");

  let reviewerImg = document.createElement("img");
  reviewerImg.setAttribute(
    "src",
    `../assets/images/reviwer${randomNumber}.png`
  );
  reviewerImg.setAttribute("alt", data.name);

  let infoContainer = document.createElement("div");

  let reviewerNameEle = document.createElement("h3");
  let reviewerName = document.createTextNode(data.name);

  reviewerNameEle.appendChild(reviewerName);

  let rates = document.createElement("div");
  rates.classList.add("rates");

  for (let i = 1; i <= 5; i++) {
    let goodRate = document.createElement("img");
    goodRate.setAttribute("src", `../assets/images/review-star.png`);
    goodRate.setAttribute("alt", "goodRate");

    let badRate = document.createElement("img");
    badRate.setAttribute("src", `../assets/images/star2.png`);
    badRate.setAttribute("alt", "star2");
    if (data.rating <= 20000) {
      if (i <= 2) {
        rates.appendChild(goodRate);
      } else {
        rates.appendChild(badRate);
      }
    } else if (data.rating > 20000 && data.rating <= 50000) {
      if (i <= 3) {
        rates.appendChild(goodRate);
      } else {
        rates.appendChild(badRate);
      }
    } else if (data.rating > 50000 && data.rating <= 70000) {
      if (i <= 4) {
        rates.appendChild(goodRate);
      } else {
        rates.appendChild(badRate);
      }
    } else {
      rates.appendChild(badRate);
    }
  }

  infoContainer.appendChild(reviewerNameEle);
  infoContainer.appendChild(rates);

  reviewerInfo.appendChild(reviewerImg);
  reviewerInfo.appendChild(infoContainer);

  review.appendChild(reviewContentElement);
  review.appendChild(reviewerInfo);

  return review;
}

function createPlace(data) {
  let randomNumber = Math.floor(Math.random() * 8) + 1;

  const place = document.createElement("div");
  place.classList.add("place");

  const placeImg = document.createElement("div");
  placeImg.classList.add("place-img");
  const img = document.createElement("img");
  img.src = `../assets/images/place-${randomNumber}.png`;
  img.alt = "place-image";
  placeImg.appendChild(img);

  const content = document.createElement("div");
  content.classList.add("content");

  const address = document.createElement("div");
  address.classList.add("address");

  const spot = document.createElement("span");
  spot.classList.add("spot");
  const spotImg = document.createElement("img");
  spotImg.src = "../assets/images/address.png";
  spotImg.alt = "address";
  spot.appendChild(spotImg);
  spot.appendChild(document.createTextNode(` ${data.country}`));

  const rate = document.createElement("span");
  rate.classList.add("rate");
  const rateImg = document.createElement("img");
  rateImg.src = "../assets/images/star.png";
  rateImg.alt = "star";
  rate.appendChild(rateImg);
  rate.appendChild(document.createTextNode(` ${(data.id * 7.7).toFixed(1)}`));

  address.appendChild(spot);
  address.appendChild(rate);

  const title = document.createElement("h3");
  title.textContent = data.city;

  const duration = document.createElement("span");
  duration.textContent = "7 Days Tour on 2 person";

  const priceContainer = document.createElement("div");

  const link = document.createElement("a");
  link.href = "#";
  link.textContent = " View More ";
  const arrowImg = document.createElement("img");
  arrowImg.src = "../assets/images/arrow-back.png";
  arrowImg.alt = "arrow-back";
  link.appendChild(arrowImg);

  priceContainer.appendChild(link);

  content.appendChild(address);
  content.appendChild(title);
  content.appendChild(duration);
  content.appendChild(priceContainer);

  place.appendChild(placeImg);
  place.appendChild(content);

  return place;
}

try {
  let msg = document.querySelector(".msg");

  if (document.title == "Tourist Reviews") {
    let reviewsContainer = document.querySelector(".reviews");
    getData(
      "https://679fdbb124322f8329c4c8f3.mockapi.io/api/tourist/reviews"
    ).then((data) => {
      if (data.length < 1) {
        // There Is No Data Here
        msg.classList.toggle("show");
      }
      // Show reviews On page
      data.forEach((review) => {
        reviewsContainer.appendChild(createReview(review));
      });
    });
  }

  if (document.title == "Tourist Destinations") {
    let placesContainer = document.querySelector(".places");
    getData(
      "https://679fdbb124322f8329c4c8f3.mockapi.io/api/tourist/tour-destinations"
    ).then((data) => {
      if (data.length < 1) {
        // There Is No Data Here
        msg.classList.toggle("show");
      }
      // Show reviews On page
      data.forEach((review) => {
        placesContainer.appendChild(createPlace(review));
      });
    });
  }
} catch {
  console.log("Error Msg");
}
