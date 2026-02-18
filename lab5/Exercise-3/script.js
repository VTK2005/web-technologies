let students = [];

const studentBody = document.getElementById("studentBody");
const alertBox = document.getElementById("alertBox");

const sid = document.getElementById("sid");
const sname = document.getElementById("sname");
const scourse = document.getElementById("scourse");
const smarks = document.getElementById("smarks");

function showAlert(msg, type) {
  alertBox.classList.remove("hidden", "success", "error");
  alertBox.classList.add(type);
  alertBox.textContent = msg;

  setTimeout(() => alertBox.classList.add("hidden"), 3000);
}

function clearForm() {
  sid.value = "";
  sname.value = "";
  scourse.value = "";
  smarks.value = "";
}

function getGrade(marks) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  return "Fail";
}

async function loadStudents() {
  try {
    const res = await fetch("students.json");
    students = await res.json();
    displayStudents();
    showAlert("Students Loaded Successfully!", "success");
  } catch (err) {
    showAlert("JSON Parsing Error / File Not Found!", "error");
  }
}

function displayStudents() {
  studentBody.innerHTML = "";

  students.forEach((s) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.course}</td>
      <td>${s.marks}</td>
      <td>${getGrade(s.marks)}</td>
      <td>
        <button onclick="editStudent(${s.id})">Edit</button>
        <button onclick="deleteStudent(${s.id})">Delete</button>
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

    studentBody.appendChild(row);
  });
}

function validateInputs() {
  if (!sid.value.trim() || !sname.value.trim() || !scourse.value.trim() || !smarks.value.trim()) {
    showAlert("All fields are required!", "error");
    return false;
  }

  if (parseInt(smarks.value) < 0 || parseInt(smarks.value) > 100) {
    showAlert("Marks should be between 0 and 100!", "error");
    return false;
  }

  return true;
}

function addStudent() {
  if (!validateInputs()) return;

  const exists = students.some((s) => s.id === parseInt(sid.value));
  if (exists) {
    showAlert("Student ID already exists!", "error");
    return;
  }

  students.push({
    id: parseInt(sid.value),
    name: sname.value.trim(),
    course: scourse.value.trim(),
    marks: parseInt(smarks.value)
  });

  displayStudents();
  clearForm();
  showAlert("Student Added Successfully!", "success");
}

function editStudent(id) {
  const student = students.find((s) => s.id === id);
  if (!student) return;

  sid.value = student.id;
  sname.value = student.name;
  scourse.value = student.course;
  smarks.value = student.marks;

  showAlert("Now update and click Update!", "success");
}

function updateStudent() {
  if (!validateInputs()) return;

  const student = students.find((s) => s.id === parseInt(sid.value));
  if (!student) {
    showAlert("Student not found!", "error");
    return;
  }

  student.name = sname.value.trim();
  student.course = scourse.value.trim();
  student.marks = parseInt(smarks.value);

  displayStudents();
  clearForm();
  showAlert("Student Updated Successfully!", "success");
}

function deleteStudent(id) {
  students = students.filter((s) => s.id !== id);
  displayStudents();
  showAlert("Student Deleted Successfully!", "success");
}

document.getElementById("addBtn").addEventListener("click", addStudent);
document.getElementById("updateBtn").addEventListener("click", updateStudent);
document.getElementById("clearBtn").addEventListener("click", clearForm);
document.getElementById("reloadBtn").addEventListener("click", loadStudents);

window.onload = loadStudents;
