let inventory = [];
let filteredInventory = [];

const invBody = document.getElementById("invBody");
const invMsg = document.getElementById("invMsg");
const totalValue = document.getElementById("totalValue");

const pid = document.getElementById("pid");
const pname = document.getElementById("pname");
const pcategory = document.getElementById("pcategory");
const pprice = document.getElementById("pprice");
const pstock = document.getElementById("pstock");

function showMsg(text, type) {
  invMsg.classList.remove("hidden", "success", "error");
  invMsg.classList.add(type);
  invMsg.textContent = text;

  setTimeout(() => invMsg.classList.add("hidden"), 3000);
}

function clearForm() {
  pid.value = "";
  pname.value = "";
  pcategory.value = "";
  pprice.value = "";
  pstock.value = "";
}

async function loadInventory() {
  try {
    const res = await fetch("inventory.json");
    inventory = await res.json();
    filteredInventory = [...inventory];
    displayInventory(filteredInventory);
    showMsg("Inventory Loaded Successfully!", "success");
  } catch (err) {
    showMsg("JSON Error / inventory.json missing!", "error");
  }
}

function validate() {
  if (!pid.value.trim() || !pname.value.trim() || !pcategory.value.trim() ||
      !pprice.value.trim() || !pstock.value.trim()) {
    showMsg("All fields are required!", "error");
    return false;
  }

  if (parseInt(pprice.value) <= 0 || parseInt(pstock.value) < 0) {
    showMsg("Invalid price or stock!", "error");
    return false;
  }

  return true;
}

function calculateTotalValue(list) {
  let total = 0;
  list.forEach(p => total += p.price * p.stock);
  totalValue.textContent = total;
}

function displayInventory(list) {
  invBody.innerHTML = "";

  list.forEach((p) => {
    const row = document.createElement("tr");

    if (p.stock <= 5) {
      row.classList.add("low-stock");
    }

    row.innerHTML = `
      <td>${p.pid}</td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>₹${p.price}</td>
      <td>${p.stock}</td>
      <td>₹${p.price * p.stock}</td>
      <td>
        <button onclick="editProduct(${p.pid})">Edit</button>
        <button onclick="deleteProduct(${p.pid})">Delete</button>
      </td>
    `;

    row.querySelectorAll("button")[0].style.background = "#f59e0b";
    row.querySelectorAll("button")[0].style.border = "none";
    row.querySelectorAll("button")[0].style.padding = "6px 10px";
    row.querySelectorAll("button")[0].style.borderRadius = "8px";
    row.querySelectorAll("button")[0].style.cursor = "pointer";

    row.querySelectorAll("button")[1].style.background = "#ef4444";
    row.querySelectorAll("button")[1].style.border = "none";
    row.querySelectorAll("button")[1].style.padding = "6px 10px";
    row.querySelectorAll("button")[1].style.borderRadius = "8px";
    row.querySelectorAll("button")[1].style.cursor = "pointer";
    row.querySelectorAll("button")[1].style.marginLeft = "6px";

    invBody.appendChild(row);
  });

  calculateTotalValue(list);
}

function addProduct() {
  if (!validate()) return;

  const exists = inventory.some(p => p.pid === parseInt(pid.value));
  if (exists) {
    showMsg("Product ID already exists!", "error");
    return;
  }

  inventory.push({
    pid: parseInt(pid.value),
    name: pname.value.trim(),
    category: pcategory.value.trim(),
    price: parseInt(pprice.value),
    stock: parseInt(pstock.value)
  });

  filteredInventory = [...inventory];
  displayInventory(filteredInventory);
  clearForm();
  showMsg("Product Added Successfully!", "success");
}

function editProduct(id) {
  const p = inventory.find(prod => prod.pid === id);
  if (!p) return;

  pid.value = p.pid;
  pname.value = p.name;
  pcategory.value = p.category;
  pprice.value = p.price;
  pstock.value = p.stock;

  showMsg("Now update and click Update!", "success");
}

function updateProduct() {
  if (!validate()) return;

  const p = inventory.find(prod => prod.pid === parseInt(pid.value));
  if (!p) {
    showMsg("Product not found!", "error");
    return;
  }

  p.name = pname.value.trim();
  p.category = pcategory.value.trim();
  p.price = parseInt(pprice.value);
  p.stock = parseInt(pstock.value);

  filteredInventory = [...inventory];
  displayInventory(filteredInventory);
  clearForm();
  showMsg("Product Updated Successfully!", "success");
}

function deleteProduct(id) {
  inventory = inventory.filter(p => p.pid !== id);
  filteredInventory = [...inventory];
  displayInventory(filteredInventory);
  showMsg("Product Deleted Successfully!", "success");
}

function searchByCategory() {
  const keyword = document.getElementById("searchCategory").value.trim().toLowerCase();

  if (!keyword) {
    showMsg("Enter category to search!", "error");
    return;
  }

  filteredInventory = inventory.filter(p => p.category.toLowerCase().includes(keyword));
  displayInventory(filteredInventory);
  showMsg("Search Completed!", "success");
}

function resetSearch() {
  document.getElementById("searchCategory").value = "";
  filteredInventory = [...inventory];
  displayInventory(filteredInventory);
  showMsg("Search Reset!", "success");
}

document.getElementById("addBtn").addEventListener("click", addProduct);
document.getElementById("updateBtn").addEventListener("click", updateProduct);
document.getElementById("clearBtn").addEventListener("click", clearForm);

document.getElementById("searchBtn").addEventListener("click", searchByCategory);
document.getElementById("resetBtn").addEventListener("click", resetSearch);
document.getElementById("reloadBtn").addEventListener("click", loadInventory);

window.onload = loadInventory;
