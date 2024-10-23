// التحقق مما إذا كان المستخدم مسجلاً الدخول
document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    if (username) {
        // توجيه المستخدم إلى الصفحة الرئيسية إذا كان مسجلاً الدخول
        window.location.href = '/'; // تأكد من استخدام المسار الصحيح
    }
});

// تسجيل الدخول
// تسجيل الدخول
document.getElementById('login-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
    });

    const data = await response.json();
    document.getElementById('message').innerText = data.message;

    if (data.status === 'success') {
        localStorage.setItem('username', username);  // تخزين اسم المستخدم
        window.location.href = '/'; // تأكد من استخدام المسار الصحيح
    }
});


// تسجيل المستخدم
document.getElementById('register-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // تحقق من تطابق كلمة المرور
    if (password !== confirmPassword) {
        document.getElementById('message').innerText = "Passwords do not match!";
        return;
    }

    // إرسال البيانات إلى السيرفر
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
    });

    const data = await response.json();
    document.getElementById('message').innerText = data.message;

    if (data.status === 'success') {
        localStorage.setItem('username', username);
        window.location.href = '/'; // تأكد من استخدام المسار الصحيح
    }
});

// الدالة لتسجيل الدخول
function login() {
    localStorage.setItem('username', response.username); // تخزين اسم المستخدم
}


