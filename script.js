/* FIRE SAFETY PRO - EMAILJS */

// Replace these values with your own EmailJS details.
const PUBLIC_KEY = "9VMMY56bcYdRknATq";
const SERVICE_ID = "service_o7xoso9";
const TEMPLATE_ID = "template_ahodyqe";

// Initialize EmailJS
emailjs.init({
    publicKey: PUBLIC_KEY
});

// Display the current year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Contact form email submission
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitButton = contactForm
    ? contactForm.querySelector('button[type="submit"]')
    : null;

if (contactForm && formStatus && submitButton) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Please complete all fields.";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "";

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                name: name,
                email: email,
                message: message
            });

            formStatus.textContent =
                "Thank you! Your message was sent successfully.";

            contactForm.reset();
        } catch (error) {
            console.error("Email sending failed:", error);

            formStatus.textContent =
                "Sorry, your message could not be sent. Please try again.";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    });
}