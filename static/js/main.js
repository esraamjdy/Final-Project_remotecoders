// Check if the user is already logged in
document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    if (username) {
        // Redirect to home page if logged in
        window.location.href = '/'; // Ensure the correct path is used
    }
});

// Handle login form submission
document.getElementById('login-form')?.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission behavior
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to the server
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`, // Send form data
    });

    const data = await response.json();
    document.getElementById('message').innerText = data.message; // Display server message

    if (data.status === 'success') {
        localStorage.setItem('username', username);  // Store username in localStorage
        window.location.href = '/'; // Redirect to home page upon successful login
    }
});

// Handle register form submission
document.getElementById('register-form')?.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        document.getElementById('message').innerText = "Passwords do not match!";
        return;
    }

    // Send registration data to the server
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`, // Send form data
    });

    const data = await response.json();
    document.getElementById('message').innerText = data.message; // Display server message

    if (data.status === 'success') {
        localStorage.setItem('username', username); // Store username in localStorage
        window.location.href = '/'; // Redirect to home page after successful registration
    }
});
