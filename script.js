function addItem() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const contact = document.getElementById("contact").value;
  const boothFile = document.getElementById("boothPhoto").files[0];

  if (!boothFile) {
    alert("Please upload a booth photo.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const imageDataUrl = reader.result;

    const item = {
      title,
      category,
      description,
      price,
      contact,
      image: imageDataUrl
    };

    const items = JSON.parse(localStorage.getItem("market_items") || "[]");
    items.push(item);
    localStorage.setItem("market_items", JSON.stringify(items));

    alert("Item added!");
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("boothPhoto").value = "";

    showItems();
  };

  reader.readAsDataURL(boothFile);
}

function showItems() {
  const list = document.getElementById("itemList");
  if (!list) return;
  list.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("market_items") || "[]");
  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <img src="${item.image}" alt="Booth Image" style="max-width: 150px;"><br>
      <b>${item.title}</b><br>${item.category}<br>${item.description}<br>
      <b>${item.price}</b><br>Contact: ${item.contact}<hr>`;
    list.appendChild(div);
  });
}

function searchListings() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const groups = document.querySelectorAll(".listing-group");

  groups.forEach(group => {
    const text = group.innerText.toLowerCase();
    group.style.display = text.includes(keyword) ? "block" : "none";
  });
}

window.onload = () => {
  if (document.getElementById("itemList")) showItems();
  if (document.getElementById("results")) searchListings();
};
