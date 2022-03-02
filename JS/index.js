// load data from API
const loadData = () => {
  // show spinner
  document.getElementById("spinner").style.display = "block";
  const searchField = document.getElementById("search-field");
  const inputText = searchField.value;
  if (inputText == "") {
    document.getElementById("search-error").style.display = "block";
    document.getElementById("spinner").style.display = "none";
  } else {
    document.getElementById("search-error").style.display = "none";
    document.getElementById("spinner").style.display = "block";
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayData(data.data));
    //clear search field
    document.getElementById("search-field").value = "";
  }
};
// display data from API
const displayData = (data) => {
  const searchResultDiv = document.getElementById("main-div");
  //clear content
  searchResultDiv.textContent = "";
  if (data.length == 0) {
    document.getElementById("search-text-error").style.display = "block";
  } else {
    document.getElementById("search-text-error").style.display = "none";
    data.forEach((data) => {
      const div = document.createElement("div");

      div.classList.add("col");
      div.innerHTML = `  
        <div class="card h-100 rounded-3 shadow">
          <img  src= " ${data.image}"class="card-img-top p-3 "/>
          <div class="card-body">
            <h3 class="card-title">${data.brand}</h3>
            <h6 class="card-text">${data.phone_name}</h6>
            <button type="button" class="btn btn-outline-primary" onclick="getId('${data.slug}')">Full Details</button>
          </div>
        </div>
    `;
      searchResultDiv.appendChild(div);
      
    });
  }
  // hide spinner
  document.getElementById("spinner").style.display = "none";
};

// get individual mobile id dynamic url function
const getId = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

// display mobile details function
const displayDetails = (data) => {
  const detailsDiv = document.getElementById("phone-details-div");
  detailsDiv.textContent = "";
  const div = document.createElement("div");
  div.classList.add("row", "shadow", "mb-5", "rounded-3", "mx-auto");
  div.innerHTML = `
    <div class="p-5 col-12  col-md-6">
        <h3 class="card-text">${data.name} </h3>
        <h5 class="card-text"> Brand: ${data.brand} </h5>
        <h6 class="text-danger">
        ${data.releaseDate ? data.releaseDate : "No release found"}
        </h6>
        <img src="${data.image}" class="card-img-top" />
    </div>
    <div class="p-3 col-12 col-md-6 my-auto">
         <ul class="list-group">
            <h5 class="text-center">Main Specification</h5>
            <li class="list-group-item"><p class="card-text"><b>Chipset:</b> ${
              data.mainFeatures.chipSet
            } </p></li>
            <li class="list-group-item"><p class="card-text"><b>Display:</b> ${
              data.mainFeatures.displaySize
            } </p></li>
            <li class="list-group-item"><p class="card-text"> <b>Storage:</b> ${
              data.mainFeatures.memory
            } </p></li>
         </ul>
         
         <ul class="list-group">
            <h5 class="text-center mt-2">Sensors</h5>
            <li class="list-group-item"><p class="card-text">${
              data.mainFeatures.sensors[0]
            } </p></li>
            <li class="list-group-item"><p class="card-text">${
              data.mainFeatures.sensors[1]
            } </p></li>
            <li class="list-group-item"><p class="card-text">${
              data.mainFeatures.sensors[2]
            } </p></li>
            <li class="list-group-item"><p class="card-text">${
              data.mainFeatures.sensors[3]
            } </p></li>
            <li class="list-group-item"><p class="card-text">${
              data.mainFeatures.sensors[4]
            } </p></li>
            <li class="list-group-item"><p class="card-text">${
              data.mainFeatures.sensors[5]
            } </p></li>
         </ul>
         <ul class="list-group">
            <h5 class="text-center mt-2">Others Specification</h5>
            <li class="list-group-item"><p class="card-text"><b>Blutooth:</b> ${
              data.others?.Bluetooth
            } </p></li>
            <li class="list-group-item"><p class="card-text"><b>GPS:</b> ${
              data.others?.GPS
            } </p></li>
            <li class="list-group-item"><p class="card-text"><b>Radio:</b> ${
              data.others?.Radio
            } </p></li>
            <li class="list-group-item"><p class="card-text"><b>USB:</b> ${
              data.others?.USB
            } </p></li>
            <li class="list-group-item"><p class="card-text"><b>WLAN:</b> ${
              data.others?.WLAN
            } </p></li>
         </ul>
    </div>
    `;
  detailsDiv.appendChild(div);
};
