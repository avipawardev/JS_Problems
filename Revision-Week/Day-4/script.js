let container = document.getElementById('container');
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageNo = document.getElementById("page");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");
const searchInp = document.getElementById("search");

let allProducts = [];
let currentData = [];
let currentPage = 1;
const productsPerPage = 8;

async function fetchData(){
  try {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    allProducts = data;
    currentData = [...allProducts];
    displayData(currentData);
  } catch (error) {
    console.log(error.message);
  }
}

function displayData(data){
  container.innerHTML = "";
  let start = (currentPage - 1) * productsPerPage;
  let end = start + productsPerPage;
  let paginatedData = data.slice(start, end);

  paginatedData.forEach((ele) => {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${ele.image}" alt="product image" />
      <div id="info">
        <h4>${ele.title}</h4>
        <p>₹${ele.price}</p>
        <p><i>${ele.category}</i></p>
      </div>
    `;
    container.appendChild(card);
  });

  pageNo.innerText = `Page: ${currentPage}`;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayData(currentData);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < Math.ceil(currentData.length / productsPerPage)) {
    currentPage++;
    displayData(currentData);
  }
});

filterSelect.addEventListener("change", () => {
  const val = filterSelect.value;
  currentData = val
    ? allProducts.filter((ele) => ele.category === val)
    : [...allProducts];
  currentPage = 1;
  displayData(currentData);
});

sortSelect.addEventListener("change", () => {
  const val = sortSelect.value;
  if (val === "asc") {
    currentData.sort((a, b) => a.price - b.price);
  } else if (val === "desc") {
    currentData.sort((a, b) => b.price - a.price);
  } else if (val === "alpha") {
    currentData.sort((a, b) => a.title.localeCompare(b.title));
  }
  currentPage = 1;
  displayData(currentData);
});

let timer;
searchInp.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const val = searchInp.value.trim().toLowerCase();
    currentData = allProducts.filter((ele) => {
      return ele.title.toLowerCase().includes(val) || ele.category.toLowerCase().includes(val);
    });
    currentPage = 1;
    displayData(currentData);
  }, 500);
});

fetchData();