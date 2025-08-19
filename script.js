document.getElementById("form-0").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("nme-0").value.trim();
    const email = document.getElementById("emai-0").value.trim();
    const message = document.getElementById("comment-0").value.trim();

    const nameEr = document.getElementById("nameEr");
    const emailEr = document.getElementById("emailEr");
    let messageEr = document.getElementById("messageEr");

    if (!messageEr) {
        messageEr = document.createElement("span");
        messageEr.id = "messageEr";
        messageEr.className = "error";
        document.getElementById("comment-0").parentNode.appendChild(messageEr);
    }

    const nameRegex = /^[a-zA-Z\s]{3,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    nameEr.textContent = "";
    emailEr.textContent = "";
    messageEr.textContent = "";

    let valid = true;

    if (!name) {
        nameEr.textContent = "Name is required.";
        valid = false;
    } else if (!nameRegex.test(name)) {
        nameEr.textContent = "Enter a valid name (letters only, 3-30 characters).";
        valid = false;
    }

    if (!email) {
        emailEr.textContent = "Email is required.";
        valid = false;
    } else if (!emailRegex.test(email)) {
        emailEr.textContent = "Enter a valid email address.";
        valid = false;
    }

    if (!message) {
        messageEr.textContent = "Message is required.";
        valid = false;
    } else if (message.length < 10) {
        messageEr.textContent = "Message must be at least 10 characters.";
        valid = false;
    }

    if (!valid) return;

    // Replace with your own IDs from EmailJS dashboard
    const serviceID = "service_f3osa8t";
    const templateID = "template_vq6t17g";

    const templateParams = {
        name: name,
        email: email,
        message: message,
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(() => {
            alert("Message sent successfully!");
            document.getElementById("form-0").reset();
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            alert("Failed to send message. Try again later.");
        });
});
