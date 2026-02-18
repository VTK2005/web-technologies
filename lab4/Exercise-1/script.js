const usernameInput = document.getElementById("username");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");

let usernameAvailable = false;

async function checkUsername(username) {
  loader.classList.remove("hidden");
  message.textContent = "";
  submitBtn.disabled = true;

  try {
    const res = await fetch("users.json");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    const exists = data.users.includes(username.toLowerCase());

    if (exists) {
      message.textContent = "❌ Username already taken";
      message.className = "message error";
      usernameAvailable = false;
    } else {
      message.textContent = "✅ Username available";
      message.className = "message success";
      usernameAvailable = true;
    }

    submitBtn.disabled = !usernameAvailable;

  } catch (err) {
    message.textContent = "⚠️ Server error. Try again!";
    message.className = "message error";
  } finally {
    loader.classList.add("hidden");
  }
}

usernameInput.addEventListener("input", () => {
  const username = usernameInput.value.trim();

  if (username.length < 3) {
    message.textContent = "⚠️ Username must be at least 3 characters";
    message.className = "message error";
    submitBtn.disabled = true;
    return;
  }

  checkUsername(username);
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  if (!usernameAvailable) {
    e.preventDefault();
    alert("Username not available!");
  } else {
    e.preventDefault();
    alert("Registered Successfully!");
  }
});
