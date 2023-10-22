async function init() {
  magazines.forEach(async (item, idx) => {
    let magazinesData = await fetchMagazines(item);
    const containerEle = document.getElementById("accordion");
    const ele = magazineToDom(magazinesData.feed, idx);
    containerEle.append(ele);
    createCarousel(magazinesData.items, idx);
    addCarouselItem(magazinesData.items,idx);
  });
}
async function fetchMagazines(magazine) {
  let res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${magazine}`
  );
  let data = await res.json();
  return data;
}

function magazineToDom(feed, idx) {
  const accItem = document.createElement("div");
  accItem.className = "accordion-item";
  accItem.innerHTML = `
  <h2 class="accordion-header" id="heading${idx + 1}">
      <button class="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${
        idx + 1
      }" aria-expanded="true" aria-controls="collapse${idx + 1}">
      ${feed.title}
      </button>
  </h2>
  <div id="collapse${idx + 1}" class="accordion-collapse collapse ${
    idx === 0 ? "show" : ""
  }" aria-labelledby="heading${
    idx + 1
  }" data-bs-parent="#accordion">
      <div class="accordion-body" id = "accordion${idx}">
      </div>
    </div>
  `;
  return accItem;
}

function createCarousel(items, idx) {
    console.log(items);
    const carouselEle = document.createElement("div");
    carouselEle.className = "carousel slide";
    carouselEle.id = `carouselXboardControls${idx}`;
    carouselEle.setAttribute("data-bs-ride", "carousel");
    carouselEle.innerHTML = `<div class="carousel-inner" id = "carouselInner${idx}">
    
    </div>
    <button class="carousel-control-prev"  type="button" data-bs-target="#carouselXboardControls${idx}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next"  type="button" data-bs-target="#carouselXboardControls${idx}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>`;

  document.getElementById(`accordion${idx}`).append(carouselEle);
  
}

function addCarouselItem(items,idx){
  const carouselInner = document.getElementById(`carouselInner${idx}`);
  const noImg =
    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";

  items.forEach((item, idx) => {
    const date = item.pubDate.split(" ")[0].split("-");
    const carouselItem = document.createElement("a");
    carouselItem.href = item.link;
    carouselItem.className = `carousel-item ${idx === 0 ? "active" : ""}`;
    carouselItem.innerHTML = `
    <img src="${
      item.enclosure.link == undefined ? noImg : item.enclosure.link
    }" alt="Article Image Load Failed"  onerror="this.src='${noImg}'" />
    <h1>${item.title}</h1>
    <div>${item.author} • <span>${date[2]}/${date[1]}/${date[0].slice(
      2
    )}</span></div>
    <p id="newsContent">${item.content}</p>
  `;
    carouselInner.append(carouselItem);
  });
}
export { init };
