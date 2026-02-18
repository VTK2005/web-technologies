let students = [];

const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");
const msg = document.getElementById("msg");

function showMessage(text, type) {
  msg.textContent = text;
  msg.style.color = type === "success" ? "green" : "red";
}

function renderTable() {
  tableBody.innerHTML = "";

  students.forEach((s, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.dept}</td>
      <td>${s.marks}</td>
      <td>
        <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function fetchStudents() {
  try {
    const res = await fetch("students.json");

    if (res.status === 404) {
      showMessage("404 Not Found - students.json missing", "error");
      return;
    }

    if (!res.ok) {
      showMessage("500 Server Error", "error");
      return;
    }

    const data = await res.json();
    students = data.students;
    renderTable();

  } catch (err) {
    showMessage("Network Error!", "error");
  }
}

function editStudent(index) {
  document.getElementById("sid").value = students[index].id;
  document.getElementById("sname").value = students[index].name;
  document.getElementById("dept").value = students[index].dept;
  document.getElementById("marks").value = students[index].marks;
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderTable();
  showMessage("Student deleted successfully", "success");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("sid").value.trim();
  const name = document.getElementById("sname").value.trim();
  const dept = document.getElementById("dept").value.trim();
  const marks = document.getElementById("marks").value.trim();

  const existingIndex = students.findIndex(s => s.id === id);

  if (existingIndex !== -1) {
    students[existingIndex] = { id, name, dept, marks };
    showMessage("Student updated successfully", "success");
  } else {
    students.push({ id, name, dept, marks });
    showMessage("Student added successfully", "success");
  }

  renderTable();
  form.reset();
});

fetchStudents();
