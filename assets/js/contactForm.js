// Import Firebase functions directly in the contactForm.js file
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Access Firebase Database from window object (set in index.html)
const database = window.firebaseDatabase;

// Contact Form Submission Logic
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent form submission to allow AJAX-like behavior

    // Get the form input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Save the data to Firebase Realtime Database
    const contactRef = ref(database, 'contactMessages'); // Create reference to 'contactMessages' in the database
    const newMessageRef = push(contactRef); // Create a new unique ID for the message

    set(newMessageRef, {
        name: name,
        email: email,
        message: message,
        timestamp: Date.now()  // Timestamp when the message is sent
    }).then(() => {
        alert("Your message has been sent successfully!");
        document.getElementById("contactForm").reset();  // Reset the form after submission
    }).catch((error) => {
        alert("Error: " + error.message);  // Display an error if the message wasn't sent
    });
});
