function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;

    const error = document.getElementById("errorMsg");
    error.textContent = "";

    if (!name || !email || !mobile || !password) {
        error.textContent = "All fields are mandatory";
        return;
    }

    if (!/^\d{10}$/.test(mobile)) {
        error.textContent = "Mobile number must be exactly 10 digits";
        return;
    }

    if (password.length < 6) {
        error.textContent = "Password must be at least 6 characters";
        return;
    }

    const users = getUsers();
    if (users.some(u => u.email === email)) {
        error.textContent = "Email already registered";
        return;
    }

    users.push({ name, email, mobile });
    saveUsers(users);
    displayUsers();
    event.target.reset();
}

function displayUsers() {
    const table = document.getElementById("userTable");
    table.innerHTML = "";

    getUsers().forEach((user, index) => {
        table.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td>
                    <button class="delete-btn" onclick="deleteUser(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteUser(index) {
    const users = getUsers();
    users.splice(index, 1);
    saveUsers(users);
    displayUsers();
}

function clearAllUsers() {
    localStorage.removeItem("users");
    displayUsers();
}

displayUsers();
