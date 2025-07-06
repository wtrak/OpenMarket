
let listings = [];

document.getElementById("imageUpload").addEventListener("change", function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(evt) {
    document.getElementById("preview").src = evt.target.result;
    document.getElementById("preview").style.display = "block";
  };
  reader.readAsDataURL(file);
});

document.getElementById("inventoryForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("preview").src;

  listings.push({ title, category, description, price, image });
  renderListings();
  this.reset();
  document.getElementById("preview").src = "";
});

document.getElementById("search").addEventListener("input", function(e) {
  renderListings(e.target.value.toLowerCase());
});

function renderListings(filter = "") {
  const container = document.getElementById("storefront");
  container.innerHTML = "";
  listings
    .filter(item => item.title.toLowerCase().includes(filter) || item.description.toLowerCase().includes(filter))
    .forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${item.image}" width="200"><br>
        <strong>${item.title}</strong><br>
        <em>${item.category}</em><br>
        ${item.description}<br>
        <strong>$${parseFloat(item.price).toFixed(2)}</strong><br><br>
        <button onclick="messageSeller('${item.title}')">I'm interested</button>
        <hr>
      `;
      container.appendChild(div);
    });
}

function messageSeller(title) {
  alert("Message sent to seller for: " + title);
}
