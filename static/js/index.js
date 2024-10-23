// Initialize chart when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('employeeChart').getContext('2d');
    const employeeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Employees Joined',
                data: [5, 10, 8, 12, 7], // Sample data
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true // Y-axis starts from zero
                }
            }
        }
    });
});

// Display the logged-in username or "Guest" if not logged in
document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    document.getElementById('username-display').textContent = username ? username : 'Guest'; // Display username or 'Guest'
});

// Logout function
function logout() {
    fetch('/logout', {
        method: 'GET',
        credentials: 'include', // Include session cookies
    })
    .then(response => {
        if (response.ok) {
            localStorage.removeItem('username'); // Remove stored username
            window.location.href = '/login'; // Redirect to login page
        } else {
            console.error('Logout failed!');
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
}

// Highlight the active navigation link based on current path
function setActiveNavItem() {
    const navLinks = document.querySelectorAll('.navbar a');
    const currentPath = window.location.pathname;
    navLinks.forEach(link => link.classList.remove('active')); // Remove active class from all
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active'); // Add active class to the current link
        }
    });
    if (currentPath === '/') {
        navLinks[0].classList.add('active'); // Set the home link active by default
    }
}

// Handle click event for navigation links
function handleNavigation() {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active')); // Remove active class from all links
            this.classList.add('active'); // Set clicked link as active
        });
    });
}

// Setup navigation highlights on page load and when navigating back
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavItem();
    handleNavigation();
});
window.addEventListener('popstate', function() {
    setActiveNavItem(); // Recheck active link on browser back/forward navigation
});
