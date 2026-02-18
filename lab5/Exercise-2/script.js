let xmlDoc = null;

const msgBox = document.getElementById("msgBox");
const bookTableBody = document.getElementById("bookTableBody");

const bookId = document.getElementById("bookId");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookStatus = document.getElementById("bookStatus");

function showMsg(text, type) {
  msgBox.classList.remove("hidden", "success", "error");
  msgBox.classList.add(type);
  msgBox.textContent = text;

  setTimeout(() => msgBox.classList.add("hidden"), 3000);
}

function clearForm() {
  bookId.value = "";
  bookTitle.value = "";
  bookAuthor.value = "";
  bookStatus.value = "Available";
}

function validate() {
  if (!bookId.value.trim() || !bookTitle.value.trim() || !bookAuthor.value.trim()) {
    showMsg("All fields are required!", "error");
    return false;
  }
  return true;
}

function loadBooks() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "books.xml", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      xmlDoc = xhr.responseXML;
      if (!xmlDoc) {
        showMsg("Invalid XML file!", "error");
        return;
      }
      displayBooks();
      showMsg("Books loaded successfully!", "success");
    } else {
      showMsg("Failed to load books.xml", "error");
    }
  };

  xhr.onerror = function () {
    showMsg("Network Error!", "error");
  };

  xhr.send();
}

function displayBooks() {
  bookTableBody.innerHTML = "";
  const books = xmlDoc.getElementsByTagName("book");

  for (let book of books) {
    const id = book.getElementsByTagName("id")[0].textContent;
    const title = book.getElementsByTagName("title")[0].textContent;
    const author = book.getElementsByTagName("author")[0].textContent;
    const status = book.getElementsByTagName("status")[0].textContent;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${id}</td>
      <td>${title}</td>
      <td>${author}</td>
      <td>${status}</td>
      <td>
        <button onclick="editBook('${id}')">Edit</button>
        <button onclick="deleteBook('${id}')">Delete</button>
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

    bookTableBody.appendChild(row);
  }
}

function addBook() {
  if (!validate()) return;

  const books = xmlDoc.getElementsByTagName("book");
  for (let b of books) {
    if (b.getElementsByTagName("id")[0].textContent === bookId.value.trim()) {
      showMsg("Book ID already exists!", "error");
      return;
    }
  }

  const newBook = xmlDoc.createElement("book");

  const idNode = xmlDoc.createElement("id");
  idNode.textContent = bookId.value.trim();

  const titleNode = xmlDoc.createElement("title");
  titleNode.textContent = bookTitle.value.trim();

  const authorNode = xmlDoc.createElement("author");
  authorNode.textContent = bookAuthor.value.trim();

  const statusNode = xmlDoc.createElement("status");
  statusNode.textContent = bookStatus.value;

  newBook.appendChild(idNode);
  newBook.appendChild(titleNode);
  newBook.appendChild(authorNode);
  newBook.appendChild(statusNode);

  xmlDoc.documentElement.appendChild(newBook);

  displayBooks();
  clearForm();
  showMsg("Book added successfully!", "success");
}

function editBook(id) {
  const books = xmlDoc.getElementsByTagName("book");
  for (let b of books) {
    if (b.getElementsByTagName("id")[0].textContent === id) {
      bookId.value = id;
      bookTitle.value = b.getElementsByTagName("title")[0].textContent;
      bookAuthor.value = b.getElementsByTagName("author")[0].textContent;
      bookStatus.value = b.getElementsByTagName("status")[0].textContent;
      showMsg("Update details and click Update!", "success");
      break;
    }
  }
}

function updateBook() {
  if (!validate()) return;

  const books = xmlDoc.getElementsByTagName("book");
  for (let b of books) {
    if (b.getElementsByTagName("id")[0].textContent === bookId.value.trim()) {
      b.getElementsByTagName("title")[0].textContent = bookTitle.value.trim();
      b.getElementsByTagName("author")[0].textContent = bookAuthor.value.trim();
      b.getElementsByTagName("status")[0].textContent = bookStatus.value;

      displayBooks();
      clearForm();
      showMsg("Book updated successfully!", "success");
      return;
    }
  }

  showMsg("Book ID not found!", "error");
}

function deleteBook(id) {
  const books = xmlDoc.getElementsByTagName("book");
  for (let b of books) {
    if (b.getElementsByTagName("id")[0].textContent === id) {
      xmlDoc.documentElement.removeChild(b);
      displayBooks();
      showMsg("Book deleted successfully!", "success");
      return;
    }
  }
}

document.getElementById("addBtn").addEventListener("click", addBook);
document.getElementById("updateBtn").addEventListener("click", updateBook);
document.getElementById("clearBtn").addEventListener("click", clearForm);
document.getElementById("reloadBtn").addEventListener("click", loadBooks);

window.onload = loadBooks;
