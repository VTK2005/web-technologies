document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('regForm');
  const backBtn = document.getElementById('backBtn');
  const msg = document.getElementById('msg');

  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  function isNotEmpty(value) {
    return value && value.trim().length > 0;
  }

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validPhone(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.textContent = '';
    const name = form.name.value;
    const reg = form.reg.value;
    const email = form.email.value;
    const phone = form.phone.value;

    if (!isNotEmpty(name)) {
      msg.textContent = 'Name must not be empty.';
      form.name.focus();
      return;
    }
    if (!isNotEmpty(reg)) {
      msg.textContent = 'Registration number must not be empty.';
      form.reg.focus();
      return;
    }
    if (!isNotEmpty(email) || !validEmail(email)) {
      msg.textContent = 'Please enter a valid email.';
      form.email.focus();
      return;
    }
    if (!isNotEmpty(phone) || !validPhone(phone)) {
      msg.textContent = 'Please enter a valid phone number.';
      form.phone.focus();
      return;
    }

    // All checks passed — simulate success
    msg.style.color = 'green';
    msg.textContent = 'Submitted successfully!';
    form.reset();
    setTimeout(() => {
      msg.textContent = '';
      msg.style.color = '';
    }, 3000);
  });
});