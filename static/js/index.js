document.addEventListener('DOMContentLoaded', function() {


    // Example for initializing a chart
    const ctx = document.getElementById('employeeChart').getContext('2d');
    const employeeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Employees Joined',
                data: [5, 10, 8, 12, 7],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username-display').textContent = username;
    } else {
        document.getElementById('username-display').textContent = 'Guest'; // أو يمكنك تركه فارغًا
    }
});

// الدالة لتسجيل الخروج
function logout() {
    fetch('/logout', {
        method: 'GET',
        credentials: 'include',  // لتضمين ملفات تعريف الارتباط الخاصة بالجلسة
    })
    .then(response => {
        if (response.ok) {
            localStorage.removeItem('username');  // إزالة اسم المستخدم المخزن
            window.location.href = '/login';  // إعادة التوجيه إلى صفحة تسجيل الدخول
        } else {
            console.error('Logout failed!');
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
}

function setActiveNavItem() {
    const navLinks = document.querySelectorAll('.navbar a');
    const currentPath = window.location.pathname;
        navLinks.forEach(link => {
        link.classList.remove('active');
    });
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    if (currentPath === '/') {
        navLinks[0].classList.add('active');
    }
}

function handleNavigation() {
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setActiveNavItem();
    handleNavigation();
});
window.addEventListener('popstate', function() {
    setActiveNavItem();
});