let xmlDoc = null;

const empTableBody = document.getElementById("empTableBody");
const messageBox = document.getElementById("messageBox");

const empId = document.getElementById("empId");
const empName = document.getElementById("empName");
const empDept = document.getElementById("empDept");
const empSalary = document.getElementById("empSalary");

function showMessage(text, type) {
  messageBox.classList.remove("hidden", "success", "error");
  messageBox.classList.add(type);
  messageBox.textContent = text;

  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, 3000);
}

function clearForm() {
  empId.value = "";
  empName.value = "";
  empDept.value = "";
  empSalary.value = "";
}

function validateInputs(checkName = true) {
  if (!empId.value.trim() || !empDept.value.trim() || !empSalary.value.trim()) {
    showMessage("ID, Department and Salary are required!", "error");
    return false;
  }

  if (checkName && !empName.value.trim()) {
    showMessage("Employee Name is required!", "error");
    return false;
  }

  if (parseInt(empSalary.value) <= 0) {
    showMessage("Salary must be greater than 0!", "error");
    return false;
  }

  return true;
}

function loadXML() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "employees.xml", true);

  xhr.onload = function () {
    try {
      if (xhr.status === 200) {
        xmlDoc = xhr.responseXML;

        if (!xmlDoc || !xmlDoc.getElementsByTagName("employee").length) {
          showMessage("XML file is empty or invalid!", "error");
          empTableBody.innerHTML = "";
          return;
        }

        displayEmployees();
        showMessage("Employee XML Loaded Successfully!", "success");
      } else {
        showMessage("Failed to load XML file!", "error");
      }
    } catch (err) {
      showMessage("Malformed XML Error!", "error");
    }
  };

  xhr.onerror = function () {
    showMessage("Network Error: Unable to load XML!", "error");
  };

  xhr.send();
}

function displayEmployees() {
  empTableBody.innerHTML = "";

  const employees = xmlDoc.getElementsByTagName("employee");

  for (let i = 0; i < employees.length; i++) {
    const id = employees[i].getElementsByTagName("id")[0].textContent;
    const name = employees[i].getElementsByTagName("name")[0].textContent;
    const dept = employees[i].getElementsByTagName("department")[0].textContent;
    const salary = employees[i].getElementsByTagName("salary")[0].textContent;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>${dept}</td>
      <td>₹${salary}</td>
      <td>
        <button class="btn warning" onclick="editEmployee('${id}')">Edit</button>
        <button class="btn danger" onclick="deleteEmployee('${id}')">Delete</button>
      </td>
    `;

    empTableBody.appendChild(row);
  }
}

function addEmployee() {
  if (!validateInputs(true)) return;

  const employees = xmlDoc.getElementsByTagName("employee");

  for (let emp of employees) {
    const existingId = emp.getElementsByTagName("id")[0].textContent;
    if (existingId === empId.value.trim()) {
      showMessage("Employee ID already exists!", "error");
      return;
    }
  }

  const newEmp = xmlDoc.createElement("employee");

  const idNode = xmlDoc.createElement("id");
  idNode.textContent = empId.value.trim();

  const nameNode = xmlDoc.createElement("name");
  nameNode.textContent = empName.value.trim();

  const deptNode = xmlDoc.createElement("department");
  deptNode.textContent = empDept.value.trim();

  const salaryNode = xmlDoc.createElement("salary");
  salaryNode.textContent = empSalary.value.trim();

  newEmp.appendChild(idNode);
  newEmp.appendChild(nameNode);
  newEmp.appendChild(deptNode);
  newEmp.appendChild(salaryNode);

  xmlDoc.documentElement.appendChild(newEmp);

  displayEmployees();
  clearForm();
  showMessage("Employee Added Successfully (In Memory)!", "success");
}

function editEmployee(id) {
  const employees = xmlDoc.getElementsByTagName("employee");

  for (let emp of employees) {
    const empIdVal = emp.getElementsByTagName("id")[0].textContent;
    if (empIdVal === id) {
      empId.value = empIdVal;
      empName.value = emp.getElementsByTagName("name")[0].textContent;
      empDept.value = emp.getElementsByTagName("department")[0].textContent;
      empSalary.value = emp.getElementsByTagName("salary")[0].textContent;

      showMessage("Now you can update Department or Salary!", "success");
      break;
    }
  }
}

function updateEmployee() {
  if (!validateInputs(false)) return;

  const employees = xmlDoc.getElementsByTagName("employee");
  let found = false;

  for (let emp of employees) {
    const empIdVal = emp.getElementsByTagName("id")[0].textContent;

    if (empIdVal === empId.value.trim()) {
      emp.getElementsByTagName("department")[0].textContent = empDept.value.trim();
      emp.getElementsByTagName("salary")[0].textContent = empSalary.value.trim();
      found = true;
      break;
    }
  }

  if (!found) {
    showMessage("Employee ID not found!", "error");
    return;
  }

  displayEmployees();
  clearForm();
  showMessage("Employee Updated Successfully!", "success");
}

function deleteEmployee(id) {
  const employees = xmlDoc.getElementsByTagName("employee");

  for (let emp of employees) {
    const empIdVal = emp.getElementsByTagName("id")[0].textContent;

    if (empIdVal === id) {
      xmlDoc.documentElement.removeChild(emp);
      displayEmployees();
      showMessage("Employee Deleted Successfully!", "success");
      return;
    }
  }
}

document.getElementById("addBtn").addEventListener("click", addEmployee);
document.getElementById("updateBtn").addEventListener("click", updateEmployee);
document.getElementById("reloadBtn").addEventListener("click", loadXML);
document.getElementById("clearBtn").addEventListener("click", clearForm);

window.onload = loadXML;
