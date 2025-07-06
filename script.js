
function addItem() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const contact = document.getElementById("contact").value;

  const item = { title, category, description, price, contact };
  let items = JSON.parse(localStorage.getItem("items") || "[]");
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  alert("Item added!");
  document.getElementById("title").value = "";
  document.getElementById("category").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("contact").value = "";
  showItems();
}

function showItems() {
  const list = document.getElementById("itemList");
  if (!list) return;
  list.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<b>${item.title}</b><br>${item.category}<br>${item.description}<br><b>${item.price}</b><br>Contact: ${item.contact}`;
    list.appendChild(div);
  });
}

function searchListings() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const results = document.getElementById("results");
  results.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  items.filter(i => (
    i.title.toLowerCase().includes(query) ||
    i.category.toLowerCase().includes(query) ||
    i.description.toLowerCase().includes(query)
  )).forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<b>${item.title}</b><br>${item.category}<br>${item.description}<br><b>${item.price}</b><br><a href="mailto:${item.contact}?subject=Interested in ${item.title}">I'm Interested</a>`;
    results.appendChild(div);
  });
}

window.onload = () => {
  if (document.getElementById("itemList")) showItems();
  if (document.getElementById("results")) searchListings();
};
