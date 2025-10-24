// submit form js
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent');

    formStatus.textContent = "Sending...";
    formStatus.style.color = accent;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = "✅ Message sent successfully!";
        formStatus.style.color = "#34d399";
        contactForm.reset();
      } else {
        formStatus.textContent = "❌ Oops, something went wrong. Try again later.";
        formStatus.style.color = "#f87171";
      }
    } catch (err) {
      formStatus.textContent = "❌ Network error. Please try again.";
      formStatus.style.color = "#f87171";
    }
  });