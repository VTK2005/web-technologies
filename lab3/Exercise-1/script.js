const form = document.getElementById("form");
const role = document.getElementById("role");

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    confirm: document.getElementById("confirm"),
    skills: document.getElementById("skills")
};

const errors = {
    nameErr: document.getElementById("nameErr"),
    emailErr: document.getElementById("emailErr"),
    passErr: document.getElementById("passErr"),
    confirmErr: document.getElementById("confirmErr")
};

role.onchange = () => {
    document.getElementById("skillsBox").style.display =
        role.value === "Student" ? "none" : "block";
};

function mark(input, msgBox, msg) {
    if (msg) {
        input.className = "invalid";
        msgBox.textContent = msg;
        return false;
    }
    input.className = "valid";
    msgBox.textContent = "";
    return true;
}

function validateEmail() {
    const email = fields.email.value;

    if (!email.includes("@"))
        return mark(fields.email, errors.emailErr, "Invalid email");

    if (role.value === "Teacher" && !email.endsWith(".edu"))
        return mark(fields.email, errors.emailErr, "Teachers must use .edu");

    if (role.value === "Admin" && !email.endsWith("@company.com"))
        return mark(fields.email, errors.emailErr, "Admins need company email");

    return mark(fields.email, errors.emailErr, "");
}

function validatePassword() {
    const pass = fields.password.value;

    if (role.value === "Admin") {
        const strong = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;
        if (!strong.test(pass))
            return mark(fields.password, errors.passErr, "Admin password too weak");
    } else if (pass.length < 5) {
        return mark(fields.password, errors.passErr, "Minimum 5 characters");
    }

    return mark(fields.password, errors.passErr, "");
}

function validateConfirm() {
    if (fields.password.value !== fields.confirm.value)
        return mark(fields.confirm, errors.confirmErr, "Passwords mismatch");

    return mark(fields.confirm, errors.confirmErr, "");
}

function validateName() {
    return mark(
        fields.name,
        errors.nameErr,
        fields.name.value.length < 3 ? "Minimum 3 letters" : ""
    );
}

["input", "change"].forEach(ev => {
    form.addEventListener(ev, () => {
        validateName();
        validateEmail();
        validatePassword();
        validateConfirm();
    });
});

form.onsubmit = (e) => {
    e.preventDefault();

    const valid =
        validateName() &
        validateEmail() &
        validatePassword() &
        validateConfirm();

    if (valid) {
        alert("Registration Successful ✅");
        form.reset();
        document.getElementById("skillsBox").style.display = "none";
    } else {
        alert("Fix errors before submitting ❌");
    }
};
