// script.js

const EMAILJS_SERVICE_ID = "service_Ali123";
const EMAILJS_TEMPLATE_ID = "template_Ali456";
const EMAILJS_PUBLIC_KEY = "jWb4DNx1oF7gG7K4K";

// Initialize EmailJS
if (window.emailjs) {
  emailjs.init(jWb4DNx1oF7gG7K4K);
} else {
  console.error("EmailJS SDK not found. Did you include the CDN script?");
}

const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("sendBtn");
const btnText = document.getElementById("btn-text");

function setLoading(isLoading) {
  if (!sendBtn) return;
  sendBtn.disabled = isLoading;
  btnText.textContent = isLoading ? "Sending..." : "Send Message";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values
  const name = (form.name.value || "").trim();
  const email = (form.email.value || "").trim();
  const message = (form.message.value || "").trim();

  // Basic validation
  if (!name || !email || !message) {
    Swal.fire({
      icon: "warning",
      title: "Please fill all fields",
      toast: true,
      position: "top",
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Please enter a valid email",
      toast: true,
      position: "top",
      timer: 2500,
      showConfirmButton: false
    });
    return;
  }

  setLoading(true);

  // Template parameters — make sure your EmailJS template uses these variables ({{name}}, {{email}}, {{message}})
  const templateParams = { name, email, message };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function (response) {
      console.log("EmailJS success:", response);
      setLoading(false);
      form.reset();
      Swal.fire({
        icon: "success",
        title: "Message sent!",
        text: "Thanks — I'll get back to you soon.",
        confirmButtonColor: "#0d6efd"
      });
    }, function (error) {
      console.error("EmailJS error:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Send failed",
        html: "Could not send the message. <br>Check console & your EmailJS settings.",
        confirmButtonColor: "#d33"
      });
    })
    .catch(function (err) {
      console.error("Unexpected error:", err);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Send failed",
        text: "Unexpected error occurred. Check console.",
        confirmButtonColor: "#d33"
      });
    });
});
