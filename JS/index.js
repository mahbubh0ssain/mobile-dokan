const loadData = () => {
  const searchField = document.getElementById("search-field");
  const inputText = searchField.value;

  const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
  document.getElementById("search-field").value = "";
};

const displayData = (data) => {
  const searchResultDiv = document.getElementById("main-div");
  searchResultDiv.textContent = "";

  data.forEach((data) => {
    const div = document.createElement("div");

    div.classList.add("col");
    div.innerHTML = `  
        <div class="card h-100">
          <img  src= " ${data.image}"class="card-img-top p-3 "/>
          <div class="card-body">
            <h3 class="card-title">${data.brand}</h3>
            <h6 class="card-text">${data.phone_name}</h6>
            <button type="button" class="btn btn-primary" onclick="showFullDetails()">Full Details</button>
          </div>
        </div>
    `;
    searchResultDiv.appendChild(div);
  });
};

const showFullDetails = () => {
  
}