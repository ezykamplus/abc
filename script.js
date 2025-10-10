// Replace this with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6Eo3WPK7UTissyySUrvgbiEHwqWZqS6A",
  authDomain: "http://test-62835.firebaseapp.com",
  projectId: "test-62835",
  storageBucket: "http://test-62835.firebasestorage.app",
  messagingSenderId: "568888978453",
  appId: "1:568888978453:web:64e4143d25c95dcbadf21c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submission logic
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const messageEl = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const country = document.getElementById("country").value.trim();
    const email = document.getElementById("email").value.trim();
    const code = document.getElementById("code").value.trim();

    if (!country || !email || !code) {
      messageEl.style.color = 'red';
      messageEl.textContent = "All fields are required.";
      return;
    }

    db.collection("users").add({
      country: country,
      email: email,
      code: code,
      submittedAt: firebase.firestore.FieldValue.serverTimestamp() // ⏰ submission time
    })
    .then(() => {
      // Redirect to submission.html after successful submission
      window.location.href = "submission.html";
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      messageEl.style.color = 'red';
      messageEl.textContent = "Error submitting data.";
    });
  });
});